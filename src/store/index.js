import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    authToken: localStorage.getItem('authToken') || null, // Check localStorage for authToken
    invoiceData: {},
    transactionData: []
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
    setInvoiceData(state, data) {
      state.invoiceData = data;
    },
    setTransactionData(state, data) {
      state.transactionData = data;
    },
    setSavedInvoice(state, data) {
      state.savedInvoice = data; // Store the saved invoice in the state
    }
  },
  actions: {
    login({ commit }, userData) {
      commit('setAuthToken', userData.authToken); // Save token after login
    },
    logout({ commit }) {
      commit('clearAuthToken'); // Clear token when logging out
    },
    addInvoiceData({ commit }, invoiceData) {
      commit('setInvoiceData', invoiceData); // Store invoice data
    },
    addTransactionData({ commit }, transactionData) {
      commit('setTransactionData', transactionData); // Store transaction data
    },
    async saveInvoice({ commit }, { invoiceData, transactionData }) {
      try {
        // Prepare invoice data to save
        const dataToSave = {
          invoiceData,
          transactionData
        };

        // Make the Axios request to save the data
        const response = await axios.post('https://project-data-cc03.onrender.com/invoices', dataToSave);
        console.log('Invoice saved successfully:', response.data);

        // Commit the saved invoice data to the store
        commit('setSavedInvoice', response.data); // Store the saved invoice data in the state

        return response.data; // Return the saved data if needed
      } catch (error) {
        console.error('Error saving invoice:', error);
        throw error; // Re-throw the error to handle it in the component
      }
    }
  },
  getters: {
    isAuthenticated(state) {
      return state.authToken !== null; // Check if the user is authenticated
    },
    getInvoiceData(state) {
      return state.invoiceData; // Get invoice data from state
    },
    getTransactionData(state) {
      return state.transactionData; // Get transaction data from state
    },
    getSavedInvoice(state) {
      return state.savedInvoice; // Get saved invoice data from state
    }
  }
});
