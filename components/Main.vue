<style scoped>
</style>

<template>
  <div class="hello">
    <!--顶部按钮-->
    <div style="position:fixed;top:0;left:0;width:100vw;display: flex;justify-content: space-between;align-items: center;z-index:999;padding: 2px;" class="topdiv">
      <div onclick="history.back()">
        <img src="../img/back.png" alt="" style="width:11vw;">
      </div>
      <div @click="getHelp">
        <img src="../img/help.png" alt="" style="width:25vw;">
      </div>
    </div>
    <!--标题-->
    <div style="position:fixed;top:0;left:0;width:100vw;display: flex;justify-content: center;align-items: center">
      <div style="font-size: 30px;color:#fff">活动名称</div>
    </div>
    <!--主内容-->
    <main style="margin:55px auto 0;position: relative;width:98vw" class="activeMain">
      <!--四个角图片-->
      <img src="../img/activeCornerImage.png" alt="" class="activeCorner activeCornerTopLeft">
      <img src="../img/activeCornerImage.png" alt="" class="activeCorner activeCornerTopRight">
      <img src="../img/activeCornerImage.png" alt="" class="activeCorner activeCornerBottomLeft">
      <img src="../img/activeCornerImage.png" alt="" class="activeCorner activeCornerBottomRight">
      <!--主体-->
      <div style="position: relative;z-index:2" id="activeMain">
        <div style="color:#f48826;text-align: left;padding:5px;font-size:16px;line-height:18px;">请选择您像要抽取的奖品。当该奖品的灯点亮至7盏时，即可获得该奖品哦~</div>
        <div class="chooseProductUl">
          <div v-for="item in items" style="background-color: #fff">
            <div v-on:click="onclick(item)" style="width:100%;display:flex;flex-direction: column">
              <img src="../img/iphone.png" alt="" class="product">
              <div class="chooseProductRowBottom">
                <div class="chooseProductRowBottomName" style="">{{item.name}}</div>
                <div style="display: flex;justify-content: flex-end;align-items: center;">
                  <span style="color:#f48728;font-size:16px;">{{item.num}}</span>
                  <img src="../img/isLight.png" alt="" class="light chooseProduct">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <div style="text-align: left;width:90vw;margin:20px auto 0">
      <div class="titleStyle">
        抽奖规则：
      </div>
      <div style="text-indent: 2em">
        抽奖规则抽奖规则抽奖规则抽奖规则抽奖规则抽奖规则抽奖规则抽奖规则抽奖规则
      </div>
    </div>
    <!--帮助弹框-->
    <help-component v-show="this.model" @click="closeModel"></help-component>
  </div>
</template>

<script>
import global from '@/global'
import axios from 'axios'
import Vue from 'vue'
import { Button, Header } from 'mint-ui'
import MyPopup from '@/components/MyPopup'
Vue.component(Button.name, Button)
Vue.component(Header.name, Header)
Vue.component(MyPopup.name, MyPopup)

export default {
  name: 'index',
  data () {
    return {
      items: [],
      model: false
    }
  },
  methods: {
    onclick (item) {
      console.log(item)
      global.prizeItem = item
      this.$router.push(`/wxgame/pool?id=${item.id}`)
    },
    getHelp () {
      console.log('弹出帮助')
      this.model = true
    },
    closeModel () {
      this.model = false
    }
  },
  async created () {
    let resp = await axios.get(`${global.apibase}list_pool`, {params: {token: global.token}})
    if (resp.status === 200 && resp.data.result === 'ok') {
      console.log(resp.data.data)
      this.items = resp.data.data
      for (let key in resp.data.data) {
        global.prizeList[resp.data.data[key].id] = resp.data.data[key]
      }
    } else {
      console.log('loading failed:', resp)
    }
  },
  async mounted () {
    let resp = await axios.get(`${global.apibase}wincount`, {params: {token: global.token}})
    if (resp.status === 200 && resp.data.result === 'ok') {
      console.log('wincount: ', resp.data)
      if (resp.data.count && resp.data.count > 0) {
        global.winCount = resp.data.count
      }
    } else {
      console.log('loading failed:', resp)
    }
  }
}
</script>
