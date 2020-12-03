import axios from "axios";

export default {
  namespaced: true,
  state: {
    data: {


    }

  },
  mutations: {
    updateData(state, data) {
      // console.log('data received is ' + JSON.stringify(data));
      state.data = data;
    },
  },

  actions: {
    loadData({commit, rootGetters}) {

      if(this.state.nothing) {
        return;
      }else {

        const currentWeek = rootGetters.getCurrentWeek;

        axios.get('/api/teampool/' + currentWeek )

        .then((results) => commit('updateData', results.data))
        .catch(console.error);
      }
    },

  },

  getters: {
    getPoolData: (state) => (poolNumber) => {
      // console.log("pool number is getter is : " + poolNumber)
      if (state.data.pools) {
        return state.data.pools['pool' + poolNumber];
      } else {
        return {};
      }
    },
    getTeamData : (state) => (teamName) => {
      if(state.data.pools){
        const matchedTeams = Object.keys(state.data.pools).filter(
            key => key.startsWith("pool")).flatMap(
            key => state.data.pools[key]).filter(team => team.team===teamName);

        if(matchedTeams.length >0){
          return matchedTeams[0];
        }else{
          return {};
        }
      }
    },
    isLocked: state =>  {
      return state.data['locked'] ;
    }
  }

};
