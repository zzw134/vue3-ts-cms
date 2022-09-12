<template>
  <div class="page-search">
    <ZwForm v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h2 class="title">高级检索</h2>
      </template>
      <template #footer>
        <div class="btns">
          <el-button plain type="primary" @click="handleResetClick"
            ><el-icon><i-ep-refresh /></el-icon>&nbsp;重置</el-button
          >
          <el-button type="primary" @click="handleSearchClick"
            ><el-icon><i-ep-search /></el-icon>&nbsp;搜索</el-button
          >
        </div>
      </template>
    </ZwForm>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ZwForm from '@/base-ui/form'

export default defineComponent({
  components: {
    ZwForm
  },
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    }
  },
  emits: ['handleResetClick', 'handleSearchClick'],
  setup(props, { emit }) {
    const formItems = props.searchFormConfig?.formItems || []
    const itemsField: any = {}
    formItems.forEach((item: any) => {
      itemsField[item.field] = ''
    })

    const formData = ref(itemsField)

    const handleResetClick = () => {
      for (let k in itemsField) {
        formData.value[k] = itemsField[k]
      }
      emit('handleResetClick')
    }

    const handleSearchClick = () => {
      emit('handleSearchClick', formData.value)
    }

    return {
      formData,
      handleResetClick,
      handleSearchClick
    }
  }
})
</script>

<style scoped lang="less">
.page-search {
  .title {
    margin-top: 0;
    padding-top: 20px;
    text-align: center;
    color: #409eff;
  }
  .btns {
    text-align: right;
    padding: 0 20px 10px 0;
  }
}
</style>
