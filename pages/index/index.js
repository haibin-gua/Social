//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    list:[]
  },
  details:function(e){
    let index = e.currentTarget.dataset.index;
    console.log(index)
    wx.navigateTo({
      url:'../details/details?index='+index,
      success:function(res){
        console.log(res)
      },
      fail:function(err){
        console.log(err)
      }
    })
  },
  onLoad:function(){
    var that = this
    wx.request({
      url: 'http://localhost:3000/api/socials/acq',
      method:"GET",
      header:{
        'content-type':'application/json'
      },
      success:function(res){
        var list = [];
        console.log(res)
        var data = res.data;
        // console.log(data)
        for(var i = 0;i<data.length;i++){
          for(var j = 0;j<data[i].list.length;j++){
            console.log(data[i].list[j])
            list.push(data[i].list[j])
          }
        }
        that.setData({
          list:list
        })
      },
      fail:function(err){
        console.log(err)
      }
    })
  }
})
