<template>
  <div class="login-phone-container">
    <el-form
      ref="phoneFormRef"
      :rules="rules"
      label-position="right"
      label-width="70px"
      :model="phone"
    >
      <el-form-item label="手机号" prop="number">
        <el-input v-model="phone.number" />
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <div class="code">
          <el-input v-model="phone.code" type="password" />
          <el-button type="primary" class="code-btn">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { rules } from '../config/phone_config'
import type { FormInstance } from 'element-plus'

export default defineComponent({
  setup() {
    const phone = reactive({
      number: '',
      code: ''
    })
    const phoneFormRef = ref<FormInstance>()

    const loginAction = () => {
      phoneFormRef.value?.validate((valid) => {
        if (valid) {
          console.log(222)
        }
      })
    }
    return {
      phone,
      rules,
      phoneFormRef,
      loginAction
    }
  }
})
</script>

<style scoped lang="less">
.code {
  display: flex;
  .code-btn {
    margin-left: 10px;
  }
}
</style>
