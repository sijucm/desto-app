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

    getRoles: state => {
      if (state.data.clientPrincipal && state.data.clientPrincipal.userRoles) {
        return state.data.clientPrincipal.userRoles;
      } else {
        return [];
      }
    },

    isTeamAdmin: (state, getters) => {
      if (getters.getRoles.includes('futAdmin') || getters.getRoles.includes(
          'teamAdmin') || getters.getRoles.includes('superAdmin')) {
        return true;
      }
    },

    // canChangeScore: (state, getters) => {
    //   // if(!this) {
    //   //   return true;
    //   // }
    //   if (getters.getRoles.includes('futadmin')) {
    //     return true;
    //   }
    // },

    isLoggedIn: (state, getters) => {
      if (getters.getRoles.includes('authenticated')) {
        return true;
      }
    }

  },

  actions: {
    loadAuthData({commit}) {

      //TODO : IMPORTANT, look at this hack for now. This WILL cause problems if not changed later
      if (process.env.NODE_ENV === 'development') {

        const sampleData = {
          "clientPrincipal":
              {
                "identityProvider":
                    "aad",
                "userId":
                    "917ff56622e94e66aa0785ac07d51c65",
                "userDetails":
                    "Localuser",
                "userRoles":
                    [
                      // "futAdmin",
                      //   "teamAdmin",
                      "anonymous",
                      "authenticated"
                    ]
              }
        };
        commit('updateData', sampleData)

      } else {
        axios.get('/.auth/me')
        .then((results) => commit('updateData', results.data))
        .catch(console.error);
      }
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


