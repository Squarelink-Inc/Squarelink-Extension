import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import config from '@/config'
import * as getters from './getters'
import mutations from './mutations'
import * as actions from './actions'

Vue.use(Vuex)

const store = new Vuex.Store({
  plugins: [
    createPersistedState(),
  ],
  state: {
    network: {
      name: 'mainnet',
    }
  },
  getters,
  mutations,
  actions,
})

export default store
