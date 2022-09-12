<template>
  <div class="role">
    <PageSearch :searchFormConfig="searchFormConfig" />
    <PageContent
      :contentTableConfig="contentTableConfig"
      pageName="role"
      @handleNewData="handleNewData"
      @handleEditData="handleEditData"
    />
    <PageModal
      ref="pageModalRef"
      :modalConfig="modalConfig"
      pageName="role"
      :defaultInfo="defaultInfo"
      :otherInfo="otherInfo"
    >
      <el-tree
        ref="elTreeRef"
        :data="menuList"
        show-checkbox
        node-key="id"
        :props="{ label: 'name', children: 'children' }"
        @check="handleCheckedClick"
      />
    </PageModal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, nextTick } from 'vue'
import { useStore } from '@/store'
import { menuMapToLeafKeys } from '@/utils/mapMenus'
import { ElTree } from 'element-plus'
import PageContent from '@/components/page-content'
import PageSearch from '@/components/page-search'
import PageModal from '@/components/page-modal'
import { contentTableConfig } from './config/content.config'
import { searchFormConfig } from './config/search.config'
import { modalConfig } from '../role/config/modal.config'
import { usePageModal } from '@/hooks/usePageModal'

export default defineComponent({
  name: 'role',
  components: {
    PageContent,
    PageSearch,
    PageModal
  },
  setup() {
    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    const editCallback = (item: any) => {
      const leafKeys = menuMapToLeafKeys(item.menuList)
      nextTick(() => {
        elTreeRef.value?.setCheckedKeys(leafKeys, false)
      })
    }
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(undefined, editCallback)

    const store = useStore()
    const menuList = computed(() => store.state.entireMenu)
    const otherInfo = ref({})
    const handleCheckedClick = (
      checkedObj: object,
      {
        checkedKeys,
        halfCheckedKeys
      }: { checkedKeys: any[]; halfCheckedKeys: any[] }
    ) => {
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      otherInfo.value = { menuList }
    }
    return {
      contentTableConfig,
      searchFormConfig,
      modalConfig,
      defaultInfo,
      pageModalRef,
      handleNewData,
      handleEditData,
      menuList,
      handleCheckedClick,
      otherInfo,
      elTreeRef
    }
  }
})
</script>

<style scoped></style>
