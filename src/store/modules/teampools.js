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
    async loadData({commit, state}, scheduleObject) {

      const scheduleId = scheduleObject.id;

      //already loaded and is archived. Do not expect changes
      if (state.data[scheduleId] && scheduleObject.status === "archived") {
        return;
      }
      if (scheduleObject.status === "archived") {
        await axios.get('https://destoarchived.blob.core.windows.net/teampools/'
            + scheduleId + '.json')
        .then((results) => commit('updateData', {scheduleId, results}))
        .catch(console.error);

      } else {
        await axios.get('/api/teampool/' + scheduleId)
        .then((results) => commit('updateData', {scheduleId, results}))
        .catch(console.error);
      }
    },

  },

  getters: {
    getDataOfCurrentSchedule(state, getters, rootState, rootGetters) {
      return state.data[rootGetters.getCurrentScheduleId];
    },

    getPoolData: (state, getters) => (poolNumber) => {

      if (getters.getDataOfCurrentSchedule
          && getters.getDataOfCurrentSchedule.pools) {
        return getters.getDataOfCurrentSchedule.pools['pool' + poolNumber];
      } else {
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
    canChangeScore: (state, getters, rootState, rootGetters) => {
      if (process.env.NODE_ENV === 'development') {
        return true;
      }

      // there is no data
      if (!getters.getDataOfCurrentSchedule) {
        return false;
      }

      const isLocked = getters.getDataOfCurrentSchedule['locked'];

      // this is global lock, admin also cannot change and the lock level is ignored
      if (isLocked) {
        return false;
      }

      const lockLevel = getters.getDataOfCurrentSchedule['lockLevel'];

      // anonymous access, anybody can change
      if (lockLevel && lockLevel === "anonymous") {
        return true;
      } else if (lockLevel === "teamadmin") {
        const isTeamAdmin = rootGetters['user/isTeamAdmin'];
        return isTeamAdmin ? true : false;
        // add other levels under this
      } else {
        return false;
      }
    }
  }

};
