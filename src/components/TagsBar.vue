<template>
  <div class="tags-view-container" ref="refDiv">
    <el-tag
        class="tags-view-item"
        v-for="tag in tagStore.tagsList" :key="tag.name"
        :closable="tag.closable"
        :effect="tag.effect"
        @close="onClose(tag)"
        @click="onClick(tag)"
        @contextmenu.prevent="openMenu(tag, $event)"
    >
      {{tag.name}}
    </el-tag>
    <ul v-show="state.visible" :style="{left:state.left+'px',top:state.top+'px'}" class="contextmenu">
      <li @click="refreshSelectedTag">刷新</li>
      <li @click="closeOthersTags">关闭其他</li>
    </ul>
  </div>

</template>

<script setup>
import router from '@/router/index.js'
import { useUserStore } from '@/stores/userStore.js'
import { tagUseStore } from '@/stores/tagStore.js'
import { reactive, ref, watch } from 'vue'
const userStore = useUserStore()
const tagStore = tagUseStore()
const refDiv = ref()

const state = reactive({
  visible: false,
  top: 0,
  left: 0,
  selectedTag: {},
  affixTags: []
})

const onClose = (tag) => {
  if (tag.color === 'success') {
    const index = tagStore.getTagIndex(tag)
    if (index === 0) {
      // 如果关闭的是当前打开的这个tag,并且这个tag是首个tag，那向后跳一格
      tagStore.click(tagStore.tagsList[1])
      userStore.selectedKey = tagStore.tagsList[1].name
      tagStore.clickTimeAdd()
      router.push({ name: tagStore.tagsList[1].name })
    } else {
      // 如果关闭的是当前打开的这个tag,则先往前跳一格，删掉关闭的tag
      tagStore.click(tagStore.tagsList[index - 1])
      userStore.selectedKey = tagStore.tagsList[index - 1].name
      tagStore.clickTimeAdd()
      router.push({ name: tagStore.tagsList[index - 1].name })
    }
  }
  tagStore.deleteOneTag(tag)
  tagStore.deleteOneCache(tag)
}

const onClick = (tag) => {
  if (tag.color !== 'success') {
    tagStore.click(tag)
    // 把tag的selectedKey、openKeys更新到store中
    userStore.selectedKey = tag.name
    tagStore.clickTimeAdd()
    router.push({ name: tag.name })
  }
}
const openMenu = (tag, e) => {
  const menuMinWidth = 105
  const maxLeft = refDiv.value.offsetWidth - menuMinWidth // left boundary
  const left = e.clientX + 15 // 15: margin right
  if (left > maxLeft) {
    state.left = maxLeft
  } else {
    state.left = left
  }
  state.left = left
  state.top = e.clientY
  state.visible = true
  state.selectedTag = tag
}

const refreshSelectedTag = () => {
  // console.log(state.selectedTag)
  tagStore.deleteOneCache(state.selectedTag)
  // 必须等空白页加载完毕，否则keepAlive中的缓存不会被清理掉
  router.push({ name: '空白页' }).then(() => {
    tagStore.pushCache(state.selectedTag)
    router.push({ name: state.selectedTag.name })
  })
}

const closeOthersTags = () => {
  if (state.selectedTag !== 'success') {
    router.push({ name: state.selectedTag.name })
  }
  tagStore.deleteOtherTag(state.selectedTag)
  tagStore.deleteOtherCache(state.selectedTag)
}

const closeMenu = () => {
  state.visible = false
}

watch(() => state.visible, (n, o) => {
  if (n) {
    document.body.addEventListener('click', closeMenu)
  } else {
    document.body.removeEventListener('click', closeMenu)
  }
})
</script>

<style lang="less" scoped>

.el-tag{
  margin: 5px 3px;
  border-radius: 0;
}

.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  //border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.04), 0 0 3px 0 rgba(0, 0, 0, 0.12);
  .tags-view-item {
    display: inline-block;
    position: relative;
    cursor: pointer;
    height: 26px;
    line-height: 26px;
    padding: 0 8px;
    font-size: 12px;
    margin-left: 5px;
    margin-top: 4px;
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      font-size: 12px;
    }
    li:hover {
      background: #eee;
    }
  }
}

</style>
