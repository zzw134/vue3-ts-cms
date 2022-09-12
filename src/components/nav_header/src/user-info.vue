<template>
  <div class="info-container">
    <div class="icons">
      <el-tooltip placement="bottom" content="消息" :hide-after="0">
        <el-icon class="icon" :size="20">
          <i-ep-chat-dot-round></i-ep-chat-dot-round>
        </el-icon>
      </el-tooltip>
      <el-tooltip placement="bottom" content="订阅" :hide-after="0">
        <el-icon class="icon" :size="20">
          <i-ep-collection-tag></i-ep-collection-tag>
        </el-icon>
      </el-tooltip>
      <el-tooltip placement="bottom" content="通知" :hide-after="0">
        <el-badge is-dot>
          <el-icon class="icon" :size="20">
            <i-ep-bell></i-ep-bell>
          </el-icon>
        </el-badge>
      </el-tooltip>
    </div>
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar
          class="avatar"
          :size="30"
          src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
        />
        <span class="name">{{ username }}</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleExitLogin">退出登录</el-dropdown-item>
          <el-dropdown-item divided>用户信息</el-dropdown-item>
          <el-dropdown-item>系统管理</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'
import localCache from '@/utils/localCache'

export default defineComponent({
  setup() {
    const store = useStore()
    const router = useRouter()
    const username = computed(() => store.state.login.userInfo.name)
    const handleExitLogin = () => {
      localCache.deleteCache('token')
      router.push('/login')
    }
    return {
      username,
      handleExitLogin
    }
  }
})
</script>

<style scoped lang="less">
.info-container {
  display: flex;
  align-items: center;
  .icons {
    display: flex;
    justify-content: space-between;
    width: 100px;
    margin-right: 20px;
  }
  .el-dropdown-link {
    display: flex;
    align-items: center;
    .name {
      margin-left: 8px;
      font-size: 16px;
    }
  }
}
</style>
