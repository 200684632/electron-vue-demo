import api from '../api'

const state = {
  main: 0,
  user:false
}

const mutations = {
  DECREMENT_MAIN_COUNTER (state) {
    state.main--
  },
  INCREMENT_MAIN_COUNTER (state) {
    state.main++
  },
  user_loads(state) {
    state.user = !state.user
  }
}

const actions = {
  someAsyncTask ({ commit }) {
    // do something async
    commit('INCREMENT_MAIN_COUNTER')
  },

  user_load({commit, dispatch}) {
    commit('user_loads')
  }
}


export default {
  state,
  mutations,
  actions
}
