<template>
  <div class="dashboard">
    <el-row :gutter="20" class="top-row">
      <el-col :span="7">
        <ZwCard :title="'分类商品数量(饼图)'">
          <PieEchart :pieData="pieData" />
        </ZwCard>
      </el-col>
      <el-col :span="10">
        <ZwCard title="不同城市商品销量">
          <MapEchart :mapData="mapData" />
        </ZwCard>
      </el-col>
      <el-col :span="7">
        <ZwCard title="分类商品数量(玫瑰图)">
          <RoseEchart :roseData="pieData" />
        </ZwCard>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <ZwCard title="分类商品的销量">
          <LineEchart v-bind="lineData" />
        </ZwCard>
      </el-col>
      <el-col :span="12">
        <ZwCard title="分类商品的收藏">
          <BarEchart v-bind="barData" />
        </ZwCard>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
import ZwCard from '@/base-ui/card'
import {
  PieEchart,
  RoseEchart,
  LineEchart,
  BarEchart,
  MapEchart
} from '@/components/page-echarts'

export default defineComponent({
  name: 'dashboard',
  components: {
    ZwCard,
    PieEchart,
    RoseEchart,
    LineEchart,
    BarEchart,
    MapEchart
  },
  setup() {
    const store = useStore()
    store.dispatch('dashboard/getDashboardDataAction')

    const pieData = computed(() => {
      return store.state.dashboard.goodsCategoryCount.map(
        (item: { id: number; name: string; goodsCount: number }) => {
          return {
            name: item.name,
            value: item.goodsCount ? item.goodsCount : 0
          }
        }
      )
    })

    const lineData = computed(() => {
      const xLabels: string[] = []
      const values: any[] = []
      const data = store.state.dashboard.goodsCategorySale
      data.forEach((item: { id: number; name: string; goodsCount: number }) => {
        xLabels.push(item.name)
        values.push(item.goodsCount ? item.goodsCount : 0)
      })
      return { xLabels, values }
    })

    const barData = computed(() => {
      const xLabels: string[] = []
      const values: any[] = []
      const data = store.state.dashboard.goodsCategoryFavor
      data.forEach((item: { id: number; name: string; goodsFavor: number }) => {
        xLabels.push(item.name)
        values.push(item.goodsFavor ? item.goodsFavor : 0)
      })
      return { xLabels, values }
    })

    const mapData = computed(() => {
      return store.state.dashboard.goodsAddressSale.map((item) => {
        return {
          name: item.address,
          value: item.count
        }
      })
    })

    return {
      pieData,
      lineData,
      barData,
      mapData
    }
  }
})
</script>

<style scoped lang="less">
.dashboard {
  background-color: #f1f2f7;
  .top-row {
    margin-bottom: 20px;
  }
}
</style>
