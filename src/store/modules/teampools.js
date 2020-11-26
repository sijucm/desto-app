export default {
    namespaced: true,
    state: {
      dataProcessing: {
        agreeToICSDataProcessing: true,
        agreeICSTermsAndConditions: false,
      },
      personalData: {
        isDataCorrectCustomerInput: false,
      },
      family: {
        status: 'SIN',
        minorChildren: 0,
        netIncomePartner: 0,
        monthlyAlimony: false,
      },
      income: {
        company: {
          nameOfBusiness: '',
          kvkNumber: '',
          dateOfEstablishment: '',
        },
        netIncome: 100,
        status: 'EMPFIX',
      },
      cardType: {
        settlementType: 'SELF',
        cardType: {
          productCode: 'YAG',
          limit: 0,
        },
        settlementAccountNumber: '',
      },
    },
    mutations: {
      updatePersonalDataCustomerAgreement(state, isDataComplete) {
        state.personalData.isDataCorrectCustomerInput = isDataComplete;
      },
      addCardSettlementType(state, settlementType) {
        state.cardType.settlementType = settlementType;
      },
      addCardType(state, cardType) {
        state.cardType.cardType = cardType;
      },
      addSettlementAccountNumber(state, accountNumber) {
        state.cardType.settlementAccountNumber = accountNumber;
      },
      updateFamilyStatus(state, status) {
        state.family.status = status;
      },
      updateMinorChildren(state, minorChildren) {
        state.family.minorChildren = minorChildren;
      },
      updateNetIncomePartner(state, netIncomePartner) {
        state.family.netIncomePartner = netIncomePartner;
      },
      updateMonthlyAlimony(state, payAlimony) {
        state.family.monthlyAlimony = payAlimony;
      },
      updateNameOfBusiness(state, nameOfBusiness) {
        state.income.company.nameOfBusiness = nameOfBusiness;
      },
      updateKVKNumber(state, kvkNumber) {
        state.income.company.kvkNumber = kvkNumber;
      },
      updateDateOfEstablishment(state, dateOfEstablishment) {
        state.income.company.dateOfEstablishment = dateOfEstablishment;
      },
      updateNetIncome(state, netIncome) {
        state.income.netIncome = netIncome;
      },
      updateIncomeStatus(state, status) {
        state.income.status = status;
      },
    },
  
    actions: {
  
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
  