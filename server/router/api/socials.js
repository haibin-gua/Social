const Router = require('koa-router');
const router = new Router();
const bcrypt = require('bcryptjs');
const tools = require('../../tools');
const jwt = require('jsonwebtoken');
const passport = require('koa-passport');


//引入model
const Social = require('../../models/Social');

//引入验证
const validateRegisterInput = require('../../validation/register');

//注册接口
router.post('/register',async (ctx)=>{
    const { errors,isValid } = validateRegisterInput(ctx.request.body);
    //判断是否验证通过
    if(!isValid){
        ctx.body = errors;
        return;
    }
    const findReuslt = await Social.find({username:ctx.request.body.username})
    if(findReuslt.length > 0){
        ctx.body = {
            username:'用户名已经存在'
        }
    }else{
        const newSocial = new Social({
            username:ctx.request.body.username,
            password:tools.enbcrypt(ctx.request.body.password),   //加密密码
        });
        //存储到数据库
        await newSocial.save().then(social=>{
            ctx.body = social;
        }).catch((err)=>{
            console.log(err)
        });

        //返回JSON数据
        ctx.body = newSocial;
    }
});

//登录接口
router.post('/login',async(ctx)=>{
    //查询
    const findResult = await Social.find({username:ctx.request.body.username})
    const social = findResult[0]
    const password = ctx.request.body.password
    //判断查没查到
    if(findResult.length == 0){
        ctx.body = {
            username:'用户不存在'
        }
    }else{
        //查到后验证密码
        var result = await bcrypt.compareSync(password,social.password);
        //验证通过
        if(result){
            //返回token
            const payload = {id:social.id,username:social.username}
            const token = jwt.sign(payload,'secret',{expiresIn:3600});
            ctx.body = {
                success:true,token: "Bearer "+ token 
            }
        }else{
            ctx.body = {password:'密码错误'}
        }
    }
});

//发表文章
router.post('/add',async(ctx)=>{
    // console.log(ctx.request.body)
    const findResult = await Social.findByIdAndUpdate({_id:ctx.request.body.id},{$push:{pra:ctx.request.body.pra}})
    console.log(findResult)
})

//获取所有文章
router.get('/acq',async(ctx)=>{
    const findResult = await Social.find(ctx.request.body)
    // console.log(findResult[0])
    ctx.body = findResult
})

//解析token
router.get('/current',passport.authenticate('jwt', { session: false }),async(ctx)=>{
    ctx.body = {
        id:ctx.state.user._id,
        username:ctx.state.user.username,
        list:ctx.state.user.list
    }
})


module.exports = router.routes()