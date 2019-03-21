import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'
import app from './module/app'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //当前权限组id
    currentPowerId:'',
    currentPowerName:'',
  },
  mutations: {
    //
    setPowerId(state,data){
      state.currentPowerId = data
    },
    setPowerName(state,data){
      state.currentPowerName = data
    }
  },
  actions: {
    //
  },
  modules: {
    user,
    app
  }
})
