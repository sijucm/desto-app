import axios from "axios";

export default {
  namespaced: true,
  state: {
    data: {

    },

  },
  mutations: {
    updateData(state, {results}) {
      state.data = {...results.data};
    },
  },

  actions: {
    async loadData({commit}) {

     await  axios.get('/api/matchSettings/')
      .then((results) => commit('updateData', {results}))
      .catch(console.error);
    },

  },
  getters: {
    getAvailableSchedulesSettings: state => {
      if(state.data.availableSchedules) {
        return state.data.availableSchedules;
      }else{return []}
    }
  }

};
