// app.js
App({
  onLaunch() {
    
    //wx.setStorageSync('LoginCookie',"[gfsessionid=1;]")
    
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.loadFontFace({
      family: 'DD',
      global:true,
      source: 'url("https://farm-server.fushisanlang.cn/ttf/D.ttf")',
      success: res => {
        console.log('font load success', res)
      },
      fail: err => {
        console.log('font load fail', err)
      },
     
    }),
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null,
    Cookie : ""
  }
})
