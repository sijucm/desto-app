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
    },
  },

  actions: {
    async loadData({commit, state}, scheduleId) {

      console.log("loading " + scheduleId);
      if (state.data[scheduleId] && state.data[scheduleId]['locked']) {
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

      if (getters.getDataOfCurrentSchedule
          && getters.getDataOfCurrentSchedule.pools) {
        return getters.getDataOfCurrentSchedule.pools['pool' + poolNumber];
      } else {
        console.log("returning empty ");
        return {};
      }
    },
    getTeamData: (state, getters) => (teamName) => {
      if (getters.getDataOfCurrentSchedule
          && getters.getDataOfCurrentSchedule.pools) {
        const matchedTeams = Object.keys(
            getters.getDataOfCurrentSchedule.pools).filter(
            key => key.startsWith("pool")).flatMap(
            key => getters.getDataOfCurrentSchedule.pools[key]).filter(
            team => team.team === teamName);

        if (matchedTeams.length > 0) {
          return matchedTeams[0];
        } else {
          return {};
        }
      }
    },
    isLocked: (state, getters) => {
      if (process.env.NODE_ENV === 'development') {
        return false;
      }

      if (!getters.getDataOfCurrentSchedule) {
        return true;
      }
      return getters.getDataOfCurrentSchedule['locked'];
    }
  }

};
