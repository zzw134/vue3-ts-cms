import { createStore } from 'vuex'
import login from './login/login'
import { IRootState } from './type'

export default createStore<IRootState>({
  state: () => {
    return {
      name: '124'
    }
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    login
  }
})
