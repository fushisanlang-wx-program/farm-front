// pages/index/index.js
Page({
  data: {
    arr: [],
    UserName: "",
    showField:false,
  },



  onPullDownRefresh: function () { 
    let that = this;
    that.gainLoadingListData()
  },

  gainLoadingListData: function () {
    var that = this;
    var a = wx.getStorageSync('LoginCookie')
    if (a == "") {
      wx.setStorageSync('LoginCookie', "[gfsessionid=1;]")
    }
    wx.request({
      url: 'https://farm-server.fushisanlang.cn/field/info',
      header: {
        'Cookie': wx.getStorageSync('LoginCookie')[0].split(";")[0],
        'content-type': 'application/json',
      },
      success: function (res) {
        if (res.statusCode != 200 || res.data.Code == 401) {
          wx.redirectTo({
            url: '/pages/login/login',
          })
        } else {
          var UserName
          UserName = wx.getStorageSync('UserName')
          console.log(res.data)
          that.setData({
            arr: res.data,
            UserName: UserName,
           showField:true,
          })
        }
      }
    })
  },

  onLoad: function (options) {

    //获取初始化数据 
    this.gainLoadingListData()
  },


 Info: function (event) {
   wx.setStorageSync('fieldId', event.currentTarget.dataset.fieldid)

   wx.redirectTo({
     url: '../../pages/info/info?FieldId=' + event.currentTarget.dataset.fieldid
   })
 },



})