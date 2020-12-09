import axios from "axios";

export default {
  namespaced: true,
  state: {
    data: {},
  },

  mutations: {
    updateData(state, {scheduleId, results}) {
      console.log(" matches updating scheduleid " + scheduleId);

      const data = {};
      data[scheduleId] = results.data;
      state.data = {...state.data, ...data};
    }
  },

  getters: {

    getDataOfCurrentSchedule(state, getters, rootState, rootGetters) {
      console.log(" current scheduleId in matches "
          + rootGetters.getCurrentScheduleId);
      return state.data[rootGetters.getCurrentScheduleId];
    },

    getMatches: (state, getters) => poolNumber => {
      if(getters.getDataOfCurrentSchedule) {
        return getters.getDataOfCurrentSchedule['pool' + poolNumber];
      }

    },
    getMatchesForTeam: (state, getters) => teamName => {

      const dataForCurrentSchedule = getters.getDataOfCurrentSchedule;

      const poolNameList = Object.keys(dataForCurrentSchedule).filter(
          keyName => keyName.startsWith('pool'));


      return poolNameList.flatMap(poolName => dataForCurrentSchedule[poolName]).filter(
          match => match.teams.includes(teamName));
    },

  },

  actions: {

    loadData({commit, state }, scheduleId) {


      console.log("loading matches of scheduleId "+ scheduleId);
      if(state.data[scheduleId] && state.data[scheduleId]['locked']){
        return;
      }

        // const currentWeek = rootGetters.getCurrentWeek;

      let url = '/api/'+scheduleId+'/matches/';
      axios.get(url)
        .then((results) => commit('updateData', {scheduleId, results}))
        .catch(console.error);
    },

  },

};
