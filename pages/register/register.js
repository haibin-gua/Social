// pages/register/register.js
import WxValidate from '../../utils/WxValidate'
import Dialog from '../../miniprogram/miniprogram_npm/@vant/weapp/dialog/dialog';
Page({
  data: {
      username:'',
      password:'',
      password2:''
  },
  //初始化表单
  onLoad: function(options) {   
    this.initValidate();
},
  //验证函数
initValidate() {
  const rules = {
    username: {
      required: true,
      minlength:2,
      maxlength:8
    },
    password:{
      required:true,
      minlength:6,
      maxlength:18
    },
    password2:{
      require:true
    }
  }
  const messages = {
    username: {
      required: '请填写用户名',
      minlength:'用户名的长度不能小于2位且不能大于8位',
      maxlength:'用户名的长度不能小于2位且不能大于8位'
    },
    password:{
      required:'请填写密码',
      minlength:'密码只能由6-16位数字和字母组成',
      maxlength:'密码只能由6-16位数字和字母组成'
    }
  }
  //创建实例对象
  this.WxValidate = new WxValidate(rules, messages)
  },
  submitForm(e) {
    let params = e.detail.value   //获取到表单的值赋值给变量
    console.log(params)
    if(this.WxValidate.checkForm(params) && params.password == password2){    //  使用checkForm方法验证，如果直接传入e
      //验证通过后的操作
      console.log('ddd')                      //获取不到value无法完成验证
    }else{
      let error = this.WxValidate.errorList[0].msg
      Dialog.alert({
        message: error,
      });
    }
},
})