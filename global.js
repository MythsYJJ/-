import axios from 'axios'
/* global wx */
export default {
  // apibase: 'http://192.168.1.254:8082/api/',
  apibase: 'http://wxgame-dev.m7games.com/wxgame/api/',
  imgbase: '../static/',
  token: null,
  isNew: 0,
  winCount: null,
  prizeList: [],
  prizeItem: {},
  wxdata: null,
  PrizeMesInfoData: {},
  getTime (value) {
    return value.getFullYear() + '.' + (value.getMonth() + 1) + '.' + value.getDate()
  },
  lightSpeed: 300, // 灯光效果速度
  prizeAlertMes: ['点击领取并填写联系方式', '奖品将于10个工作日内寄送', '奖品已发货，请注意查收'],
  onwx () {
    wx.ready(function () {
      wx.onMenuShareTimeline({
        title: '快乐大转盘', // 分享标题
        link: 'http://wxgame-dev.m7games.com/wxgame/api/index', // 分享链接
        imgUrl: 'http://m7games.com/wxgame.png', // 分享图标
        success: function () {
          alert('分享到朋友圈')
          // 用户确认分享后执行的回调函数
        },
        cancel: function () {
          alert('取消了')
          // 用户取消分享后执行的回调函数
        }
      })
      wx.onMenuShareAppMessage({
        title: '快乐大转盘', // 分享标题
        desc: '测试用', // 分享描述
        link: 'http://wxgame-dev.m7games.com/wxgame/api/index', // 分享链接
        imgUrl: 'http://m7games.com/wxgame.png', // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {
          alert('分享给好友...')
          // 用户确认分享后执行的回调函数
        },
        cancel: function () {
          alert('取消了')
          // 用户取消分享后执行的回调函数
        }
      })
    })
  },
  initwx () {
    if (this.wxdata) {
      /*
      wx.config(this.wxdata)
      setTimeout(() => {
        this.onwx()
      }, 1000)
      */
    } else {
      axios.get(`${this.apibase}wxconfig`, {params: {}}).then((resp) => {
        if (resp.status !== 200) {
          this.errMsg = 'server error'
          return
        }
        if (resp.data.result !== 'ok') {
          this.errMsg = resp.data.msg
          return
        }
        this.wxdata = resp.data.wxdata
        // this.wxdata.debug = true
        wx.config(this.wxdata)
        this.onwx()
        wx.error(function (res) {
          alert(res)
          console.log(`wx error: ${res}`)
        })
      })
    }
  }
}
