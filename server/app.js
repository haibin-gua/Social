const Koa = require('koa');
const Router = require('koa-router');
const mongoose = require('mongoose');
const koabody  = require('koa-body');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('koa-passport'); 

//实例化koa
const app = new Koa();
const router = new Router();

//引入model
const Social = require('./models/Social');
const tools = require('./tools');

//初始化
app.use(koabody());
app.use(passport.initialize());
app.use(passport.session());

//回调到passport.js文件中
require('./passport')(passport);

router.get('/test',async(ctx)=>{
    ctx.body = {
        msg:'ddd'
    }
});

//连接数据库
mongoose.connect('mongodb://localhost:27017/Social',{
    useNewUrlParser:true,
    useFindAndModify:true,
    useCreateIndex:true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('连接成功')
}).catch((err)=>{
    console.log(err)
})

//注册接口
router.post('/add',async(ctx)=>{
    const findResult = await Social.find({user:ctx.request.body.user})
    if(findResult.length > 0){
        ctx.body = {
            user:'用户名已存在'
        }
    }else{
        const newSocial = new Social({
            user:ctx.request.body.user,
            pwd:tools.enbcrypt(ctx.request.body.pwd)
        });
        //存储到数据库
    await newSocial.save().then(social=>{
        ctx.body = newSocial;
    }).catch((err)=>{
        console.log(err)
    });

    //返回json数据
    ctx.body = newSocial;
    }
});

//登录接口
router.post('/login',async(ctx)=>{
    //查询
    const findResult = await Social.find({user:ctx.request.body.user});
    const user = findResult[0];
    const pwd = ctx.request.body.pwd;
    //判断查没查到
    if(findResult.length == 0){
        ctx.body = {
            user:'用户名不存在'
        };
    }else{
        //查到后验证密码
        var Result = await bcrypt.compareSync(pwd,user.pwd);
        if(Result){
            //返回token
            const payload = {
                id:user.id,user:user.user
            };
            const token = jwt.sign(payload,"secret",{expiresIn:3600});  //生成token

            ctx.body = {
                success:true,
                token:"Bearer" + token
            };
        }else{
            ctx.body = {
                pwd:'密码错误'
            };
        }
    }
});

router.get('/current',passport.authenticate('jwt', { session: false }),async(ctx)=>{
    ctx.body = {
        success:true
    }
})

// router.get('/search',async(ctx)=>{
//     const findResult = await Social.find({socials:ctx.request.body.user})
//     console.log(findResult)
// })


//配置路由
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000,()=>{
    console.log('ok');
})
