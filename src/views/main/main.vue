<template>
  <div class="main-container">
    <el-container class="main-content">
      <el-aside :width="collapse ? '65px' : '220px'" class="main-aside">
        <NavMenus :collapse="collapse"></NavMenus>
      </el-aside>
      <el-container class="page-content">
        <el-header class="page-header">
          <NavHeader @changeCollapse="handleCollapse"></NavHeader>
        </el-header>
        <el-main class="page-main">
          <div class="page-info">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { NavMenus } from '@/components/nav_menus'
import { NavHeader } from '@/components/nav_header'

export default defineComponent({
  name: '',
  components: {
    NavMenus,
    NavHeader
  },
  setup() {
    const collapse = ref(false)
    const handleCollapse = (fold: boolean) => {
      collapse.value = fold
    }

    return {
      collapse,
      handleCollapse
    }
  }
})
</script>

<style scoped lang="less">
.main-container {
  height: 100%;

  .main-content {
    height: 100%;

    .main-aside {
      overflow-x: hidden;
      transition: width 0.3s ease;
    }

    .page-content {
      .page-header {
        height: 45px;
      }

      .page-main {
        background-color: #f1f2f7;
        .page-info {
          background-color: #fff;
        }
      }
    }
  }
}
</style>
