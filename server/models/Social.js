const koaBody = require('koa-body');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//实例化数据模板
const SocialSchema = new Schema({
   username:{
       type:String,
       require:true
   },
   password:{
       type:String,
       require:true
   },
   list:[{
       title:{
           type:String,
           require:true
       },
       body:{
           type:String,
           require:true
       },
       pra:[]
   }]
});

module.exports = Social = mongoose.model("socials",SocialSchema);