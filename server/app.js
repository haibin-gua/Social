const Koa = require('koa');
const Router = require('koa-router');
const mongoose = require('mongoose');
const koabody = require('koa-body');
const passport = require('koa-passport');

//实例化
const app = new Koa();
const router = new Router();


app.use(passport.initialize());
app.use(passport.session());
//回调到config文件中，passport.js
require('./passport')(passport);

app.use(koabody());

//引入model
const socials = require('./router/api/socials');


const db = 'mongodb://localhost:27017/Social';
//连接数据库
mongoose.connect(db,{ //创建数据库
    useNewUrlParser:true,
    useFindAndModify:true,
    useCreateIndex:true,
    useUnifiedTopology: true
}).then(()=>{
        console.log("数据库连接成功");
    })
    .catch(err=>{
        console.log(err);
    });


//配置路由地址
router.use('/api/socials',socials);

//配置路由
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000,()=>{
    console.log('ok');
})