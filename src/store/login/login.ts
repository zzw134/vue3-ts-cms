import type { Module } from 'vuex'
import type { ILoginState } from './type'
import type { IRootState } from '../type'
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenuByRoleId
} from '@/service/request/login/login'
import type { IAccountType } from '@/service/request/login/type'
import localCache from '@/utils/localCache'
import router from '@/router'
import { mapMenus, menuMapToPermissions } from '@/utils/mapMenus'

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: localCache.getCache('token') || '',
      userInfo: localCache.getCache('userInfo') || {},
      userMenus: localCache.getCache('userMenus') || {},
      permissions: localCache.getCache('userMenus')
        ? menuMapToPermissions(localCache.getCache('userMenus'))
        : []
    }
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeRoleMenu(state, userMenus: any) {
      state.userMenus = userMenus
      const routes = mapMenus(userMenus)
      routes.forEach((route) => {
        router.addRoute('main', route)
      })
      const permissions = menuMapToPermissions(userMenus)
      state.permissions = permissions
    }
  },
  actions: {
    async accountLoginAction({ commit, dispatch }, payload: IAccountType) {
      // 登录获取token
      const loginResult = await accountLoginRequest(payload)
      const { id, token } = loginResult.data
      localCache.setCache('token', token)
      commit('changeToken', token)

      // 获取用户信息
      const userInfoResult = await requestUserInfoById(id)
      const userInfo = userInfoResult.data
      localCache.setCache('userInfo', userInfo)
      commit('changeUserInfo', userInfo)

      // 获取角色菜单
      const userMenuResult = await requestUserMenuByRoleId(userInfo.role.id)
      localCache.setCache('userMenus', userMenuResult.data)
      commit('changeRoleMenu', userMenuResult.data)

      dispatch('getInitialDataList', null, { root: true })

      router.push('/main')
    }
  }
}

export default loginModule
