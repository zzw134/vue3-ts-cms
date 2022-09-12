import { createStore, Store, useStore as vuexUseStore } from 'vuex'
import login from './login/login'
import system from './main/system/system'
import dashboard from './main/analysis/dashboard'
import { IRootState, IStoreType } from './type'
import { getPageListData } from '@/service/request/main/system/system'

export default createStore<IRootState>({
  state: () => {
    return {
      entireDepartment: [],
      entireRole: [],
      entireMenu: []
    }
  },
  getters: {},
  mutations: {
    changeEntireDepartment(state, payload) {
      state.entireDepartment = payload
    },
    changeEntireRole(state, payload) {
      state.entireRole = payload
    },
    changeMenuList(state, payload) {
      state.entireMenu = payload
    }
  },
  actions: {
    async getInitialDataList({ commit }) {
      const departmentResult = await getPageListData('department/list', {
        offset: 0,
        size: 1000
      })
      const { list: departmentList } = departmentResult.data
      commit('changeEntireDepartment', departmentList)
      const roleResult = await getPageListData('role/list', {
        offset: 0,
        size: 1000
      })
      const { list: roleList } = roleResult.data
      commit('changeEntireRole', roleList)
      const menuResult = await getPageListData('menu/list', {})
      const { list: menuList } = menuResult.data
      commit('changeMenuList', menuList)
    }
  },
  modules: {
    login,
    system,
    dashboard
  }
})

export function useStore(): Store<IStoreType> {
  return vuexUseStore()
}
