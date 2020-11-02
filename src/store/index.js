import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // 状态、数据
  state: {
    counter: 0
  },
  // 更改状态的函数
  mutations: {
    add(state) {
      state.counter++;
    }
  },
  // 异步操作
  actions: {
    add({ commit }) {
      setTimeout(() => { 
        commit("add");
      }, 1000);
    }
  },
  modules: {
  }
})
