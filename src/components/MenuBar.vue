<template>
  <div class="menu-wrapper">
    <el-scrollbar class="scrollbar-wrapper" >
      <logo-view :isCollapse="isCollapse"/>
      <el-menu
          ref="main-menu"
          :collapse="isCollapse"
          :unique-opened="true"
          :default-active="state.selectedKey"
          background-color="#304156"
          text-color="rgb(191, 203, 217)"
          active-text-color="rgb(64, 158, 255)"
          @open="handleOpen"
          @close="handleClose"
          @select="onSelect"
      >
        <template v-for="menu in state.menus" :key="menu.title">
          <!-- 没有子菜单时直接显示el-menu-item -->
          <template v-if="!menu.children">
            <el-menu-item
                :key="menu.title"
                class="father"
                :index="menu.title"
            >
              <span class="menu-title">{{ menu.title }}</span>
            </el-menu-item>
          </template>
          <template v-else>
            <!-- 有子菜单时先显示el-sub-menu -->
            <el-sub-menu
                :key="menu.title"
                :index="menu.title"
            >
              <template #title>
                <span class="menu-title">{{ menu.title }}</span>
              </template>
              <!-- 递归查找子菜单还有没有孙菜单-->
              <menu-bar-item :menus="menu.children"></menu-bar-item>
            </el-sub-menu>
          </template>
          <!-- 多级菜单的一级 -->
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script setup>
import { reactive, onMounted, watch } from 'vue'
import router from '@/router/index'
import { useUserStore } from '@/stores/userStore.js'
import { tagUseStore } from '@/stores/tagStore.js'
import LogoView from '@/components/LogoView.vue'
import MenuBarItem from '@/components/MenuBarItem.vue'

const userStore = useUserStore()
const tagStore = tagUseStore()
defineProps(['isCollapse'])

const state = reactive({ menus: userStore.getMenuList, selectedKey: '' })

const handleOpen = (key, keyPath) => {
  // console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  // console.log(key, keyPath)
}
const onSelect = (index, indexPath, item) => {
  const tag = { name: index, meta: { ...userStore.routersMeta[index] }, closable: true, color: 'success', effect: 'dark' }
  tagStore.pushTag(tag)
  tagStore.pushCache(tag)
  tagStore.click(tag)
  router.push({ name: index })
  userStore.selectedKey = index
  // 更新激活的menu，否则的话，首次从其他tag切换到第一个打开的tag会无法更新激活的menu
  state.selectedKey = index
}

onMounted(() => {
  // 初始化时，如果没有打开任何菜单的话，尝试根据当前路由的name反向查找选中的菜单
  if (state.selectedKey === undefined || state.selectedKey === '') {
    state.selectedKey = router.currentRoute.value.name
  }
  tagStore.clean()
  const tag = { name: router.currentRoute.value.name, meta: { ...router.currentRoute.value.meta }, closable: true, color: 'success', effect: 'dark' }
  tagStore.pushTag(tag)
  tagStore.pushCache(tag)
  tagStore.click(tag)
})

watch(() => tagStore.clickTime, (oldValue, newValue) => {
  // console.log(userStore.selectedKey)
  // 监听tag导航的点击次数，如果次数有变化则表示要从store中更新
  state.selectedKey = userStore.selectedKey
})

</script>
<style scoped>
.menu-wrapper {
  background-color: #304156;
  height: 100%;
}

.el-menu-item.is-active {
  color: #fff !important;
  background: #409EFF !important;
}

.el-sub-menu__title:focus, .el-sub-menu__title:hover {
  outline: 0 !important;
  color: #409EFF !important;
  background: none !important;
}

.scrollbar-wrapper {
  overflow-x: hidden !important;
}

.el-scrollbar__bar.is-vertical {
  right: 0;
}

.el-scrollbar {
  height: 100%;
}

</style>
