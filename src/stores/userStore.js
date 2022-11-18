import { defineStore } from 'pinia'

export const useUserStore = defineStore('useUserStore', {
  persist: true,
  state: () => {
    return {
      menuList: {},
      userInfo: {},
      status: false,
      token: '',
      selectedKey: '',
      routersMeta: {}
    }
  },
  getters: {
    getMenuList: (state) => { return state.menuList },
    getUserInfo: (state) => { return state.userInfo },
    getSelectKey: (state) => { return state.selectedKey }
  },
  actions: {
    clean () {
      this.menuList = {}
      this.userInfo = {}
      this.routersMeta = {}
      this.status = false
      this.token = ''
      this.selectedKey = ''
    },
    setToken (token) {
      this.token = token
    },
    setStatus (status) {
      this.status = status
    },
    setSelectMenu (data) {
      this.openKeys = data.open
      this.selectedKey = data.select
    },
    setUserInfo (data) {
      if (data.code === 20000) {
        this.menuList = data.data.menus
        this.userInfo = {
          username: data.data.username,
          email: data.data.email,
          nickname: data.data.nickname
        }
      } else {
        this.status = false
        this.token = ''
      }
    }
  }
})
