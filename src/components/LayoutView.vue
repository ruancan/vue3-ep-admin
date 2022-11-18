<template>
  <el-container class="layout-container">
    <el-aside class="menu-bar">
      <menu-bar :isCollapse="isCollapse"></menu-bar>
    </el-aside>
    <el-container class="layout-main">
      <el-header class="layout-header">
        <header-bar>
        </header-bar>
      </el-header>
      <tabs-bar></tabs-bar>
      <el-main class="layout-content">
        <div class="router-content">
          <div class="tabs-container">
          </div>
          <div class="router-content">
            <router-view v-slot="{ Component, route }">
              <keep-alive :include="cachedViews">
                <component
                    :is="Component"
                    v-if="route.meta.keepAlive"
                    :key="route.meta.componentName"
                />
              </keep-alive>
              <component
                  :is="Component"
                  v-if="!route.meta.keepAlive"
                  :key="route.meta.componentName"
              />
            </router-view>
          </div>
        </div>
      </el-main>
      <el-footer class="layout-footer">ElementPlus @2022 created by RBB</el-footer>
    </el-container>
  </el-container>
</template>

<script setup>
import MenuBar from '@/components/MenuBar.vue'
import HeaderBar from '@/components/HeaderBar.vue'
import TabsBar from '@/components/TagsBar.vue'
import { ref, computed } from 'vue'
import { tagUseStore } from '@/stores/tagStore.js'

const tagStore = tagUseStore()
const isCollapse = ref(false)

const cachedViews = computed(() => {
  return tagStore.cachedViews
})

</script>

<style lang="less" scoped>
.layout-container {
  height: 100vh;

  .menu-bar {
    overflow-y: auto;
  }

  .layout-main {
    .layout-header{
      background: #fff;
      padding: 0
    }
    .layout-footer{
      text-align: center;
    }
  }
}

</style>
