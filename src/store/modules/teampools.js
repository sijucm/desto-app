import axios from "axios";

export default {
  namespaced: true,
  state: {
    data: {


    }

  },
  mutations: {
    updateData(state, data) {
      // console.log('data received is ' + JSON.stringify(data));
      state.data = data;
    },
  },

  actions: {
    loadData({commit}) {

      if(this.state.nothing) {
        return;
      }else {

        const currentWeek = this.state.currentWeek;

        axios.get('/api/teampools/' + currentWeek + '/week' + currentWeek)

        .then((results) => commit('updateData', results.data))
        .catch(console.error);
      }
    },

  },
  getters: {
    getPoolData: (state) => (poolNumber) => {
      // console.log("pool number is getter is : " + poolNumber)
      if (state.data.pools) {
        return state.data.pools['pool' + poolNumber];
      } else {
        return {};
      }
    },
  }

};
