<style scoped>
</style>

<template>
  <div class="hello">
    <div v-if='remain===0'>
      今天免费抽奖次数已用完。点击获取更多免费机会
    </div>
    <div v-else>
      今天剩余免费抽奖次数：{{remain}}次
    </div>
    <a @click="onstop" href="#">停止</a>
    <div v-if='result===1'>
      填写信息
    </div>
    <div v-if='result===-1'>
      再接再厉
    </div>
  </div>
</template>

<script>
import global from '@/global'
import axios from 'axios'

export default {
  name: 'wininfo',
  data () {
    return {
      remain: 0,
      win: false,
      result: 0
    }
  },
  methods: {
    async onstop () {
      let resp = await axios.get(`${global.apibase}/result`, {params: {token: global.token, pool_id: this.$route.query.id, win: this.win ? 1 : 0, num: 0}})
      if (resp.status === 200 && resp.data.result === 'ok') {
        console.log(resp.data)
        if (resp.data.id) {
          this.result = 1
        } else {
          this.result = -1
        }
      }
    }
  },
  async created () {
    let resp = await axios.get(`${global.apibase}/select_pool`, {params: {token: global.token, pool_id: this.$route.query.id}})
    if (resp.status === 200 && resp.data.result === 'ok') {
      console.log(resp.data)
      this.remain = resp.data.remain
      this.win = resp.data.win
    } else {
      console.log('call select_pool failed:', resp)
    }
  }
}
</script>
