const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data){
    let errors = {};
    if(!Validator.isLength(data.username,{min:2,max:8})){
        errors.username = '用户名的长度不能小于2位且不能大于8位';
    }
    if(!Validator.isAlphanumeric(data.password) || !Validator.isLength(data.password,{min:6,max:16})){
        errors.password = '密码只能由6-16位数字和字母组成'
    }
    return{
        errors,
        isValid:isEmpty(errors)
    }
}