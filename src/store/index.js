import Vue from 'vue';
import Vuex from 'vuex';
import teampools from '@/store/modules/teampools';
import matches from "@/store/modules/matches";
import user from "@/store/modules/auth/user";
import teamMatches from "@/store/modules/teammatches";
import matchSettings from "@/store/modules/matchsettings";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    selectedSchedule: undefined,

    poolNames: {
      1: {divisionName: 'Premier League', subPoolName: 'Poule 1'},
      2: {divisionName: 'Premier League', subPoolName: 'Poule 2'},
      3: {divisionName: 'Primera division', subPoolName: 'Poule 1'},
      4: {divisionName: 'Primera division', subPoolName: 'Poule 2'},
      5: {divisionName: 'Eredivisie', subPoolName: 'Poule 1'},
      6: {divisionName: 'Eredivisie', subPoolName: 'Poule 2'},
    },

  },


  getters: {
    getPoolName: state => poolNumber => {
      return state.poolNames[poolNumber];
    },

    getCurrentScheduleObject: (state, getters) => {
      if (getters["matchSettings/getAvailableSchedulesSettings"]
          && getters["matchSettings/getAvailableSchedulesSettings"][state.selectedSchedule]) {
        return getters["matchSettings/getAvailableSchedulesSettings"][state.selectedSchedule];
      } else {
        return {};
      }

    },

    getCurrentScheduleId: (state, getters) => {


      if (getters.getCurrentScheduleObject.id) {
       return getters.getCurrentScheduleObject.id;
      } else {
        return "schedule6";
      }

    },

    getAvailableSchedules: (state, rootGetters) => {
      return rootGetters["matchSettings/getAvailableSchedulesSettings"];
    }

  },
  mutations: {
    updateSelectedSchedule(state, newScheduleIndex){
      state.selectedSchedule = newScheduleIndex
    }

  },
  actions: {
    async loadAllData({state, getters, dispatch}, scheduleIdIndex) {

      //TO DO this also has a relation to the TO DO later and the order. This need change
      await dispatch("matchSettings/loadData", {root: true});

      if (!getters.getAvailableSchedules) {
        return;
      }

      // TO DO this should be moved to the load of match settings
      if (state.selectedSchedule === undefined) {
        state.selectedSchedule = getters.getAvailableSchedules.length - 1;
      }

      //TO DO this has a strong relation to the above. Move them together
      if (scheduleIdIndex === undefined) {
        scheduleIdIndex = state.selectedSchedule;
      }

      const scheduleObject = getters.getAvailableSchedules[scheduleIdIndex];

      await dispatch('teampools/loadData', scheduleObject, {root: true})
      await dispatch('matches/loadData', scheduleObject, {root: true})
      await dispatch('user/loadAuthData', null, {root: true})

    },

    async changeCurrentSchedule({ getters, dispatch, commit}, newScheduleIndex) {
      if (getters.getAvailableSchedules[newScheduleIndex]) {
        await dispatch('loadAllData', newScheduleIndex, {root: true});
        commit("updateSelectedSchedule", newScheduleIndex);
        // state.selectedSchedule = newScheduleIndex;
      }
    }

  },
  modules: {
    teampools, matches, user, teamMatches, matchSettings
  },
});
