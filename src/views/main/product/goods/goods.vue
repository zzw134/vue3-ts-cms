<template>
  <div class="goods">
    <PageContent :contentTableConfig="contentTableConfig" pageName="goods">
      <template #imgSlot="scope">
        <el-image
          style="width: 70px; height: 70px"
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
          fit="cover"
          preview-teleported
          hide-on-click-modal
        /> </template
    ></PageContent>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageContent from '@/components/page-content'
import { contentTableConfig } from './config/content.config'

export default defineComponent({
  name: 'goods',
  components: {
    PageContent
  },
  setup() {
    return {
      contentTableConfig
    }
  }
})
</script>

<style scoped></style>
