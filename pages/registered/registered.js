// registered.js
var username
var password
var usermail
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
  usermail: function (e) {
    var value = e.detail.value; 
    this.setData({
      usermail: value,
    })
  },
  registered: function (e) {
    var that = this;
    if (that.data.username.length == 0 || that.data.password.length == 0 || that.data.usermail.length == 0) { 
      wx.showToast({
        icon: 'none',
        title: '用户名或密码不能为空！',
        duration: 2000,
      })
    
    } else {
      wx.request({ 
        url: 'https://farm-server.fushisanlang.cn/user/register',
        method: "post",
        header: {
          'content-type': 'application/json'
        },
        data: {
          UserName: this.data.username, 
          Password: this.data.password,
          UserMail: this.data.usermail,
        },
      
        success: function (res) { 
            that.setData({
              code: res.data.code,
              session: res.cookies,
            })
          if (that.data.code == 200 && res.data.code != 405) {
            wx.request({ 
              url: 'https://farm-server.fushisanlang.cn/user/signin',
              method: "post",
              header: {
                'content-type': 'application/json'
              },
              data: {
                UserName: that.data.username, 
                Password: that.data.password,
              },
              success: function (res) { 
                  that.setData({
                    code: res.data.code,
                    session: res.cookies,
                  })
               
                if (that.data.code == 200) { 
                  wx.showToast({
                    title: '登录成功',
                  })
                  wx.setStorageSync('LoginCookie', res.cookies); 
                  wx.redirectTo({
                    url: '../index/index', 
                  })
                } else {
                  wx.showToast({
                    icon: 'none',
                    title:  res.data.Message,
                  })
                }
      
              }
            })
            
          } else {
            var message = res.data.Message
            if (typeof(message) == 'undefined') {
              message = '输入信息异常'
            }
            wx.showToast({
              icon: 'none',
              title: message,
            })
          }

        }
      })
    }
  },
})