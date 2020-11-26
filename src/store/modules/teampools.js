import axios from "axios";

export default {
  namespaced: true,
  state: {
    data: {}

  },
  mutations: {
    updateData(state, data) {
      console.log('data received is ' + JSON.stringify(data));
      state.data = data;
    },
  },

  actions: {
    loadData({commit}) {
      axios.get('/api/GetTeamPools')
      .then((results) => commit('updateData', results.data))
      .catch(console.error);
    },

  },
  getters: {},

};
