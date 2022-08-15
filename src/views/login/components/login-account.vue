<template>
  <div class="login-account-container">
    <el-form
      ref="accountFromRef"
      :rules="rules"
      label-position="right"
      label-width="60px"
      :model="accountInfo"
    >
      <el-form-item label="账号" prop="name">
        <el-input v-model="accountInfo.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="accountInfo.password"
          type="password"
          show-password
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { rules } from '../config/account_config'
import type { FormInstance } from 'element-plus'
import localCache from '@/utils/localCache'

export default defineComponent({
  setup() {
    const accountInfo = reactive({
      name: localCache.getCache('accountName') || '',
      password: localCache.getCache('accountPassword') || ''
    })
    const accountFromRef = ref<FormInstance>()

    const store = useStore()

    function loginAction(isRememberPWD: boolean) {
      accountFromRef.value?.validate((valid) => {
        if (valid) {
          if (isRememberPWD) {
            localCache.setCache('accountName', accountInfo.name)
            localCache.setCache('accountPassword', accountInfo.password)
          } else {
            localCache.deleteCache('accountPassword')
          }
          store.dispatch('login/accountLoginAction', { ...accountInfo })
        }
      })
    }

    return {
      accountInfo,
      rules,
      accountFromRef,
      loginAction
    }
  }
})
</script>

<style scoped></style>
