import { IRootState } from '@/store/type'
import { Module } from 'vuex'
import { ISystemState, IMutationPayload, IActionPayload } from './types'
import {
  getPageListData,
  deletePageListById,
  createPageData,
  editPageData
} from '@/service/request/main/system/system'

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0
    }
  },
  getters: {
    pageList(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`]
      }
    },
    pageCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`]
      }
    }
  },
  mutations: {
    changePageList(state, payload: IMutationPayload) {
      ;(state as any)[`${payload.pageName}List`] = payload.list
    },
    changePageCount(state, payload: IMutationPayload) {
      ;(state as any)[`${payload.pageName}Count`] = payload.totalCount
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: IActionPayload) {
      const pageName = payload.pageName
      const pageResult = await getPageListData(
        `${pageName}/list`,
        payload.queryInfo
      )
      const list = pageResult.data.list
      let totalCount = pageResult.data.totalCount
      if (!totalCount) {
        totalCount = list.length
      }
      commit('changePageList', { pageName, list })
      commit('changePageCount', { pageName, totalCount })
    },
    async deletePageListAction({ dispatch }, { pageName, id }) {
      const url = `${pageName}/${id}`

      const pageResult = await deletePageListById(url)
      if (pageResult.code === 0) {
        dispatch('getPageListAction', {
          pageName,
          queryInfo: {
            offset: 0,
            size: 10
          }
        })
      }
    },
    async createPageDataAction({ dispatch }, payload: any) {
      const { pageName, newData } = payload
      const url = pageName
      await createPageData(url, newData)
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },
    async editPageDataAction({ dispatch }, payload: any) {
      const { pageName, editData, id } = payload
      const url = pageName + '/' + id
      await editPageData(url, editData)
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    }
  }
}

export default systemModule
