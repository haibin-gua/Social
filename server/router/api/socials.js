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
const { findById } = require('../../models/Social');

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

//点赞
router.post('/pra',async(ctx)=>{
    const findResult = await Social.findById({_id:ctx.request.body.id})  //点赞用户
    // console.log(findResult.username)
    // const pra = findResult.username
    const findResult2 = await Social.findById({_id:ctx.request.body.index_id2}) //被点赞用户
    // console.log(findResult2)
    for(var i = 0;i<findResult2.list.length;i++){          //循环遍历被点赞用户所有的文章
        var id = findResult2.list[i]._id.toString();        //通过前端传来的文章id来判断
        if(id === ctx.request.body.index_id){               
            console.log(findResult2.list[i])
            if(findResult2.list[i].pra.indexOf(pra) > -1){   //判断有无重复用户名，如果有就已经点过赞了
                ctx.body = {
                    pra:'你已经点过赞了'
                }
            }else{
                findResult2.list[i].pra.push(pra)
                findResult2.markModified('pra')
                await findResult2.save((err)=>{
                   console.log(err)
                });
                ctx.body = findResult2
            }
        }
    }
})

//回复
router.post('/comm',async(ctx)=>{
    const findResult = await Social.findById({_id:ctx.request.body.id})  //评论的用户
    const findResult2 = await Social.findById({_id:ctx.request.body.id_2})  //被评论的用户
    var username = findResult.username
    // console.log(findResult)
    // console.log(findResult2)
    // console.log(ctx.request.body.index_id)
    for(var i = 0;i<findResult2.list.length;i++){
        var id = findResult2.list[i]._id.toString()
        if(id === ctx.request.body.index_id){
            findResult2.list[i].comm.push({username:username,text:ctx.request.body.text})
                findResult2.markModified('comm')
                await findResult2.save((err)=>{
                   console.log(err)
                });
                ctx.body = findResult2
        }
    }
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