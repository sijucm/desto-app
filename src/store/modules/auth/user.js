import axios from "axios";

export default {
  namespaced: true,
  state: {
    data: {
      clientPrincipal: null
    }
  },

  mutations: {
    updateData(state, data) {
      state.data = data;
    }
  },

  getters: {

    getRoles: state =>  {
      if (state.data.clientPrincipal && state.data.clientPrincipal.userRoles) {
        return state.data.clientPrincipal.userRoles;
      }else{
        return [];
      }
    },

    canChangeScore: (state, getters) => {
      // if(!this) {
      //   return true;
      // }
      if(getters.getRoles.includes('futadmin', 'destoadmin', 'teamadmin', 'siteadmin')){
        return true;
      }
    },

    isLoggedIn: (state, getters) => {
      if(getters.getRoles.includes('authenticated') ){
        return true;
      }
    }

  },

  actions: {
    loadAuthData({commit}) {
      axios.get('/.auth/me')
      .then((results) => commit('updateData', results.data))
      .catch(console.error);
    },

  },

};

// "clientPrincipal": {
//   "identityProvider": "aad",
//       "userId": "917ff56622e94e66aa0785ac07d51c65",
//       "userDetails": "destoadmin@sijumathewgmail.onmicrosoft.com",
//       "userRoles": [
//     "destoadmin",
//     "anonymous",
//     "authenticated"
//   ]
// }


