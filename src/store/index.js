import { createStore } from 'vuex';

export default createStore({
  state: {
    authToken: localStorage.getItem('authToken') || null, // Check localStorage for authToken
  },
  mutations: {
    setAuthToken(state, token) {
      state.authToken = token;
      localStorage.setItem('authToken', token); // Save token to localStorage
    },
    clearAuthToken(state) {
      state.authToken = null;
      localStorage.removeItem('authToken'); // Remove token from localStorage
    },
  },
  actions: {
    login({ commit }, userData) {
      commit('setAuthToken', userData.authToken); // Save token after login
    },
    logout({ commit }) {
      console.log('user-loggedout-vuex-store')
      commit('clearAuthToken'); // Clear token when logging out
    },
  },
  getters: {
    isAuthenticated(state) {
      return state.authToken !== null; // Check if the user is authenticated
    },
  },
});
