<template>
  <div style="">
    <!--顶部按钮-->
    <div style="position:fixed;top:0;left:0;width:100vw;display: flex;justify-content: space-between;align-items: center;z-index:999;padding: 2px;">
      <div onclick="history.back()">
        <img src="../img/back.png" alt="" style="width:11vw;">
      </div>
    </div>
    <!--标题-->
    <div style="position:fixed;top:1vh;left:0;width:100vw;display: flex;justify-content: center;align-items: center">
      <div style="font-size: 30px;color:#fff">活动名称</div>
    </div>
    <!--主内容-->
    <main style="margin:55px auto 10px;position: relative;width:98vw;" class="activeMain">
      <!--四个角图片-->
      <img src="../img/activeCornerImage.png" alt="" class="activeCorner activeCornerTopLeft">
      <img src="../img/activeCornerImage.png" alt="" class="activeCorner activeCornerTopRight">
      <img src="../img/activeCornerImage.png" alt="" class="activeCorner activeCornerBottomLeft">
      <img src="../img/activeCornerImage.png" alt="" class="activeCorner activeCornerBottomRight">
      <!--我的奖品图-->
      <div style="display: flex;justify-content: center;align-items: center;width:40vw;margin:4vh auto">
        <img src="../img/myprize1.png" alt="" style="max-width:100%;">
      </div>
      <!--奖品list-->
      <div class="mainMarTop">
        <div v-if="this.prizeList">
          <div v-for="item in prizeList" class="prizeListRow" v-on:click="goMesInfo(item)">
            <div class="prizeListRowContact">
              <span style="color:#ff5100;font-size:15px;">
                恭喜你获得了
                <span style="color:#70ab1b">{{global.prizeList[item.pool].name}}！</span>
              </span>
            </div>
            <div class="prizeListRowTime">{{global.getTime(new Date(item.time * 1000))}}</div>
            <div style="color:#1596fe;text-align: right;font-size:13px;margin:0 0 5px;">
              {{global.prizeAlertMes[item.status]}}
          </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {Header} from 'mint-ui'
  import global from '@/global'
  import axios from 'axios'
  Vue.component(Header.name, Header)

  export default {
    data () {
      return {
        prizeList: [],
        global: global
      }
    },
    created: async function () {
      console.log('MyPrize', global.prizeList)
      let resp = await axios.get(`${global.apibase}winlog`, {params: {token: global.token}})
      console.log(resp)
      if (resp.status === 200 && resp.data.result === 'ok') {
        this.prizeList = resp.data.data
      }
    },
    methods: {
      goMesInfo (item) {
        global.PrizeMesInfoData = item
        this.$router.push({path: 'prizeMesInfo'})
      }
    }
  }
</script>

<style scoped>
</style>
