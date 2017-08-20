<style scoped>
  .mask {
    background-color: black;
    opacity: 0.8;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -10000;
  }
  .background {
    position: fixed;
    top:0;
    left:0;
    width: 100vw;
    height: 100vh;
    z-index: 10000;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
  }
  .dialog {
    background: white;
  }
</style>
<template>
  <div class="background" @click='onclick()'>
    <div class="mask">
    </div>
    <div class="dialog">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'my-popup',
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
    onclick: function () {
      this.$emit('click')
    }
  }
}
</script>

