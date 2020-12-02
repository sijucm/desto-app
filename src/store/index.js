import Vue from 'vue';
import Vuex from 'vuex';
import teampools from '@/store/modules/teampools';
import matches from "@/store/modules/matches";
import user from "@/store/modules/auth/user";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentWeek: 'schedule4',
    poolNames: {
      1: {divisionName: 'Premier League', subPoolName: 'Poule 1'},
      2: {divisionName: 'Premier League', subPoolName: 'Poule 2'},
      3: {divisionName: 'Primera division', subPoolName: 'Poule 1'},
      4: {divisionName: 'Primera division', subPoolName: 'Poule 2'},
      5: {divisionName: 'Eredivisie', subPoolName: 'Poule 1'},
      6: {divisionName: 'Eredivisie', subPoolName: 'Poule 2'},
    },
    fields: {f1: '4A', f2: '4B', f3: '4C', f4: '4D'},
    timeSlots:
        {
          t1s1: '12:15', t1s2: '12:35', t1s3: '12:55',
          t2s1: '11:00', t2s2: '11:20', t2s3: '11:20',
          t3s1: '09:45', t3s2: '10:05', t3s3: '10:25'
        },
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
    alternative: {
      pool1: {
        timeSlot: 't1',
        fields: ['f1', 'f2'],
      },
      pool2: {
        timeSlot: 't1',
        fields: ['f3', 'f4'],
      },
      pool3: {
        timeSlot: 't2',
        fields: ['f3', 'f4'],
      },
      pool4: {
        timeSlot: 't2',
        fields: ['f3', 'f4'],
      },
      pool5: {
        timeSlot: 't3',
        fields: ['f3', 'f4'],
      },
      pool6: {
        timeSlot: 't3',
        fields: ['f3', 'f4'],
      },
    },
  },

  getters: {
    getPoolName: state => poolNumber => {
      return state.poolNames[poolNumber];
    },

    // getMatches: state => (poolNumber, teams) => {
    //   const matchList = [];
    //   for (let matchNumber = 1; matchNumber <= 3; matchNumber++) {
    //     const timeslotKey = state.alternative['pool' + poolNumber].timeSlot
    //         + 's'
    //         + matchNumber;
    //     const match1 = {
    //       id: poolNumber+'-'+matchNumber+'f1',
    //       field: state.fields.f1,
    //       time: state.timeSlots[timeslotKey],
    //       teams: [teams[state.matchesToPlay['s' + matchNumber].f1[0]].team,
    //         teams[state.matchesToPlay['s' + matchNumber].f1[1]].team]
    //     }
    //     const match2 = {
    //       id: poolNumber+'-'+matchNumber+'f2',
    //       field: state.fields.f2,
    //       time: state.timeSlots[timeslotKey],
    //       teams: [teams[state.matchesToPlay['s' + matchNumber].f2[0]].team,
    //         teams[state.matchesToPlay['s' + matchNumber].f2[1]].team]
    //     }
    //
    //     matchList.push(match1);
    //     matchList.push(match2);
    //
    //   }
    //
    //   return matchList;
    // },

  },
  mutations: {},
  actions: {},
  modules: {
    teampools,matches, user
  },
});
