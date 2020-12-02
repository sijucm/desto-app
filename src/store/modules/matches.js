import axios from "axios";

export default {
  namespaced: true,
  state: {
    data: {},
  },

  mutations: {
    updateData(state, data) {
      state.data = data;
    }
  },

  getters: {

    getMatches: state => poolNumber => {
      return state.data['pool' + poolNumber];

    },
    getMatchesForTeam: state => teamName => {
      const poolNameList = Object.keys(state.data).filter(
          keyName => keyName.startsWith('pool'));


      return poolNameList.flatMap(poolName => state.data[poolName]).filter(
          match => match.teams.includes(teamName));
    },

  },

  actions: {

    loadData({commit , rootGetters}) {

        const currentWeek = rootGetters.getCurrentWeek;

      let url = '/api/matches/' + currentWeek;
      axios.get(url)
        .then((results) => commit('updateData', results.data))
        .catch(console.error);
    },

  },

};
