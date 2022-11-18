import { createRouter, createWebHashHistory } from 'vue-router'
import defaultConfig from '@/router/config.js'
import { useUserStore } from '@/stores/userStore'
import { userInfo } from '@/api/user.js'
import { getAllItem } from '@/utils/tools.js'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: defaultConfig
})

const userRouterMeta = {}

// menuList为后台回传的菜单信息,menu和router的匹配规则为menu的title对应router的name
const routerFilter = (menuList) => {
  // mKeyObject中是需要保留的路由
  const mKeyObject = {}
  // 所有的一级路由都是需要保留的
  for (const item of defaultConfig) {
    mKeyObject[item.name] = ''
  }
  // 空白页的路由也是需要保留的，用户刷新当前路由时临时跳转
  mKeyObject['空白页'] = ''
  const rKeyObject = {}
  getAllItem(menuList, 'title', mKeyObject)
  getAllItem(defaultConfig, 'name', rKeyObject)
  for (const rKey in rKeyObject) {
    if (mKeyObject[rKey] === undefined) {
      router.removeRoute(rKey)
    } else {
      userRouterMeta[rKey] = rKeyObject[rKey]
    }
  }
}

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const sessionId = userStore.token
  if (sessionId) {
    if (userStore.status) {
      // console.log('有session，且已验证过，放行')
      next()
    } else {
      // console.log('有session，单尚未验证，需要先验证token')
      userInfo().then(res => {
        const body = res.data
        if (body.code !== 20000) {
          userStore.clean()
          userStore.setStatus(false)
          next(`login?redirect=${to.path}`)
        } else {
          userStore.setStatus(true)
          userStore.setUserInfo(body)
          routerFilter(body.data.menus)
          userStore.routersMeta = userRouterMeta
          next({ path: to.path })
        }
      })
    }
  } else {
    if (to.path !== '/login') {
      // console.log('无session，直接进登陆页面')
      next(`login?redirect=${to.path}`)
    } else {
      next()
    }
  }
})

export default router
