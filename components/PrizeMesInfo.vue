<style scoped>
  input::-webkit-input-placeholder{
    color:rgb(21, 150, 254)
  }
</style>

<template>
  <div>
    <!--顶部按钮-->
    <div style="position:absolute;top:0;left:0;width:100vw;display: flex;justify-content: space-between;align-items: center;z-index:5;padding: 2px;">
      <div onclick="history.back()">
        <img src="../img/back.png" alt="" style="width:11vw;">
      </div>
    </div>
    <!--标题-->
    <div style="position:fixed;top:1vh;left:0;width:100vw;display: flex;justify-content: center;align-items: center">
      <div style="font-size: 30px;color:#fff">活动名称</div>
    </div>
    <!--主体内容-->
    <div style="width:100vw;height:100vh;position:absolute;top:0;left:0;display: flex;justify-content: center;align-items: center">
      <div style="background-color: rgba(255,245,235,1);width:95vw;border-radius: 5px;">
      <header style="padding:3vh 5px;">
        <div style="display: flex;justify-content: center;align-items: center;width:50%;margin:0 auto">
          <img src="../img/myprize1.png" alt="" style="width:75%">
        </div>
      </header>
      <main>
        <div class="prizeListRow" style="width: 100%">
          <div class="prizeListRowContact">
            <span>恭喜你获得了</span>
            <span class="redTitle">
              {{prize}}
            </span>
          </div>
          <div class="prizeListRowTime">{{time}}</div>
        </div>
        <!--信息录入-->
        <div v-if="this.status === 0">
          <div style="text-align: left;width:90vw;margin:0 auto;">获奖者信息填写</div>
          <div>
            <mt-field label="联系人" placeholder="请输入联系人姓名" v-model="data.username"></mt-field>
            <mt-field label="手机号" placeholder="请输入手机号" v-model="data.phone" type="tel"></mt-field>
            <mt-field label="收件地址" placeholder="请输入收件地址" type="textarea" rows="3" v-model="data.address"></mt-field>
          </div>
        </div>
        <div v-else>
          <div>
            <span>联系人</span>
            <span>{{data.name}}</span>
          </div>
          <div>
            <span>手机号</span>
            <span>{{data.phone}}</span>
          </div>
          <div>
            <span>收件地址</span>
            <span>{{data.address}}</span>
          </div>
        </div>
      </main>
      <footer v-if="this.status === 0" style="margin:0 auto;width:50%;padding:2vh 0 1vh">
        <my-button @click="confirmInfo">
          <div>提交</div>
        </my-button>
      </footer>
    </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { Header, Field, MessageBox, Cell } from 'mint-ui'
  import global from '@/global'
  import axios from 'axios'
  import MyButton from '@/components/MyButton'
  Vue.component(Header.name, Header)
  Vue.component(Field.name, Field)
  Vue.component(Cell.name, Cell)
  Vue.component(MyButton.name, MyButton)

  export default {
    data () {
      return {
        data: {
          global: global,
          PrizeMesInfoData: {},
          prizeAlertMes: [],
          prize: '',
          time: null,
          data: {
            username: '',
            phone: '',
            address: ''
          },
          status: 0
        }
      }
    },
    created: function () {
      console.log(global.PrizeMesInfoData)
      this.PrizeMesInfoData = global.PrizeMesInfoData
      this.data = global.PrizeMesInfoData
      this.prizeAlertMes = global.prizeAlertMes
      this.prize = global.prizeList[global.PrizeMesInfoData.pool].name
      this.time = global.getTime(new Date(global.PrizeMesInfoData.time * 1000))
      if (global.PrizeMesInfoData.name || global.PrizeMesInfoData.phone || global.PrizeMesInfoData.address) {
        this.status = 1
      } else {
        this.status = 0
      }
    },
    methods: {
      async confirmInfo () {
        console.log('验证，提示，跳转')
        let resp = await axios.get(`${global.apibase}setwininfo`, {params: {token: global.token, id: this.PrizeMesInfoData.id, name: this.data.username, address: this.data.address, phone: this.data.phone}})
        console.log(resp)
        if (resp.status === 200 && resp.data.result === 'ok') {
          MessageBox.alert('信息已提交，发货前我们将与您填写的信息进行审核，以免误发').then(action => {
            console.log(action)
            window.history.back()
          })
        }
      }
    }
  }
</script>
