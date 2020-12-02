import Vue from 'vue';
import Vuex  from 'vuex';
import teampools from '@/store/modules/teampools';
import matches from "@/store/modules/matches";
import user from "@/store/modules/auth/user";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    selectedSchedule:1,
    availableSchedules:['schedule3', 'schedule4'],
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

    getCurrentWeek: state => {
      return state.availableSchedules[state.selectedSchedule];
    },



  },
  mutations: {},
  actions: {
    loadAllData({state, dispatch}){
      dispatch('teampools/loadData', null, { root: true } )
      dispatch('matches/loadData', null, { root: true } )
      dispatch('user/loadAuthData', null, { root: true } )
      // state.selectedSchedule = 1;
      state.currentWeek = state.availableSchedules[state.selectedSchedule];
    },

  },
  modules: {
    teampools,matches, user
  },
});
