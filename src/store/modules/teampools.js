import axios from "axios";

export default {
  namespaced: true,
  state: {
    data: {}

  },
  mutations: {
    updateData(state, {scheduleId, results}) {
      console.log("teampools updated "+scheduleId);
      state.data[scheduleId] = results.data;
    },
  },

  actions: {
    loadData({commit, state}, scheduleId) {

      if(state.data[scheduleId] && state.data[scheduleId]['locked']){
        return;
      }

      // await new Promise(r => setTimeout(r, 2000));
      // const currentWeek = rootGetters.getCurrentWeek;
      axios.get('/api/teampool/' + scheduleId)
      .then((results) => commit('updateData', {scheduleId, results}))
      .catch(console.error);
    },

  },

  getters: {
    getDataOfCurrentSchedule(state, getters, rootState, rootGetters) {
      console.log(" current scheduleId in teampools "
          + rootGetters.getCurrentScheduleId);
      // console.log(" data is " + JSON.stringify(
      //     state.data[rootGetters.getCurrentScheduleId]));
      return state.data[rootGetters.getCurrentScheduleId];
    },

    getPoolData: (state, getters) => (poolNumber) => {
      // console.log("pool number is getter is : " + poolNumber)
      if (getters.getDataOfCurrentSchedule
          && getters.getDataOfCurrentSchedule.pools) {
        return getters.getDataOfCurrentSchedule.pools['pool' + poolNumber];
      } else {
        return {};
      }
    },
    getTeamData: (state) => (teamName) => {
      if (state.data.pools) {
        const matchedTeams = Object.keys(state.data.pools).filter(
            key => key.startsWith("pool")).flatMap(
            key => state.data.pools[key]).filter(
            team => team.team === teamName);

        if (matchedTeams.length > 0) {
          return matchedTeams[0];
        } else {
          return {};
        }
      }
    },
    isLocked: (state, getters ) => {
      if(!getters.getDataOfCurrentSchedule){
        return true;
      }
      return getters.getDataOfCurrentSchedule['locked'];
    }
  }

};
