<template>
  <div>
    <el-breadcrumb separator="/">
      <template v-for="item in items" :key="item.name">
        <el-breadcrumb-item :to="item.path ? { path: item.path } : ''">{{
          item.name
        }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IBreadType } from '../types'

export default defineComponent({
  props: {
    items: {
      type: Array as PropType<IBreadType[]>,
      default: () => []
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped></style>
