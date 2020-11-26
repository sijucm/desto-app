import axios from "axios";
export default {
  namespaced: true,
  state: {
    week: 1,
    pools: {
      pool5: [
        {
          team: "J09-5",
          wins: 2,
          draws: 1,
          points: 5
        }
      ],
    },
    "id": "week1",
    "_rid": "YQNrAP0Cz9MBAAAAAAAAAA==",
    "_self": "dbs/YQNrAA==/colls/YQNrAP0Cz9M=/docs/YQNrAP0Cz9MBAAAAAAAAAA==/",
    "_etag": "\"cd010e9a-0000-0100-0000-5fbe6d180000\"",
    "_attachments": "attachments/",
    "_ts": 1606315288
  },
  mutations: {
    updateData(state, data) {
      state.customerData = data;
    },
  },

  actions: {
    getData({ commit }) {
      axios.get('/api/GetTeamPools')
      .then((results) => commit('updateData', results.data))
      .catch(console.error);
    },

  },
  getters: {
    isCreditCardTypeDataComplete: (state) => {
      if (state.cardType.cardType.productCode === ''
          || state.cardType.settlementType === '') {
        return false;
      }

      return !(state.cardType.settlementType === 'DD'
          && state.cardType.settlementAccountNumber === '');
    },
    isPersonalDataComplete(state) {
      return state.personalData.isDataCorrectCustomerInput
          && state.dataProcessing.agreeToICSDataProcessing;
    },
    isCCRequestComplete(state, getters) {
      return getters.isPersonalDataComplete
          && getters.isCreditCardTypeDataComplete
          && state.dataProcessing.agreeICSTermsAndConditions;
    },
    getSpendingLimit(state) {
      return state.cardType.cardType === 'YAG' ? 5000 : 2500;
    },

  },

};
