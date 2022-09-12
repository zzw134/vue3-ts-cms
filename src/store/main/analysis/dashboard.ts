import { Module } from 'vuex'
import { IDashboardState } from './types'
import { IRootState } from '@/store/type'
import {
  getGoodsCategoryCount,
  getGoodsCategorySale,
  getGoodsCategoryFavor,
  getGoodsAddressSale
} from '@/service/request/main/analysis/dashboard'

const dashboardModule: Module<IDashboardState, IRootState> = {
  namespaced: true,
  state() {
    return {
      goodsCategoryCount: [],
      goodsCategorySale: [],
      goodsCategoryFavor: [],
      goodsAddressSale: []
    }
  },
  mutations: {
    changeCategoryCount(state, payload) {
      state.goodsCategoryCount = payload
    },
    changeCategorySale(state, payload) {
      state.goodsCategorySale = payload
    },
    changeCategoryFavor(state, payload) {
      state.goodsCategoryFavor = payload
    },
    changeAddressSale(state, payload) {
      state.goodsAddressSale = payload
    }
  },
  actions: {
    async getDashboardDataAction({ commit }) {
      const categoryCountResult = await getGoodsCategoryCount()
      commit('changeCategoryCount', categoryCountResult.data)
      const categorySaleResult = await getGoodsCategorySale()
      commit('changeCategorySale', categorySaleResult.data)
      const categoryFavorResult = await getGoodsCategoryFavor()
      commit('changeCategoryFavor', categoryFavorResult.data)
      const addressSaleResult = await getGoodsAddressSale()
      commit('changeAddressSale', addressSaleResult.data)
    }
  }
}

export default dashboardModule
