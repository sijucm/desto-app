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
    availableSchedules: ['schedule1', 'schedule2', 'schedule3', 'schedule4', 'schedule5', "schedule6"],
    poolNames: {
      1: {divisionName: 'Premier League', subPoolName: 'Poule 1'},
      2: {divisionName: 'Premier League', subPoolName: 'Poule 2'},
      3: {divisionName: 'Primera division', subPoolName: 'Poule 1'},
      4: {divisionName: 'Primera division', subPoolName: 'Poule 2'},
      5: {divisionName: 'Eredivisie', subPoolName: 'Poule 1'},
      6: {divisionName: 'Eredivisie', subPoolName: 'Poule 2'},
    },
    fields: {f1: '4A', f2: '4B', f3: '4C', f4: '4D'},

    matchesToPlay: {
      s1: {
        f1: [0, 1],
        f2: [2, 3]
      },
      s2: {
        f1: [0, 2],
        f2: [1, 3]
      },
      s3: {
        f1: [0, 3],
        f2: [1, 2]
      },
    },

  },

  getters: {
    getPoolName: state => poolNumber => {
      return state.poolNames[poolNumber];
    },

    getCurrentScheduleId: state => {
      return state.availableSchedules[state.selectedSchedule];
    },

  },
  mutations: {},
  actions: {
     async loadAllData({state, dispatch}, scheduleIdIndex) {

      if(scheduleIdIndex===undefined){
        scheduleIdIndex = state.selectedSchedule;
      }

      const scheduleId = state.availableSchedules[scheduleIdIndex] ;

      await dispatch('teampools/loadData', scheduleId, {root: true})
      await dispatch('matches/loadData', scheduleId, {root: true})
      await dispatch('user/loadAuthData', null, {root: true})

    },

    async changeCurrentSchedule({state, dispatch}, newScheduleIndex) {
      if (state.availableSchedules[newScheduleIndex]) {
        await dispatch('loadAllData', newScheduleIndex, {root: true});
        state.selectedSchedule = newScheduleIndex;
      }
    }

  },
  modules: {
    teampools, matches, user, teamMatches
  },
});
