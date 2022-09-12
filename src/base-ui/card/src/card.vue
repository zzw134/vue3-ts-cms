<template>
  <div class="zw-card">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span class="title">{{ title }}</span>
        </div>
      </template>
      <slot></slot>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    title: {
      type: String
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less">
:deep(.el-card__header) {
  padding: 10px 15px;
}
:deep(.el-card__body) {
  padding: 15px;
}
.title {
  font-size: 14px;
}
</style>
