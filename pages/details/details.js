// pages/details/details.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isshow:false,
    show: false,
    username:'',
    list:[{
      title:'',
      body:''
    }]
  },
  pra:function(){
    this.setData({
      isshow:true
    })
  },
  comm:function(){
    this.setData({
      isshow:false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let index = options.index   //将index获取到
    var gettoken = app.globalData.token
    var that = this
    console.log(gettoken)
    wx.request({
      url: 'http://localhost:3000/api/socials/current',
      method:"GET",
      header:{
        'content-type':'application/json',
        'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmN2ZjNmQ5MGE4NzdiMGVhNDBlYTYyMCIsInVzZXJuYW1lIjoiamlqaSIsImlhdCI6MTYwMjU2ODUxNiwiZXhwIjoxNjAyNTcyMTE2fQ.Pjjf0sq_Y9Qf3hfT08PaHtzfKiblTgS2nG5R57pHWDw'
      },
      success:function(res){
        console.log(res)
        that.setData({
          username:res.data.username,
          list:res.data.list[index]
        })
      },
      fail:function(err){
        console.log(err)
      }
    })
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