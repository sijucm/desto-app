import axios from "axios";

export default {
  namespaced: true,
  state: {
    data: {
      "id": "week1",
      "_rid": "YQNrAJhd9CcDAAAAAAAAAA==",
      "_self": "dbs/YQNrAA==/colls/YQNrAJhd9Cc=/docs/YQNrAJhd9CcDAAAAAAAAAA==/",
      "_ts": 1606467742,
      "_etag": "\"60001554-0000-0100-0000-5fc0c09e0000\"",
      "week": "1",
      "pools": {
        "pool1": [
          {"team": "J10-2","standing": {"wins": 5, "draws": 1, "points": 5}},
          {"team": "J09-1","standing": {"wins": 5, "draws": 1, "points": 5}},
          {"team": "J09-2","standing": {"wins": 5, "draws": 1, "points": 5}},
          {"team": "J10-3","standing": {"wins": 5, "draws": 1, "points": 5}}
        ],
        "pool2": [
          {"team": "J10-5","standing": {"wins": 5, "draws": 1, "points": 5}},
          {"team": "J08-1","standing": {"wins": 5, "draws": 1, "points": 5}},
          {"team": "J09-3","standing": {"wins": 5, "draws": 1, "points": 5}},
          {"team": "J09-4","standing": {"wins": 5, "draws": 1, "points": 5}},
        ],
        "pool3": [
          {"team": "J10-4","standing": {"wins": 5, "draws": 1, "points": 5}},
          {"team": "J10-6","standing": {"wins": 5, "draws": 1, "points": 5}},
          {"team": "J10-7","standing": {"wins": 5, "draws": 1, "points": 5}},
          {"team": "J08-2","standing": {"wins": 5, "draws": 1, "points": 5}},
        ],
        "pool4": [
          {"team": "J09-6","standing": {"wins": 5, "draws": 1, "points": 5}},
          {"team": "J09-5","standing": {"wins": 5, "draws": 1, "points": 5}},
          {"team": "J08-3","standing": {"wins": 5, "draws": 1, "points": 5}},
          {"team": "J09-8","standing": {"wins": 5, "draws": 1, "points": 5}},
        ],
        "pool5": [
          {"team": "M09-2","standing": {"wins": 5, "draws": 1, "points": 5}},
          {"team": "J08-5","standing": {"wins": 5, "draws": 1, "points": 5}},
          {"team": "J09-7","standing": {"wins": 5, "draws": 1, "points": 5}},
          {"team": "M09-1","standing": {"wins": 5, "draws": 1, "points": 5}},
        ],

        "pool6": [
          {"team": "J08-4","standing": {"wins": 5, "draws": 1, "points": 5}},
          {"team": "J08-6","standing": {"wins": 5, "draws": 1, "points": 5}},
          {"team": "M09-3","standing": {"wins": 5, "draws": 1, "points": 5}},
          {"team": "Allstars","standing": {"wins": 5, "draws": 1, "points": 5}},
        ]
      }
    }

  },
  mutations: {
    updateData(state, data) {
      console.log('data received is ' + JSON.stringify(data));
      state.data = data;
    },
  },

  actions: {
    loadData({commit}) {

      return;

      const currentWeek = this.state.currentWeek;

      axios.get('/api/teampools/' + currentWeek + '/week' + currentWeek)

      .then((results) => commit('updateData', results.data))
      .catch(console.error);
    },

  },
  getters: {
    getPoolData: (state) => (poolNumber) => {
      console.log("pool number is getter is : " + poolNumber)
      if (state.data.pools) {
        return state.data.pools['pool' + poolNumber];
      } else {
        return {};
      }
    },
  }

};
