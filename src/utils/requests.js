import axios from 'axios'
import { ElMessageBox } from 'element-plus'
import { useUserStore } from '@/stores/userStore'

import router from '@/router'

const request = axios.create({
  baseURL: '/api',
  timeout: 60000
})

request.interceptors.request.use(config => {
  // console.log(userStore.status)
  // console.log(config)
  // const token = userStore.token
  // if (token) {
  //   config.headers['Access-Token'] = token
  // }
  return config
}, error => {
  console.log(`err${error}`)
})

request.interceptors.response.use(response => {
  const res = response.data
  const userStore = useUserStore()
  if (res.code !== 20000) {
    if (res.code >= 50000) {
      // console.log(router.currentRoute.value.path)
      if (router.currentRoute.value.path !== '/login') {
        ElMessageBox.confirm('登陆过期', 'Warning', {
          confirmButtonText: 'OK'
        }).then(() => {
          userStore.clean()
          location.reload()
        })
      } else {
        userStore.clean()
      }
    }
  }
  return response
},
error => {
  console.log('error' + error)
})

export default request
