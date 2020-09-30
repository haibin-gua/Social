const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//实例化数据模板
const SocialSchma = mongoose.Schema({
    user:{
        type:String,
        require:true
    },
    pwd:{
        type:String,
        require:true
    }
});
module.exports = Social = mongoose.model("social",SocialSchma);