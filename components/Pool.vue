<style scoped>
  #lightView{
    position: relative;
    background-image: url("../img/lightbgNoLight.png");
    background-size: 100% 100%;
    padding:20px 20px 15px;
    width:65vw;
    margin:45px auto 0;
    bottom:-2vh;
  }
  #lightingView{
    position: relative;
    background-image: url("../img/lightbgLighting.png");
    background-size: 100% 100%;
    padding:20px 20px 15px;
    width:65vw;
    margin:45px auto 0;
    bottom:-2vh;
    z-index:5;
  }
  #lightView>div, #lightingView>div{
    width:10vw;
    margin:0 1vw;
    display: flex;
    align-items: center;
  }
  .gameBtn{
    padding:0.5vh 0;
    font-size:20px;
    font-weight: 600;
  }
</style>

<template>
  <div class="hello">
    <!--顶部按钮-->
    <div style="position:fixed;top:0;left:0;width:100vw;display: flex;justify-content: space-between;align-items: center;z-index:999;padding: 2px;">
      <div onclick="history.back()">
        <img src="../img/back.png" alt="" style="width:11vw;">
      </div>
      <div onclick="history.back()">
        <img src="../img/changePrize.png" alt="" style="width:25vw;">
      </div>
    </div>
    <!--标题-->
    <div style="position:fixed;top:2vh;left:0;width:100vw;display: flex;justify-content: center;align-items: center">
      <div style="font-size: 20px;color:#fff">{{prizeItem.name}}</div>
    </div>
    <!--灯泡-->
    <div id="lightView" v-if="!lighting">
      <div v-for="item in lights" style="position: relative;z-index: 5">
        <img v-if="item" src="../img/isLight.png" alt="" style="width:100%;">
        <img src="../img/noLight.png" v-else alt="" style="width:100%;">
      </div>
    </div>
    <div id="lightingView" v-else>
      <div v-for="item in lights" style="position: relative;z-index: 5">
        <img v-if="item" src="../img/isLight.png" alt="" style="width:100%;">
        <img src="../img/noLight.png" v-else alt="" style="width:100%;">
      </div>
    </div>
    <!--主内容-->
    <main style="margin:0 auto 0;position: relative;width:98vw" class="activeMain">
      <!--四个角图片-->
      <img src="../img/activeCornerImage.png" alt="" class="activeCorner activeCornerTopLeft">
      <img src="../img/activeCornerImage.png" alt="" class="activeCorner activeCornerTopRight">
      <img src="../img/activeCornerImage.png" alt="" class="activeCorner activeCornerBottomLeft">
      <img src="../img/activeCornerImage.png" alt="" class="activeCorner activeCornerBottomRight">
      <!--获奖记录-->
      <div style="position:absolute;top:0;left:0;width:100%;background-color: rgba(0,0,0,.2);color:#dcc14c;text-align: left;padding:3px 10px;font-size:16px;">
        公告: xxxxxxx获得了{{prizeItem.name}}
      </div>
      <!--转盘-->
      <div style="margin:10vh 0 3vh;">
        <div style="position: relative;">
          <div>
              <img src="../img/01_1.png" alt="" id="wheel" style="width:100%;">
              <img src="../img/02.png" alt="" class="btmImg" style="width:100%">
          </div>
          <div style="position:absolute;z-index: 10;bottom:-6.5vh;left:0;width:100%;display: flex;justify-content: center;align-items: center">
            <div style="width:50%;">
              <my-button v-if="this.isBtn" @click="onStop" disabled>
                <div class="gameBtn">停 止</div>
              </my-button>
              <div v-else>
                <my-button v-if="this.status" @click="onStop">
                  <div class="gameBtn">停 止</div>
                </my-button>
                <my-button v-else @click="onPlay">
                  <div class="gameBtn">开 始</div>
                </my-button>
              </div>
            </div>
          </div>
        </div>
        <!--领奖img-->
        <div v-on:click="goMyPrize" style="position:absolute;right:-5vw;top:5vh" v-show="winCount">
          <img src="../img/getprize.png" alt="" style="width:55%;">
        </div>
      </div>
    </main>
    <!--底部-->
    <footer style="margin-top:5vh;">
      <div style="color:#f58727;font-size:16px;">
        <div v-if="remain && remain > 0">
          今日剩余免费抽奖次数：{{remain}}次
        </div>
        <div style="font-size:15px;width:96vw;margin:0 auto">
          今日免费抽奖次数已用完，
          <span v-on:click="getShowShare" style="color:#6fab1a;text-decoration: underline">
            点击获取更多免费机会！
          </span>
        </div>
      </div>
      <div style="text-align: left;width:94vw;margin:2vh auto">
        <div class="titleStyle">
          抽奖规则：
        </div>
        <div style="text-indent: 2em">
          抽奖规则抽奖规则抽奖规则抽奖规则抽奖规则抽奖规则抽奖规则抽奖规则抽奖规则
        </div>
      </div>
    </footer>
    <!--分享详情model-->
    <my-popup class="alert" v-show="this.showShare">
      <div style="background-color: #fff;z-index:3" @click.stop="">
        <div class="activeMain getChanceView" style="padding:6vh 2vw 2vh">
          <!--四个角图片-->
          <img src="../img/activeCornerImage.png" alt="" class="activeCorner activeCornerTopLeft">
          <img src="../img/activeCornerImage.png" alt="" class="activeCorner activeCornerTopRight">
          <img src="../img/activeCornerImage.png" alt="" class="activeCorner activeCornerBottomLeft">
          <img src="../img/activeCornerImage.png" alt="" class="activeCorner activeCornerBottomRight">
          <!--大皮膏-->
          <div style="position:absolute;right:2vw;top:-1.5vh;font-size:35px;color:#ff5000" class="closeShareView" v-on:click="closeShare">
            &times;
          </div>
          <!--主体内容-->
          <div style="color:#fd5100;font-weight: 600">还没玩够？更多的免费机会等你领！</div>
          <ul class="shareUl">
            <li>
              <div>分享给更多好友即可获得更多抽奖机会，每日限5次</div>
              <span>立即分享</span>
            </li>
            <li>
              <div>下载并用微信号登录TheBlue App即可获得10次免费抽奖机会</div>
              <span v-on:click="goDownHtml">立刻下载</span>
            </li>
            <li>
              <div>观看《男人玩什么——皮装怎么玩》即可获取2次免费抽奖机会</div>
              <span>前往观看</span>
            </li>
            <li>
              <div>观看《男人玩什么——皮靴的工艺》即可获得2次免费抽奖机会</div>
              <span>前往观看</span>
            </li>
          </ul>
        </div>
      </div>
    </my-popup>
  </div>
</template>

<script>
import global from '@/global'
import axios from 'axios'
import Vue from 'vue'
import { Button, MessageBox } from 'mint-ui'
import MyButton from '@/components/MyButton'
import MyPopup from '@/components/MyPopup'
// import jQuery from 'jquery'
Vue.component(Button.name, Button)
Vue.component(MyButton.name, MyButton)
Vue.component(MyPopup.name, MyPopup)

class Wheel {
  constructor (ondraw, ondrawstop, currentNum) {
    this.arr = [ 7, -1, 3, -2, 2, -3, 5, -1, 1, -2, 7, -1, 4, -2, 3, -2, 6, -1, 2, -3 ]
    this.willstop = false
    this.running = false
    this.ondraw = ondraw
    this.ondrawstop = ondrawstop
    this.currentNum = currentNum
    this.rotDeg = 360 / this.arr.length
    this.tamp = -9
    this.tampTo = this.tamp + this.rotDeg
    this.dura = 60
    this.ontimer = function () {
      let v = this.arr.shift()
      this.arr.push(v)
      this.ondraw(this.arr)
      if (this.willstop) {
        if (this.canwin) {
          this.onstop()
        } else {
          this.onLostStop()
        }
      } else {
        setTimeout(this.ontimer, this.dura)
      }
      // 动画层
      let wheel = document.getElementById('wheel')
      wheel.style.transform = `rotate(${this.tampTo}deg)`
      /* jQuery('#wheel').css({
        transform: `rotate(${this.tampTo}deg)`
      }) */
      this.tamp += this.rotDeg
      this.tampTo = this.tamp + this.rotDeg
    }.bind(this)
  }

  play (canwin) {
    if (this.running) {
      // this.stop()
      return
    }
    this.willstop = false
    this.running = true
    this.canwin = canwin
    setTimeout(this.ontimer, this.dura)
  }

  stop () {
    this.willstop = true
  }

  reset () {
    this.currentNum = 0
  }

  onLostStop () {
    let winNum = 7 - this.currentNum
    if (this.arr[0] === 7 || this.arr[0] === winNum) {
      setTimeout(this.ontimer, this.dura)
    } else {
      this.onstop()
    }
  }

  async onstop () {
    console.log(`onstop-start:currentNum=${this.currentNum},val=${this.arr[0]}`)
    this.running = false
    if (this.arr[0] === 7) {
      this.currentNum = 7
      this.ondrawstop(this.currentNum, this.arr[0])
      return
    }
    this.currentNum += this.arr[0]
    this.currentNum = Math.abs(this.currentNum)
    if (this.currentNum > 7) {
      this.currentNum = 14 - this.currentNum
    }
    this.ondrawstop(this.currentNum, this.arr[0])
    console.log(`onstop-end:currentNum=${this.currentNum},val=${this.arr[0]}`)
  }
}

export default {
  name: 'pool',
  data () {
    return {
      status: 0,
      winCount: null,
      win: false,
      suggestWin: false,
      showShare: false,
      remain: null,
      currentNum: 0,
      isBtn: false,
      lighting: false,
      lights: new Array(7).fill(false),
      allLightTrue: new Array(7).fill(true),
      allLightFalse: new Array(7).fill(false),
      prizeItem: global.prizeItem,
      wheel: new Wheel((arr) => {
      }, (num, val) => {
        if (num === 7) {
          this.win = true
        }
        this.onstop(num, val)
      }, global.prizeItem.num)
    }
  },
  methods: {
    cleanClick () {
      this.showShare = true
    },
    closeShare () {
      this.showShare = false
    },
    getShowShare () {
      this.showShare = true
    },
    async sleep (ms) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve()
        }, ms)
      })
    },
    async lightChangeAnimate (to) {
      let changeLight = this.currentNum - to
      let step = changeLight > 0 ? -1 : 1
      while (true) {
        if (this.currentNum === to) {
          break
        }
        await this.sleep(global.lightSpeed)
        if (step < 0) {
          this.lights.splice((this.currentNum - 1), 1, (step > 0))
        } else {
          this.lights.splice(this.currentNum, 1, (step > 0))
        }
        this.currentNum += step
      }
    },
    async lightChange (num, val, animate = true) {
      console.log(typeof val, val)
      if (animate) {
        if (val === 7) {
          console.log('执行')
          this.lights = this.allLightTrue
        } else if (this.currentNum + val < 0) {
          await this.lightChangeAnimate(0)
          await this.lightChangeAnimate(num)
        } else if (this.currentNum + val > 6) {
          await this.lightChangeAnimate(7)
          await this.lightChangeAnimate(num)
        } else {
          await this.lightChangeAnimate(num)
        }
      } else {
        for (let i = 0; i < this.lights.length; ++i) {
          this.lights[i] = (i < num)
        }
        this.currentNum = num
      }
    },
    async lightbgChange (num) {
      for (let i = 0; i < num; ++i) {
        await this.sleep(200)
        this.lighting = !this.lighting
      }
    },
    async allLightChange (num) {
      let bool = true
      for (let a = 0; a < num; ++a) {
        await this.sleep(250)
        this.lights = new Array(7).fill(!bool)
        bool = !bool
      }
    },
    async onstop (num, val) {
      let resp = await axios.get(`${global.apibase}result`, {params: {token: global.token, pool_id: this.$route.query.id, win: this.win ? 1 : 0, num: num}})
      console.log(resp)
      if (resp.status === 200 && resp.data.result === 'ok') {
        // resp.data.id 传进输入页面
        console.log(resp.data)
        if (resp.data.id) {
          this.suggestWin = resp.data.win
          this.remain = resp.data.remain
          if (val !== 7) {
            await this.lightbgChange(4)
          }
          await this.lightChange(num, val, true)
          if (this.win) {
            global.winCount++
            this.winCount++
            await this.sleep(250)
            if (val === 7) {
              this.lightbgChange(7)
              await this.allLightChange(6)
            } else {
              this.lightbgChange(5)
              await this.allLightChange(6)
            }
          }
          setTimeout(() => {
            if (this.win) {
              alert('恭喜您同时点亮了7盏灯，您将获得您所选取的相应奖品(跳转进我的奖品)')
              this.isBtn = false
              this.status = 0
              let prizeObj = {
                id: resp.data.id,
                address: null,
                name: null,
                phone: null,
                status: 0,
                time: new Date().getTime() / 1000,
                pool: 1
              }
              global.PrizeMesInfoData = prizeObj
              this.$router.push({path: 'prizeMesInfo'})
            } else {
              alert('还差一点，再接再厉')
              this.isBtn = false
              this.status = 0
            }
          }, 800)
        }
      } else {
        this.isBtn = false
        this.status = 0
        alert('网络连接失败，请重试')
      }
    },
    onPlay () {
      if (this.win) {
        this.lighting = false
        this.lightChange(0, null, false)
        this.win = false
        this.wheel.reset()
      }
      if (this.remain <= 0) {
        MessageBox.alert('次数用尽', '今日免费抽奖次数已用完')
        return
      }
      this.status = 1
      this.wheel.play(this.suggestWin)
    },
    onStop () {
      this.isBtn = true
      this.wheel.stop()
    },
    goDownHtml () {
      this.$router.push({path: 'downLoad'})
    },
    goMyPrize () {
      this.$router.push({path: 'myPrize'})
    }
  },
  async created () {
    this.currentNum = global.prizeItem.num
    this.winCount = global.winCount
    console.log('lastNum: ', this.lastNum)
    let resp = await axios.get(`${global.apibase}/select_pool`, {params: {token: global.token, pool_id: this.$route.query.id}})
    if (resp.status === 200 && resp.data.result === 'ok') {
      console.log('pool:', resp.data)
      this.remain = resp.data.remain
      this.suggestWin = resp.data.win
    } else {
      console.log('call select_pool failed:', resp)
    }
  },
  mounted () {
    this.lightChange(global.prizeItem.num, null, false)
  }
}
</script>
