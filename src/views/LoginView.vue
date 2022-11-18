<template>
  <div>
    <div class="login-container">
      <el-form
          ref="formRef"
          :model="state.loginForm"
          :rules="state.loginRules"
          class="login-form"
          auto-complete="on"
          label-position="left"
      >
        <h3 class="title">XXX平台</h3>
        <el-form-item prop="username">
          <el-input
              v-model="state.loginForm.username"
              name="username"
              type="text"
              auto-complete="on"
              placeholder="username"
              style="width:100%;"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
              v-model="state.loginForm.password"
              :type="state.pwdType"
              name="password"
              auto-complete="on"
              placeholder="password"
              style="width:100%;"
          />
        </el-form-item>
        <el-form-item>
          <el-button
              :loading="state.loading"
              type="primary"
              style="width:100%;"
              @click="handleLogin(formRef)"
          >登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/userStore.js'
import router from '@/router/index.js'
import { login } from '@/api/user.js'

const userStore = useUserStore()

const validatePass = (rule, value, callback) => {
  if (value.length < 5) {
    callback(new Error('密码不能小于5位'))
  } else {
    callback()
  }
}
const formRef = ref()

const state = reactive({
  loginForm: {
    username: '',
    password: ''
  },
  loginRules: {
    username: [{ required: true, trigger: 'blur' }],
    password: [{ required: true, trigger: 'blur', validator: validatePass }]
  },
  loading: false,
  pwdType: 'password',
  redirect: undefined,
  logOnDialogVisible: false
})

const handleLogin = (formRef) => {
  formRef.validate((valid) => {
    if (valid) {
      userStore.clean()
      state.loading = true
      login(state.loginForm).then(res => {
        state.loading = false
        if (res.status === 200 && res.data.code === 20000) {
          userStore.setToken(res.data.sessionId)
          const redirect = router.currentRoute.value.query && router.currentRoute.value.query.redirect
          router.push({ path: redirect || '/' })
        } else {
          ElMessage(res.data.message)
        }
      })
    }
  })
}
</script>

<style lang="less" scoped>
.login-container{
  .login-form {
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
}
  .title {
    font-size: 26px;
    margin: 0 auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
}

</style>
