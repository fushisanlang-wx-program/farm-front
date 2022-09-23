// pages/info/info.js
Page({

  data: {
    FieldId: 0,
    showInfo: false,
  },
  onLoad: function (option) {

    //获取初始化数据 
    this.gainLoadingListData(option)
  },
  onPullDownRefresh: function (option) {
    let that = this;
    that.setData({
 
      showField: false,
    }) 
    this.gainLoadingListData(option)
  },
  gainLoadingListData: function (option) {
    var that = this;
    var a = wx.getStorageSync('LoginCookie')
    if (a == "") {
      wx.setStorageSync('LoginCookie', "[gfsessionid=1;]")
    }
    wx.request({

      url: 'https://farm-server.fushisanlang.cn/field/info/' + wx.getStorageSync('fieldId'),

      header: {
        'Cookie': wx.getStorageSync('LoginCookie')[0].split(";")[0],
        'content-type': 'application/json',
      },
      success: function (res) {

        if (res.statusCode != 200) {
          wx.redirectTo({
            url: '/pages/index/index',
          })
        } else {
          var UserName, timeNow, timeLeft, timeStr

          UserName = wx.getStorageSync('UserName')
          timeNow = Date.now(),
            timeLeft = res.data["MaturationTime"],

            timeStr = getTime(timeNow, timeLeft)

          that.setData({
              fieldInfo: res.data,
              timeStr:timeStr,
              UserName: UserName,
              showField: true,
            }) 
        }
      }
    })
  }
})


 function getTime(num1, num2) {
  var H, M, S
  var returnStr = ""
  if (num2 == 0) {
    return ''
  } else {
    H = parseInt(((num2 - (num1 / 1000)) / 3600))
    M = parseInt(((num2 - (num1 / 1000)) % 3600 / 60))
    S = parseInt((num2 - (num1 / 1000)) % 3600 % 60)
    if (H > 0 || M > 0 || S > 0) {
      if (H > 0) {
        returnStr = returnStr + H + "小时"
      }
      if (M > 0) {
        returnStr = returnStr + M + "分钟"
      }
      if (S > 0) {
        returnStr = returnStr + S + "秒"
      }
      return returnStr
    } else {
      return ''
    }
  }
}