<template>
  <div class="welcome">
    <div style="display: flex;align-items: center;">

    </div>
    <div style="padding-right: 30px">
      <el-dropdown>
        <span style="cursor: pointer;">欢迎 {{ userStore.userInfo.nickname }} ! <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon></span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="onLogout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/userStore'
// import { tagUseStore } from '@/stores/tagStore.js'
import router from '@/router/index.js'
import { logout } from '@/api/user.js'
import { ArrowDown } from '@element-plus/icons-vue'

const userStore = useUserStore()
// const tagStore = tagUseStore()
const onLogout = () => {
  logout().then(res => {
    userStore.clean()
    // tagStore.clean()
    router.push('/login')
  })
}
</script>

<style scoped>
.welcome {
  height:100%;
  box-shadow: 24px 4px 29px #ccc;
  display:flex;
  justify-content: space-between;
  align-items: center;
}
</style>
