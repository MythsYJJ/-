<template>
  <div id="app">
    <img src="./img/background.jpg" alt="" width="100%" style="position: fixed;top:0;left:0;z-index:-1">
    <div v-if="errMsg">{{ errMsg }}</div>
    <router-view v-else style="position:relative;z-index:10000" class="app"></router-view>
  </div>
</template>

<script>
import global from '@/global'
export default {
  name: 'app',
  data () {
    return {
      errMsg: null
    }
  },
  beforeCreate () {
    global.token = this.$route.params.token
    global.isNew = this.$route.params.newuser === '1' ? 1 : undefined
    console.log(global.token, global.isNew)
  },
  created: function () {
    // global.initwx()
  }
}
</script>

<style>
  html{

  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #777785;
  width:100vw;
  overflow-x: hidden;
  /*background-color: #222257;*/
  background-color:transparent;
  min-height:100vh;
  font-size:18px;
}
/*common*/
body{
  font-family: "Microsoft YaHei",Arial,Helvetica;
  margin:0;
  padding:0;
  color:#000;
  text-align: justify;
  box-sizing: border-box;
}
*{
  box-sizing: border-box;
}
p,ul,ol,li,h1,h2,h3,h4,h5,h6,dl,dd,dt,label{
  margin:0;
  padding:0;
  list-style:none;
}
input{
  outline-color: transparent;
}
.lf{float:left;}
.rt{float:right;}
.clear{clear:both;}
.flex{
  display: flex;
  align-items: center;
  justify-content: center;
  align-self:center;
}
/*product*/
/*main*/
  .v-modal{
    z-index:99998!important;
  }
  .mint-msgbox-wrapper{
    z-index:99999!important;
  }
.alert{
  width:100vw;
  height:100vh;
  position:fixed;
  top:0;
  left:0;
  z-index:999;
  background-color:rgba(0,0,0,.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.alertView{
  width:70vw;
  min-height:30vh;
  background-color: white;
}
.redTitle{
  color:#e4393c;
}
.titleStyle{
  color:#f58727;
  font-weight:600;
}
/*main - product*/
.header{
  padding:10px 15px;
}
.container{
}
.chooseProductUl{
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  flex-direction: row;
}
.chooseProductUl>div{
  width:48.5%;
  margin:0.75%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border:1px solid #ddd;
}
.chooseProductUl>li:active{
  background-color:#ddd;
}
.activeCorner{
  position:absolute;
  transform: scale(0.8);
}
.activeCornerTopLeft{
  top:-8px;
  left:-8px;
}
.activeCornerTopRight{
  top:-8px;
  right:-8px;
  transform: scaleX(-0.8) scaleY(0.8);
}
.activeCornerBottomLeft{
  bottom:-8px;
  left:-8px;
  transform: scaleX(0.8) scaleY(-0.8);
}
.activeCornerBottomRight{
  bottom:-8px;
  right:-8px;
  transform: scaleX(-0.8) scaleY(-0.8);
}
.chooseProductRowBottom{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding:0 1vw;
}
.chooseProductRowBottomName{
  width:100%;
  font-size:14px;
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.chooseProductRowBottom>div>span{
  margin-right:2vw;
}
.product{
  max-width:100%;
}
.chooseProduct{
  width: 40%;
}
.activeMain{
  background-image: url("img/activebg.jpg");
  background-size: 100% 100%;
  padding:5px;
  border-width:0 1px;
  border-style: solid;
  border-color: #996d00;
}
/*main - lottery*/
#LotteryView{
  display:none;
  position:relative;
}
.singleHtmlBackBtn{
  position:absolute;
  top:1vw;
  right:1vw;
}
.btmImg{
  position:absolute;
  top:0;
  left:0;
  max-width:100%;
}
#lightView,#lightingView{
  display:flex;
}
.getChanceView{
  position:relative;
  width:95vw;
  min-height:30vh;
}
.shareUl{
  margin-top:3vh;
  color:#dfc04b;
}
.shareUl>li{
  display:flex;
  justify-content: space-between;
  width:100%;
  align-items: center;
  margin:3vh 0;
  padding:0 2vw;
  font-size:15px;
}
.shareUl>li>div{
  width:70%;
  text-align: left;
}
.shareUl>li>span{
  width:25%;
  text-align: right;
  color:#6faa1a;
  text-decoration: underline;
}
#wheel{
  transform: rotate(-9deg);
  transition: transform 0.065s linear;
  transform-origin: center center;
}
/*MyPrize*/
.prizeListRow{
  border-bottom:1px solid #ff5001;
  width:90vw;
  margin:10px auto;
  padding:0 10px;
  font-size: 16px;
}
.prizeListRow:active{
  background-color:rgba(0,0,0,.1)
}
.prizeListRowTime{
  text-align: right;
}
.prizeListRowContact{
  text-align:left;
}
</style>
