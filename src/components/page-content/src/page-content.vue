<template>
  <div class="page-content">
    <ZwTable
      :dataList="dataList"
      :dataCount="dataCount"
      v-bind="contentTableConfig"
      @selectionChange="handleSelectionChange"
      v-model:page="pageInfo"
    >
      <!-- headerhandler插槽 -->
      <template #headerhandler>
        <el-button type="primary" v-if="isCreate" @click="handleNewClick"
          >新建用户</el-button
        >
      </template>
      <!-- 列表插槽 -->
      <template #status="scope">
        <el-button
          size="small"
          plain
          :type="scope.row.enable ? 'success' : 'danger'"
          >{{ scope.row.enable ? '启用' : '禁用' }}</el-button
        >
      </template>
      <template #createAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>
      <template #handle="scope">
        <el-button
          v-if="isUpdate"
          type="primary"
          link
          @click="handleEditClick(scope.row)"
          ><el-icon><i-ep-edit /></el-icon>&nbsp;编辑</el-button
        >
        <el-button
          v-if="isDelete"
          type="primary"
          link
          @click="handleDeleteClick(scope.row)"
          ><el-icon><i-ep-delete /></el-icon>&nbsp;删除</el-button
        >
      </template>
      <!-- 动态插入剩余的插槽 -->
      <template
        v-for="item in otherPropSlots"
        v-slot:[item.slotName]="scope"
        :key="item.prop"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row" />
        </template>
      </template>
    </ZwTable>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import ZwTable from '@/base-ui/table/index'
import { useStore } from '@/store'
import { usePermission } from '@/hooks/usePermission'

export default defineComponent({
  components: {
    ZwTable
  },
  props: {
    contentTableConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  emits: ['handleNewData', 'handleEditData'],
  setup(props, { emit }) {
    const store = useStore()

    const isCreate = usePermission(props.pageName, 'create')
    const isUpdate = usePermission(props.pageName, 'update')
    const isDelete = usePermission(props.pageName, 'delete')
    const isQuery = usePermission(props.pageName, 'query')

    const pageInfo = ref({ currentPage: 1, pageSize: 10 })
    watch(pageInfo, () => {
      getPageData()
    })

    const getPageData = (queryInfo: any = {}) => {
      if (!isQuery) return
      store.dispatch('system/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    getPageData()

    const dataList = computed(() =>
      store.getters['system/pageList'](props.pageName)
    )
    const dataCount = computed(() =>
      store.getters['system/pageCount'](props.pageName)
    )

    const otherPropSlots = props.contentTableConfig?.propList.filter(
      (item: any) => {
        if (item.slotName === 'createAt') return false
        if (item.slotName === 'updateAt') return false
        if (item.slotName === 'status') return false
        if (item.slotName === 'handle') return false
        return true
      }
    )

    function handleSelectionChange(selections: any) {
      console.log(selections)
    }

    const handleNewClick = () => {
      emit('handleNewData')
    }

    const handleEditClick = (item: any) => {
      emit('handleEditData', item)
    }

    const handleDeleteClick = (item: any) => {
      store.dispatch('system/deletePageListAction', {
        pageName: props.pageName,
        id: item.id
      })
    }

    return {
      dataList,
      dataCount,
      handleSelectionChange,
      getPageData,
      pageInfo,
      otherPropSlots,
      isCreate,
      isUpdate,
      isDelete,
      isQuery,
      handleNewClick,
      handleEditClick,
      handleDeleteClick
    }
  }
})
</script>

<style scoped lang="less">
.page-content {
  border-top: 20px solid #f1f2f7;
  padding: 20px;
}
</style>
