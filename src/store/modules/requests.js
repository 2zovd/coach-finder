export default {
  namespaced: true,
  state() {
    return {
      requests: [],
    };
  },
  mutations: {
    addRequest(state, payload) {
      state.requests.push(payload);
    },
    setRequests(state, payload) {
      state.requests = payload;
    },
  },
  actions: {
    async contactCoach(context, payload) {
      const newRequest = {
        userEmail: payload.email,
        message: payload.message,
      };

      const response = await fetch(
        `https://coach-finder-3a96e-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`,
        {
          method: 'POST',
          body: JSON.stringify(newRequest),
        }
      );

      const responseData = response.json();

      if (!response.ok) {
        const error = new Error(responseData.message || 'Network error');
        throw error;
      }

      newRequest.id = responseData.name;
      newRequest.coachId = payload.coachId;

      context.commit('addRequest', {
        ...newRequest,
      });
    },
    async loadRequests(context) {
      const coachId = context.rootGetters.userId;
      const token = context.rootGetters.token;
      const response = await fetch(
        `https://coach-finder-3a96e-default-rtdb.firebaseio.com/requests/${coachId}.json?auth=${token}`
      );
      const responseData = await response.json();
      if (!response.ok) {
        const error = new Error(
          responseData.message || 'Failed to fetch requests'
        );
        throw error;
      }
      const requests = [];
      for (const key in responseData) {
        let request = {
          id: key,
          coachId: coachId,
          userEmail: responseData[key].userEmail,
          message: responseData[key].message,
        };
        requests.push(request);
      }
      context.commit('setRequests', requests);
    },
  },
  getters: {
    requests(state, _getters, _rootState, rootGetters) {
      const userId = rootGetters.userId;
      return state.requests.filter((requests) => requests.coachId === userId);
    },
    hasRequests(_state, getters) {
      return getters.requests && getters.requests.length > 0;
    },
  },
};
