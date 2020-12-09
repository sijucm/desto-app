import axios from "axios";

export default {
  namespaced: true,
  state: {
    data: {},
  },
  mutations: {
    updateData(state, {teamName, results}) {
      const data = {};
      data[teamName] = results.data;

      data[teamName].flatMap( schedule => schedule.matches).forEach(
          match => match.teams.sort((a,) => a === teamName ? -1 : 1));

      state.data = {...state.data, ...data};

    },
  },

  actions: {
    loadData({commit, state}, teamName) {
      if (state.data[teamName]) {
        return;
      }

      axios.get('/api/matches/' + teamName)
      .then((results) => commit('updateData', {teamName, results}))
      .catch(console.error);
    },

  },

  getters: {
    getPastTeamMatches: (state) => (teamName) => {
      if (!state.data[teamName]) {
        return [];
      }

      const matchList = state.data[teamName].flatMap(
          schedule => schedule.matches)
      return matchList.sort((a, b) => a.teams[1].localeCompare(b.teams[1]));

    },
  }

};
