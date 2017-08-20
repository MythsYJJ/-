<style scoped>
  .downloadWidth{
    width:95vw;
    margin:0 auto;
  }
  .downloadWidth>div{
    padding:2vh 0;
  }
  .downloadWidth>div:not(:last-child){
    border-bottom:1px solid #c8b45e;
  }
  .downloadTitle{
    color:#f4872a;
    font-weight: 600;
  }
  .barcodeView{
    width:50%;
    padding:1vh 5vw;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>

<template>
  <div style="text-align: left">
    <header>
      <!--顶部按钮-->
      <div style="position:fixed;top:0;left:0;width:100vw;display: flex;justify-content: space-between;align-items: center;z-index:999;padding: 2px;">
        <div onclick="history.back()">
          <img src="../img/back.png" alt="" style="width:11vw;">
        </div>
      </div>
    </header>
    <!--标题-->
    <div style="position:fixed;top:0;left:0;width:100vw;display: flex;justify-content: center;align-items: center">
      <div style="font-size: 40px;color:#fff">活动名称</div>
    </div>
    <main style="margin-top:12vh;position:relative;z-index: 5">
      <div style="display: flex;justify-content: center;align-items: center">
        <img src="../img/logo.jpg" alt="" style="width:95%">
      </div>
    </main>
    <footer class="downloadWidth">
      <div>
        <span class="downloadTitle">活动时间：</span>
        <span>2017年5月10日到6月10日</span>
      </div>
      <div style="padding-bottom:0">
        <div class="downloadTitle">长按下方二维码下载</div>
        <div class="flex">
          <div class="barcodeView">
            <img src="../img/barcode.png" alt="" style="width:100%;">
            <span>苹果版</span>
          </div>
          <div class="barcodeView">
            <img src="../img/barcode.png" alt="" style="width:100%;">
            <span>安卓版</span>
          </div>
        </div>
      </div>
      <div>
        <div class="downloadTitle">手动下载链接</div>
        <div style="display: flex;justify-content: space-around;margin-top:1vh">
          <div style="color:#6faa1a;text-decoration: underline">苹果版下载</div>
          <div style="color:#6faa1a;text-decoration: underline">安卓版下载</div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
  export default {
    data () {
      return {}
    },
    created: function () {

    },
    methods: {}
  }
</script>
