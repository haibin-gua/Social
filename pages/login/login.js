// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token:'ddd'
  },
  submitForm:function(e){
    console.log(e.detail)
    var username = e.detail.value.username;
    var password = e.detail.value.password;
    wx.request({
      url: 'http://localhost:3000/api/socials/login',
      method:"POST",
      header:{
        'content-type':'application/json'
      },
      data:{
        'username':username,
        'password':password
      },
      success:function(res){
        console.log(res)
        console.log(res.data.token)
        var token = res.data.token
        var app = getApp()                  //将token存储到全局中方便各个页面调用
        var gettoken = app.globalData.token = token
        console.log(gettoken)
        if(gettoken){    //如果gettoken有数据说明登录成功进行下一步操作
          wx.reLaunch({
          url: '/pages/my/my',
        })
        } 
      },
      fail:function(err){
        console.log(err)
      }
    })
  },
  btn:function(){
   var app = getApp()
   var gettoken = app.globalData.token
   console.log(gettoken)
    wx.request({
      url: 'http://localhost:3000/api/socials/current',
      method:"GET",
      header:{
        'content-type':'application/json',
        'Authorization':gettoken
      },
      success:function(res){
        console.log(res)
      },
      fail:function(err){
        console.log(err)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})