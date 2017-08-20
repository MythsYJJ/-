import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Main from '@/components/Main'
import Pool from '@/components/Pool'
import DownLoad from '@/components/DownLoad'
import WinInfo from '@/components/WinInfo'
import MyPrize from '@/components/MyPrize'
import PrizeMesInfo from '@/components/PrizeMesInfo'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/wxgame/:token/:newuser',
      name: 'Index',
      component: Index
    },
    {
      path: '/wxgame/wininfo',
      name: 'wininfo',
      component: WinInfo
    },
    {
      path: '/wxgame/main',
      name: 'main',
      component: Main
    },
    {
      path: '/wxgame/pool',
      name: 'pool',
      component: Pool
    },
    {
      path: '/wxgame/download',
      name: 'DownLoad',
      component: DownLoad
    },
    {
      path: '/wxgame/myprize',
      name: 'myPrize',
      component: MyPrize
    },
    {
      path: '/wxgame/prizemesinfo',
      name: 'prizeMesInfo',
      component: PrizeMesInfo
    }
  ]
})
/*
router.afterEach(route => {
  setTimeout(() => {
    global.initwx()
  }, 500)
})
*/
export default router
