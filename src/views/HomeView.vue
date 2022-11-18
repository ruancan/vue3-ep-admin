<template>
  <div>
    <el-button @click="i++">{{i}}</el-button>
    <p>在tag导航中的页面，会缓存下来，切换菜单时不会丢失页面内容，从tag导航中关闭时会自动删除缓存</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const i = ref(0)
</script>

<style scoped>

</style>
