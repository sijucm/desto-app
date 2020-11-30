import axios from "axios";

export default {
  namespaced: true,
  state: {
    data: {
      clientPrincipal: {
        userRoles: [
        ]
      }
    }
  },

  mutations: {
    updateData(state, data) {
      state.data = data;
    }
  },

  getters: {

    getRoles: state => {
      return state.data.clientPrincipal.userRoles;
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

