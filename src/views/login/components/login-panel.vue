<template>
  <div class="login-panel">
    <h1 class="title">后台管理登录</h1>
    <el-tabs type="border-card" class="demo-tabs" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon class="icon"><i-ep-avatar /></el-icon>
            <span>账号登录</span>
          </span>
        </template>
        <login-account ref="accountRef"></login-account>
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon class="icon"><i-ep-cellphone /></el-icon>
            <span>手机登录</span>
          </span>
        </template>
        <login-phone ref="phoneRef"></login-phone>
      </el-tab-pane>
    </el-tabs>
    <div class="control">
      <el-checkbox v-model="isRememberPWD" label="记住密码" />
      <el-link type="primary">忘记密码？</el-link>
    </div>
    <el-button type="primary" class="login-btn" @click="handleLogin"
      >立即登录</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LoginAccount from './login-account.vue'
import LoginPhone from './login-phone.vue'

export default defineComponent({
  components: {
    LoginAccount,
    LoginPhone
  },
  setup() {
    const isRememberPWD = ref(true)
    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    const phoneRef = ref<InstanceType<typeof LoginPhone>>()
    const currentTab = ref('account')

    function handleLogin() {
      if (currentTab.value === 'account') {
        accountRef.value?.loginAction(isRememberPWD.value)
      } else {
        phoneRef.value?.loginAction()
      }
    }
    return {
      isRememberPWD,
      handleLogin,
      accountRef,
      phoneRef,
      currentTab
    }
  }
})
</script>

<style scoped lang="less">
.login-panel {
  width: 350px;
  text-align: center;
  margin-bottom: 200px;
  .title {
    font-size: 26px;
    color: #409eff;
  }
  .custom-tabs-label {
    display: flex;
    align-items: center;
    justify-content: center;
    .icon {
      margin-right: 5px;
    }
  }

  .control {
    display: flex;
    justify-content: space-between;
  }
  .login-btn {
    margin-top: 10px;
    width: 100%;
    height: 40px;
  }
}
</style>
