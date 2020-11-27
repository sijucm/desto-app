import Vue from 'vue';
import Vuex from 'vuex';
import teampools from '@/store/modules/teampools';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentWeek:'1',
    poolNames:{
      1:'Premier League: Poule 1',
      2:'Permier League: Poule 2',
      3:'Primera division: Poule 1',
      4:'Primera division: Poule 2',
      5:'Eredivisie: Poule 1',
      6:'Eredivisie: Poule 2',

    }
  },
  getters:{
    getPoolName: state => poolNumber => {
      return state.poolNames[poolNumber];
    },
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    teampools,
  },
});
