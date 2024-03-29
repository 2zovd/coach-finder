export default {
  namespaced: true,
  state() {
    return {
      lastFetch: null,
      coaches: [],
    };
  },
  mutations: {
    coachRegistration(state, data) {
      state.coaches.push(data);
    },
    setCoaches(state, payload) {
      state.coaches = payload;
    },
    setFetchTimestamp(state) {
      state.lastFetch = new Date().getTime();
    },
  },
  actions: {
    async coachRegistration(context, data) {
      const coachId = context.rootGetters.userId;

      const coachData = {
        firstName: data.firstName,
        lastName: data.lastName,
        areas: data.areas,
        description: data.description,
        hourlyRate: data.rate,
      };

      const token = context.rootGetters.token;

      const response = await fetch(
        `https://coach-finder-3a96e-default-rtdb.firebaseio.com/coaches/${coachId}.json?auth=${token}`,
        {
          method: 'PUT',
          body: JSON.stringify(coachData),
        }
      );

      // const responseData = await response.json()

      if (!response.ok) {
        // error ...
      }

      context.commit('coachRegistration', {
        ...coachData,
        id: coachId,
      });
    },
    async loadCoaches(context, payload) {
      if (!payload.forceRefresh && !context.getters.shouldUpdate) {
        return;
      }

      const response = await fetch(
        `https://coach-finder-3a96e-default-rtdb.firebaseio.com/coaches.json`
      );

      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(responseData.message || 'Failed to fetch.');
        throw error;
      }

      const coaches = [];

      for (const key in responseData) {
        let coach = {
          id: key,
          firstName: responseData[key].firstName,
          lastName: responseData[key].lastName,
          areas: responseData[key].areas,
          description: responseData[key].description,
          hourlyRate: responseData[key].hourlyRate,
        };
        coaches.push(coach);
      }

      context.commit('setFetchTimestamp');
      context.commit('setCoaches', coaches);
    },
  },
  getters: {
    coaches(state) {
      return state.coaches;
    },
    hasCoaches(state) {
      return state.coaches && state.coaches.length > 0;
    },
    isCoach(_state, getters, _rootState, rootGetters) {
      const coaches = getters.coaches;
      const userId = rootGetters.userId;
      return coaches.some((coach) => coach.id === userId);
    },
    shouldUpdate(state) {
      const lastFetch = state.lastFetch;
      if (!lastFetch) {
        return true;
      }
      const currentTimestamp = new Date().getTime();
      return (currentTimestamp - lastFetch) / 1000 > 60;
    },
  },
};
