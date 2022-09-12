<template>
  <div class="nav_menus">
    <div class="logo">
      <img class="img" src="~@/assets/img/logo.svg" alt="logo" />
      <Transition name="title">
        <span class="title" v-if="!collapse">Vue3+TS+CMS</span>
      </Transition>
    </div>
    <el-menu
      class="el-menu-vertical"
      background-color="#001529"
      text-color="white"
      :collapse="collapse"
      :default-active="defaultActive"
    >
      <template v-for="(menu, index) in userMenus" :key="menu.id">
        <!-- 一级菜单 -->
        <template v-if="menu.type === 1">
          <el-sub-menu :index="menu.id + ''">
            <!-- 一级菜单标题和图标 -->
            <template #title>
              <el-icon
                ><Component :is="getIconComponent(menuIcon[index])"
              /></el-icon>
              <span>{{ menu.name }}</span>
            </template>
            <!-- 二级菜单 -->
            <template v-for="subitem in menu.children" :key="subitem.id">
              <el-menu-item
                :index="subitem.id + ''"
                @click="handleClick(subitem)"
                >{{ subitem.name }}</el-menu-item
              >
            </template>
          </el-sub-menu>
        </template>
        <template v-else-if="menu.type === 2">
          <el-menu-item :index="menu.id + ''">
            {{ menu.name }}
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from '@/store'
import getIconComponent from '@/utils/getIconComponent'
import { pathMapToMenu } from '@/utils/mapMenus'

export default defineComponent({
  props: {
    collapse: {
      require: true,
      default: false
    }
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const userMenus = computed(() => store.state.login.userMenus)
    const menuIcon = computed(() =>
      userMenus.value.map((menu: any) => {
        const iconName: string = menu.icon.substring(8)
        let nameArr: string[] = iconName.split('-')

        nameArr = nameArr.map((item) => {
          return item.slice(0, 1).toUpperCase() + item.slice(1)
        })

        return nameArr.join('')
      })
    )

    const menuOfPath = pathMapToMenu(userMenus.value, route.path)
    const defaultActive = ref(menuOfPath.id + '')

    const handleClick = (item: any) => {
      router.push({
        path: item.url
      })
    }

    return {
      userMenus,
      menuIcon,
      getIconComponent,
      handleClick,
      defaultActive
    }
  }
})
</script>

<style scoped lang="less">
.nav_menus {
  height: 100%;
  background-color: #001529;
  .logo {
    height: 45px;
    display: flex;
    align-items: center;
    padding-left: 20px;
    .img {
      width: 25px;
    }
    .title {
      margin-left: 10px;
      color: white;
      font-weight: bold;
      font-size: 16px;
    }
  }
  .el-menu-vertical {
    height: calc(100% - 50px);
    border-right: unset;
    overflow-y: auto;
    .el-menu-item {
      background-color: #0c1f3a;
      &:hover {
        background-color: #082c4e;
      }
    }
  }
}
.title-enter-active,
.title-leave-active {
  transition: opacity 0s 0.3s ease;
}

.title-enter-from,
.title-leave-to {
  opacity: 0;
}
</style>
