//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    list:[],
    handerid:'',
    handername:''
  },
  details:function(e){
    let id = e.currentTarget.dataset.id;
    let username = e.currentTarget.dataset.username;
    // console.log(e)
    // console.log(username)
    // console.log(id)
    wx.navigateTo({
      url:'../details/details?id='+id+'&username='+username,
      success:function(res){
        // console.log(res)
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
        // console.log(res)
        var data = res.data;
        // console.log(data)
        for(var i = 0;i<data.length;i++){
          for(var j = 0;j<data[i].list.length;j++){
            // console.log(data[i].username)
            data[i].list[j].username = data[i].username   //将用户名添加到遍历出来的每一个对象里
            data[i].list[j].id = data[i]._id
            list.push(data[i].list[j])
            // console.log(data[i].list[j])
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
  },
  pra:function(e){
    wx.request({
      url: 'http://localhost:3000/api/socials/current',
      method:'GET',
      header:{
        'content-type':'application/json',
        'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmODU1MTZkYWI3MTkzMmQzNDY0NDhlMCIsInVzZXJuYW1lIjoiamlqaSIsImlhdCI6MTYwMjc1ODA0MiwiZXhwIjoxNjAyNzYxNjQyfQ.mvZPZyYpRIsmRtE-_SU2xNx12jNfjEnbWfCivLgL1R4'
      },
      success:function(res){
        // console.log(res)
        var id = res.data.id;
        var pra = res.data.username;
        var index_id = e.currentTarget.dataset.id;
        var index_name = e.currentTarget.dataset.username
        var index_id2 = e.currentTarget.dataset.id2
        console.log(id)
        console.log(index_id)
        console.log(index_name)
        console.log(index_id2)
        wx.request({
          url: 'http://localhost:3000/api/socials/pra',
          method:'POST',
          data:{
            id:id,
            pra:pra,
            index_id:index_id,
            index_name:index_name,
            index_id2:index_id2
          },
          header:{
            'content-type':'application/json',
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
  }
})
