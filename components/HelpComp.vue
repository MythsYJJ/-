<style scoped>
</style>

<template>
  <div v-on:click="next">
    <my-popup>
      <div style="width:95vw">
        <div v-show="this.step === 1">
          <img :src="global.imgbase + '/img/help1.jpg'" alt="" style="width: 100%">
        </div>
        <div v-show="this.step === 2">
          <img :src="global.imgbase + '/img/help2.jpg'" alt="" style="width: 100%">
        </div>
        <div v-show="this.step === 3">
          <img :src="global.imgbase + '/img/help3.jpg'" alt="" style="width: 100%">
        </div>
      </div>
    </my-popup>
  </div>
</template>

<script>
  import Vue from 'vue'
  import MyPopup from '@/components/MyPopup'
  import MyButton from '@/components/MyButton'
  import global from '@/global'
  Vue.component(MyPopup.name, MyPopup)
  Vue.component(MyButton.name, MyButton)

  export default {
    name: 'help-component',
    data () {
      return {
        step: 1,
        global: global
      }
    },
    beforeCreate: function () {
      this.global = global
    },
    created: function () {

    },
    methods: {
      next () {
        if (this.step === 3) {
          this.$emit('click')
          return
        }
        this.step++
      }
    }
  }
</script>
