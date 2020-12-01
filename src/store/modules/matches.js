import axios from "axios";

export default {
  namespaced: true,
  state: {
    data: {

    },
  },

  mutations: {
    updateData(state, data) {
      state.data = data;
    }
  },

  getters: {

    getMatches: state => poolNumber => {
      return state.data['pool'+poolNumber];

    }

  },

  actions: {

    loadData({commit}) {

      if(this.state.nothing) {
        return;
      }else {

        const currentWeek = this.state.currentWeek;

        axios.get('/api/matches/' + currentWeek)

        .then((results) => commit('updateData', results.data))
        .catch(console.error);
      }
    },


  },

};
