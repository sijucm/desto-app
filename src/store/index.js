import Vue from 'vue';
import Vuex from 'vuex';
import teampools from '@/store/modules/teampools';
import matches from "@/store/modules/matches";
import user from "@/store/modules/auth/user";
import teamMatches from "@/store/modules/teammatches";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    selectedSchedule: 4,
    availableSchedules: ['schedule1', 'schedule2', 'schedule3', 'schedule4',
      'schedule5', "schedule6"],
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

    getCurrentScheduleId: state => {
      return state.availableSchedules[state.selectedSchedule];
    },

    getAvailableSchedules: state => {
      return state.availableSchedules;
    }


  },
  mutations: {},
  actions: {
    async loadAllData({state, getters, dispatch}, scheduleIdIndex) {

      if (scheduleIdIndex === undefined) {
        scheduleIdIndex = state.selectedSchedule;
      }

      const scheduleId = getters.getAvailableSchedules[scheduleIdIndex];

      await dispatch('teampools/loadData', scheduleId, {root: true})
      await dispatch('matches/loadData', scheduleId, {root: true})
      await dispatch('user/loadAuthData', null, {root: true})

    },

    async changeCurrentSchedule({state,getters, dispatch}, newScheduleIndex) {
      if (getters.getAvailableSchedules[newScheduleIndex]) {
        await dispatch('loadAllData', newScheduleIndex, {root: true});
        state.selectedSchedule = newScheduleIndex;
      }
    }

  },
  modules: {
    teampools, matches, user, teamMatches
  },
});
