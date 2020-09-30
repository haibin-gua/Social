const Koa = require('koa');
const Router = require('koa-router');
const mongoose = require('mongoose');
const koabody  = require('koa-body');

//实例化koa
const app = new Koa();
const router = new Router();

//引入model
const Social = require('./models/Social');
const { find } = require('./models/Social');
const { async } = require('q');

app.use(koabody());

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

router.post('/add',async(ctx)=>{
    const findResult = await Social.find({user:ctx.request.body.user})
    if(findResult.length > 0){
        ctx.body = {
            user:'用户名已存在'
        }
    }else{
        const newSocial = new Social({
            user:ctx.request.body.user,
            pwd:ctx.request.body.pwd
        });
        //存储到数据库
     await newSocial.save().then(social=>{
        ctx.body = social;
    }).catch((err)=>{
        console.log(err)
    });

    //返回json数据
    ctx.body = newSocial;
    }
});

// router.get('/search',async(ctx)=>{
//     const findResult = await Social.find({socials:ctx.request.body.user})
//     console.log(findResult)
// })


//配置路由
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000,()=>{
    console.log('ok');
})
