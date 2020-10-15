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
    id:'',
    index_id:'',
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
    // console.log(options)
    let id = options.id   //将id获取到
    let username = options.username  //将用户名获取到
    this.setData({
      id:id
    })
    var gettoken = app.globalData.token
    var that = this
    wx.request({
      url: 'http://localhost:3000/api/socials/acq',
      method:"GET",
      header:{
        'content-type':'application/json'
      },
      success:function(res){
        // console.log(res)
        var data = res.data
        for(var i = 0;i<data.length;i++){
          if(data[i].username == username){
            // console.log(data[i])
            that.setData({
              id:data[i]._id
            })
            var list = data[i].list
            for(var j = 0;j<list.length;j++){
              if(list[j]._id == id){
                console.log(list[j])
                that.setData({
                  list:list[j],
                  index_id:list[j]._id
                })
              }
            }
          }
        }
      },
      fail:function(err){
        console.log(err)
      }
    })
  },
  submitForm:function(){
    var that = this
    wx.request({
      url: 'http://localhost:3000/api/socials/current',
      method:'GET',
      header:{
        'content-type':'application/json',
        'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmODU1MTZkYWI3MTkzMmQzNDY0NDhlMCIsInVzZXJuYW1lIjoiamlqaSIsImlhdCI6MTYwMjc2NTYxNSwiZXhwIjoxNjAyNzY5MjE1fQ.eK3aaOGez-m5m2lbGmAw1upxHo0ekmZzigWKrNTZ-ME'
      },
      success:function(res){
        var id = res.data.id
        var id_2 = that.data.id
        var index_id = that.data.index_id
        console.log(id)      
        console.log(id_2)
        wx.request({
          url: 'http://localhost:3000/api/socials/comm',
          method:'POST',
          data:{
            id:id,
            id_2:id_2,
            index_id:index_id,
            text:'dfdsafd'
          },
          header:{
            'content-type':'application/json'
          },
          success:function(res){
            console.log(res)
          },
          fail:function(err){
            console.log(err)
          }
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