<template>
  <div class="app-container">
    <el-config-provider :locale="locale">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
export default defineComponent({
  setup() {
    return {
      locale: zhCn
    }
  }
})
</script>

<style lang="less">
.app-container {
  height: 100%;
}
</style>
