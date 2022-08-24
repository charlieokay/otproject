import { createStore } from 'vuex'


export default createStore({
  state: {
    // 存储token
    Authorization: localStorage.getItem('Authorization')
  },
  getters: {

  },
  mutations: {
    // 修改token，并将token存入localStorage
    changeLogin(state, user) {
      // console.log('打印user--------' + user)
      state.Authorization = user.Authorization;
      localStorage.setItem('Authorization', user);

    }
  },
  actions: {
  },
  modules: {
  }
})
