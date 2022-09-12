<template>
  <div class="nav-header-container">
    <el-icon :size="25" @click="changeFold">
      <template v-if="isfold">
        <i-ep-expand />
      </template>
      <template v-else>
        <i-ep-fold />
      </template>
    </el-icon>
    <div class="content">
      <div class="breadcrumb">
        <ZwBreadcrumb :items="breadcrumbItems" />
      </div>
      <div class="info">
        <UserInfo />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'
import UserInfo from './user-info.vue'
import ZwBreadcrumb from '@/base-ui/breadcrumb'
import { menuMapToBreadcrumb } from '@/utils/mapMenus'

export default defineComponent({
  components: {
    UserInfo,
    ZwBreadcrumb
  },
  emits: ['changeCollapse'],
  setup(props, { emit }) {
    const isfold = ref(false)
    const changeFold = () => {
      isfold.value = !isfold.value
      emit('changeCollapse', isfold.value)
    }

    const store = useStore()
    const route = useRoute()
    const breadcrumbItems = computed(() => {
      const userMenus = store.state.login.userMenus
      const path = route.path
      return menuMapToBreadcrumb(userMenus, path)
    })

    return {
      isfold,
      changeFold,
      breadcrumbItems
    }
  }
})
</script>

<style scoped lang="less">
.nav-header-container {
  height: 100%;
  display: flex;
  align-items: center;
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    margin: 0 10px;
  }
}
</style>
