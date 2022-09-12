<template>
  <div class="user">
    <PageSearch
      :searchFormConfig="searchFormConfig"
      @handleResetClick="handleResetClick"
      @handleSearchClick="handleSearchClick"
    />
    <PageContent
      :contentTableConfig="contentTableConfig"
      pageName="users"
      ref="pageContentRef"
      @handleNewData="handleNewData"
      @handleEditData="handleEditData"
    />
    <PageModal
      :modalConfig="modalConfigRef"
      ref="pageModalRef"
      :defaultInfo="defaultInfo"
      pageName="users"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStore } from '@/store'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageModal } from '@/hooks/usePageModal'

export default defineComponent({
  name: 'user',
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  setup() {
    const store = useStore()
    const pageInfo = ref({ pageSize: 10, offset: 0 })
    const [pageContentRef, handleResetClick, handleSearchClick] =
      usePageSearch()

    const newCallback = () => {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === 'password'
      )
      if (passwordItem && 'isHidden' in passwordItem) {
        passwordItem.isHidden = false
      }
    }

    const editCallback = () => {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === 'password'
      )
      if (passwordItem && 'isHidden' in passwordItem) {
        passwordItem.isHidden = true
      }
    }

    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(newCallback, editCallback)

    const modalConfigRef = computed(() => {
      const departmentItem = modalConfig.formItems.find(
        (item) => item.field === 'departmentId'
      )
      const roleItem = modalConfig.formItems.find(
        (item) => item.field === 'roleId'
      )
      if (departmentItem) {
        departmentItem.options = store.state.entireDepartment.map((item) => {
          return { label: item.name, value: item.id }
        })
      }
      if (roleItem) {
        roleItem.options = store.state.entireRole.map((item) => {
          return { label: item.name, value: item.id }
        })
      }
      return modalConfig
    })

    return {
      searchFormConfig,
      contentTableConfig,
      modalConfigRef,
      handleResetClick,
      handleSearchClick,
      pageContentRef,
      pageInfo,
      pageModalRef,
      defaultInfo,
      handleNewData,
      handleEditData
    }
  }
})
</script>

<style scoped lang="less"></style>
