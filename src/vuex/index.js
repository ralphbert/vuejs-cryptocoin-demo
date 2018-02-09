import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import * as mutationTypes from './mutationTypes';

Vue.use(Vuex);

const store = new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    initialized: false,
    settings: {
      interval: 5000,
      currency: 'EUR',
      availableCurrencies: ['EUR', 'USD'],
      coins: null,
      selectedCoins: [],
    },
    data: {
      wallet: {},
    },
  },
  mutations: {
    [mutationTypes.SET_INITIALIZED](state, init) {
      state.initialized = init;
    },
    [mutationTypes.SET_INTERVAL](state, interval) {
      state.settings.interval = interval;
    },
    [mutationTypes.SET_CURRENCY](state, currency) {
      state.settings.currency = currency;
    },
  },
});

export default store;
