import axios from "axios";

export default {
  namespaced: true,
  state: {
    data: {},
  },

  mutations: {
    updateData(state, {scheduleId, results}) {

      const data = {};
      data[scheduleId] = results.data;
      state.data = {...state.data, ...data};
    }
  },

  getters: {

    getDataOfCurrentSchedule(state, getters, rootState, rootGetters) {
      return state.data[rootGetters.getCurrentScheduleId];
    },

    getMatches: (state, getters) => poolNumber => {
      if (getters.getDataOfCurrentSchedule) {
        return getters.getDataOfCurrentSchedule['pool' + poolNumber];
      }

    },
    getMatchesForTeam: (state, getters) => teamName => {

      const dataForCurrentSchedule = getters.getDataOfCurrentSchedule;
      if (!dataForCurrentSchedule) {
        return [];
      }

      const poolNameList = Object.keys(dataForCurrentSchedule).filter(
          keyName => keyName.startsWith('pool'));

      return poolNameList.flatMap(
          poolName => dataForCurrentSchedule[poolName]).filter(
          match => match.teams.includes(teamName));
    },

  },

  actions: {

    async loadData({commit, state}, scheduleObject) {

      const scheduleId = scheduleObject.id;

      //already loaded and is archived. Do not expect changes
      if (state.data[scheduleId] && scheduleObject.status === "archived") {
        return;
      }

      if (scheduleObject.status === "archived") {
        let url = 'https://destoarchived.blob.core.windows.net/matchdata/' + scheduleId + '.json';
        await axios.get(url)
        .then((results) => commit('updateData', {scheduleId, results}))
        .catch(console.error);

      } else {
        let url = '/api/' + scheduleId + '/matches/';
        await axios.get(url)
        .then((results) => commit('updateData', {scheduleId, results}))
        .catch(console.error);
      }
    },

  },

};
