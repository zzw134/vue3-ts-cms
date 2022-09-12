<template>
  <div class="table">
    <div class="header">
      <h3 class="title">
        {{ title }}
      </h3>
      <div class="handler">
        <slot name="headerhandler" />
      </div>
    </div>
    <el-table
      :data="dataList"
      border
      style="width: 100%"
      v-bind="childrenProps"
      @selection-change="handleSelectionChange"
    >
      <template v-if="showSelectionColumn">
        <el-table-column type="selection" align="center" />
      </template>
      <template v-if="showIndexColumn">
        <el-table-column type="index" label="序号" align="center" width="70" />
      </template>
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center" show-overflow-tooltip>
          <template #default="scope">
            <slot :name="propItem.slotName" :row="scope.row">{{
              scope.row[propItem.prop]
            }}</slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer" v-if="showFooter">
      <slot name="footer">
        <el-pagination
          v-model:page-size="page.pageSize"
          v-model:current-page="page.currentPage"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 30]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="dataCount"
        />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    dataList: {
      type: Array as PropType<any[]>,
      required: true
    },
    dataCount: {
      type: Number,
      required: true
    },
    propList: {
      type: Array as PropType<any[]>,
      default: () => []
    },
    showIndexColumn: {
      type: Boolean,
      default: false
    },
    showSelectionColumn: {
      type: Boolean,
      default: false
    },
    showFooter: {
      type: Boolean,
      default: true
    },
    page: {
      type: Object,
      required: true
    },
    title: {
      type: String
    },
    childrenProps: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['selectionChange', 'update:page'],
  setup(props, { emit }) {
    const handleSelectionChange = (selection: any) => {
      emit('selectionChange', selection)
    }

    const handleSizeChange = (pageSize: number) => {
      emit('update:page', { ...props.page, pageSize })
    }
    const handleCurrentChange = (currentPage: number) => {
      emit('update:page', { ...props.page, currentPage })
    }
    return {
      handleSelectionChange,
      handleSizeChange,
      handleCurrentChange
    }
  }
})
</script>

<style scoped lang="less">
.header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  .title {
    margin: 0;
  }
}
.footer {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
}
</style>
