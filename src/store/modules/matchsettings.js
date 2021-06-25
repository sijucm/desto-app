

export default {
  namespaced: true,
  state: {
    data: {
      selectedScheduleIndex:23,
      availableSchedules:[
        {
          id:'schedule1',
          status: 'archived',
          name:'Speelronde 1'
        },
        {
          id:'schedule2',
          status: 'archived',
          name:'Speelronde 2'
        },
        {
          id:'schedule3',
          status: 'archived',
          name:'Speelronde 3'
        },
        {
          id:'schedule4',
          status: 'archived',
          name:'Speelronde 4'
        },
        {
          id:'schedule5',
          status: 'archived',
          name:'Speelronde 5'
        },
        {
          id:'schedule6',
          status: 'archived',
          name:'Speelronde 6'
        },
        {
          id:'schedule7',
          status: 'archived',
          name:'Speelronde 7'
        },
        {
          id:'schedule8',
          status: 'archived',
          name:'Speelronde 8'
        },
        {
          id:'schedule9',
          status: 'archived',
          name:'Speelronde 9'
        },
        {
          id:'schedule10',
          status: 'archived',
          name:'Speelronde 10'
        },
        {
          id:'schedule11',
          status: 'archived',
          name:'Speelronde 11'
        },
        {
          id:'schedule12',
          status: 'archived',
          name:'Speelronde 12'
        },
        {
          id:'schedule13',
          status: 'archived',
          name:'Speelronde 13'
        },
        {
          id:'schedule14',
          status: 'archived',
          name:'Speelronde 14'
        },
        {
          id:'schedule15',
          status: 'archived',
          name:'Speelronde 16'
        },
        {
          id:'schedule16',
          status: 'archived',
          name:'Speelronde 16'
        },
        {
          id:'schedule17',
          status: 'archived',
          name:'Speelronde 17'
        },
        {
          id:'schedule18',
          status: 'archived',
          name:'Speelronde 18'
        },
        {
          id:'schedule19',
          status: 'archived',
          name:'Speelronde 19'
        },
        {
          id:'schedule20',
          status: 'archived',
          name:'Speelronde 20'
        },
        {
          id:'schedule21',
          status: 'archived',
          name:'Speelronde 22'
        },
        {
          id:'schedule22',
          status: 'archived',
          name:'Speelronde 22'
        },
        {
          id:'schedule23',
          status: 'archived',
          name:'Speelronde 23'
        },
        {
          id:'schedule24',
          status: 'archived',
          name:'Speelronde 24'
        }
      ]

    },

  },
  mutations: {
    updateData(state, {results}) {
      state.data = {...results.data};
    },
  },

  actions: {
    async loadData() {

     // await  axios.get('/api/matchSettings/')
     //  .then((results) => commit('updateData', {results}))
     //  .catch(console.error);

    },

  },
  getters: {
    getAvailableSchedulesSettings: state => {
      if(state.data.availableSchedules) {
        return state.data.availableSchedules;
      }else{return []}
    },
    getDefaultSelectedScheduleIndex: state => {
      if(state.data.selectedScheduleIndex){
        return state.data.selectedScheduleIndex;
      }else{
        return 0;
      }
    }

  }



};
