<template>
  <div class="logo-wrapper">
    <span v-if="!isCollapse" class="logo-text">XXX平台 V3.0</span>
  </div>
</template>
<script setup>
defineProps(['isCollapse'])
</script>
<style scoped>
.logo-wrapper {
  height: 60px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  /*background-color: #304156;*/
  overflow: hidden;
}

.logo-wrapper img {
  width: 50px;
}

.logo-wrapper span {
  color: rgb(191, 203, 217);
}

.logo-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
}
</style>
