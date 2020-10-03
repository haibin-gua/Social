const Router = require('koa-router');
const router = new Router();
const bcrypt = require('bcryptjs');
const tools = require('../../tools');
const jwt = require('jsonwebtoken');
const passport = require('koa-passport');


//引入model
const Social = require('../../models/Social');

//注册接口
router.post('/register',async (ctx)=>{
    const findReuslt = await Social.find({username:ctx.request.body.username})
    if(findReuslt.length > 0){
        ctx.body = {
            username:'用户名已经存在'
        }
    }else{
        const newSocial = new Social({
            username:ctx.request.body.username,
            password:tools.enbcrypt(ctx.request.body.password)   //加密密码
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

router.get('/current',passport.authenticate('jwt', { session: false }),async(ctx)=>{
    ctx.body = {
        id:ctx.state.user._id,
        username:ctx.state.user.username
    }
})


module.exports = router.routes()