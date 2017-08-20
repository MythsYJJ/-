<style scoped>

</style>

<template>
  <div>
    <header>
      <div style="font-size:40px;color:#fff">活动名称</div>
    </header>
    <main class="flex" style="flex-direction: column;width:95%;margin:3vh auto 0">
      <img src="../img/logo.jpg" alt="" style="width:100%;">
      <div class="flex" style="flex-direction: column;margin-top:2vw;align-items: flex-start;text-align: left">
        <div>
          <span class="titleStyle">活动时间：</span>
          <span>2017年5月10日至6月10日</span>
        </div>
        <div>
          <div class="titleStyle">活动规则：</div>
          <div style="text-indent: 2em">
            活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则
          </div>
        </div>
      </div>
    </main>
    <footer class="flex" style="margin-top:10px;">
      <my-button>
        <div style="padding:5px 10vw;" @click="goMain">立即参与</div>
      </my-button>
    </footer>
    <!--帮助介绍框-->
    <help-component v-show="this.model" @click="goMain(false)"></help-component>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { Button } from 'mint-ui'
  import MyPopup from '@/components/MyPopup'
  import MyButton from '@/components/MyButton'
  import global from '@/global'
  import HelpComp from '@/components/HelpComp'
  Vue.component(Button.name, Button)
  Vue.component(MyPopup.name, MyPopup)
  Vue.component(MyButton.name, MyButton)
  Vue.component(HelpComp.name, HelpComp)
  export default {
    data () {
      return {
        model: false
      }
    },
    async created () {
      global.initwx()
      /*
      setTimeout(async () => {
        await global.initwx()
        setTimeout(() => {
          global.onwx()
        }, 1000)
      }, 500)
      */
    },
    mounted: function () {
      // global.onwx()
    },
    methods: {
      goMain (bool = true) {
        if (bool && global.isNew === 1) {
          this.model = true
          return
        }
        this.$router.push({path: '/wxgame/main'})
      },
      closeModel () {
        this.model = false
      }
    }
  }
</script>
