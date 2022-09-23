// login.js
var username
var password
Page({
  
  username: function (e) {
    var value = e.detail.value;
    this.setData({
      username: value, 
    })

   },
  password: function (e) {
    var value = e.detail.value; 
    this.setData({
      password: value,
    })
   },
   Fu:function(){
    wx.redirectTo({
      url: '../../pages/fu/fu',
    })
  },
  registered:function(){
    wx.redirectTo({
      url: '../registered/registered',
    })
  },
  doLogin: function (e) {
    var that = this;
    if (that.data.username.length == 0 || that.data.password.length == 0) { 
      wx.showToast({
        icon: 'none',
        title: '用户名或密码不能为空！',
        duration: 2000,
      })
    } else {
      var UserName = this.data.username
      wx.request({ 
        url: 'https://farm-server.fushisanlang.cn/user/signin',
        method: "post",
        header: {
          'content-type': 'application/json'
        },
        data: {
          UserName: this.data.username, 
          Password: this.data.password,
        },
        success: function (res) { 
            that.setData({
              code :res.statusCode,
              session: res.cookies,
            })
         console.log(that.data.code)
          if (that.data.code == 200) { 
            wx.showToast({
              title: '登录成功',
            })
            wx.setStorageSync('LoginCookie', res.cookies); 
            console.log(UserName)
            wx.setStorageSync('UserName', UserName); 
            wx.redirectTo({
              url: '../index/index', 
            })
          } else {
            wx.showToast({
              icon: 'none',
              title: '用户名或密码错误',
            })
          }

        }
      })
    }
  },
})