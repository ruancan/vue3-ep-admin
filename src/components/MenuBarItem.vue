<template>
  <template v-for="menu in menus" :key="menu.title">
    <!-- 没有子菜单时直接显示el-menu-item -->
    <template v-if="!menu.children">
      <el-menu-item
          :key="menu.title"
          class="menu-son"
          :index="menu.title"
      >
        {{ menu.title }}
      </el-menu-item>
    </template>
    <template v-else>
      <!-- 有子菜单时先显示el-sub-menu -->
      <el-sub-menu
          :key="menu.title"
          class="menu-son"
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
</template>

<script setup>
defineProps(['menus'])
</script>

<style lang="less">

.menu-son {
  background-color: #1f2d3d !important;
  .el-sub-menu__title{
    background-color: #1f2d3d !important;
  }
}

.menu-son:hover {
  background-color: #001528 !important;
}

.el-menu-item.is-active {
  color: #fff !important;
  background: #409EFF !important;
}

</style>
