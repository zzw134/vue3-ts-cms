<template>
  <div class="login-account-container">
    <el-form
      ref="accountFromRef"
      :rules="rules"
      label-position="right"
      label-width="60px"
      :model="accountInfo"
    >
      <el-form-item label="账号" prop="account">
        <el-input v-model="accountInfo.account" />
      </el-form-item>
      <el-form-item label="密码" prop="pwd">
        <el-input v-model="accountInfo.pwd" type="password" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { rules } from '../config/account_config'
import { FormInstance } from 'element-plus'

export default defineComponent({
  setup() {
    const accountInfo = reactive({
      account: '',
      pwd: ''
    })
    const accountFromRef = ref<FormInstance>()

    function loginAction() {
      accountFromRef.value?.validate((valid) => {
        if (valid) {
          console.log('登录')
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
