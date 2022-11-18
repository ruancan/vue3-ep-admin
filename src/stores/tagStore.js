import { defineStore } from 'pinia'

export const tagUseStore = defineStore('tagStore', {
  // persist: true,
  state: () => (
    {
      tagsList: [],
      // 需要keepAlive的
      cachedViews: [],
      // tag点击次数
      clickTime: 0
    }),
  getters: {
    getTagsList: (state) => { return state.tagsList }
  },
  actions: {
    clean () {
      this.tagsList = []
      this.cachedViews = []
      this.clickTime = 0
    },
    getTagIndex (tag) {
      for (let i = 0; i < this.tagsList.length; i++) {
        if (this.tagsList[i].name === tag.name) {
          return i
        }
      }
      return -1
    },
    getCacheIndex (tag) {
      for (let i = 0; i < this.cachedViews.length; i++) {
        if (this.cachedViews[i] === tag.meta.componentName) {
          return i
        }
      }
      return -1
    },
    deleteOneTag (tag) {
      const tagIndex = this.getTagIndex(tag)
      this.tagsList.splice(tagIndex, 1)
    },
    deleteOneCache (tag) {
      // console.log(this.cachedViews)
      const index = this.getCacheIndex(tag)
      if (index > -1) {
        this.cachedViews.splice(index, 1)
      }
      // console.log(this.cachedViews)
    },
    deleteOtherTag (tag) {
      const index = this.getTagIndex(tag)
      const t = this.tagsList[index]
      t.closable = false
      t.color = 'success'
      t.effect = 'dark'
      this.tagsList = [t]
      this.cachedViews = [name]
    },
    deleteOtherCache (tag) {
      this.cachedViews = [tag.meta.componentName]
    },
    pushTag (tag) {
      const index = this.getTagIndex(tag)
      if (index === -1) {
        this.tagsList.push(tag)
      }
    },
    pushCache (tag) {
      const index = this.getCacheIndex(tag)
      if (index === -1) {
        this.cachedViews.push(tag.meta.componentName)
      }
    },
    insertTag (tag, index) {
      const i = this.getTagIndex(tag)
      if (i === -1) {
        this.tagsList.splice(index, 0, tag)
      }
    },
    click (tag) {
      for (let i = 0; i < this.tagsList.length; i++) {
        if (this.tagsList[i].name === tag.name) {
          this.tagsList[i].color = 'success'
          this.tagsList[i].effect = 'dark'
        } else {
          this.tagsList[i].color = 'info'
          this.tagsList[i].effect = 'plain'
        }
      }
      this.tagsList[0].closable = this.tagsList.length !== 1
    },
    clickTimeAdd () {
      this.clickTime++
    }
  }
})
