import axios from "axios";
export default {
  namespaced: true,
  state: {
    teampools: {
      week: 1,
      pools: {
        pool5: [
          {
            team: "J09-5",
            wins: 2,
            draws: 1,
            points: 5
          }
        ],


      },
      "id": "week1",
      "_rid": "YQNrAP0Cz9MBAAAAAAAAAA==",
      "_self": "dbs/YQNrAA==/colls/YQNrAP0Cz9M=/docs/YQNrAP0Cz9MBAAAAAAAAAA==/",
      "_etag": "\"cd010e9a-0000-0100-0000-5fbe6d180000\"",
      "_attachments": "attachments/",
      "_ts": 1606315288
    }
  },
  mutations: {
    updateData(state, data) {
      console.log('data received is ' + data);
      state.teampools = data;
    },
  },

  actions: {
    loadData({ commit }) {
      axios.get('/api/GetTeamPools')
      .then((results) => commit('updateData', results.data))
      .catch(console.error);
    },

  },
  getters: {
  },

};
