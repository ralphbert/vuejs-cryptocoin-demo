import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import settings from '@/settings';
import i18n from '@/i18n';
import * as mutationTypes from './mutationTypes';

Vue.use(Vuex);

const store = new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    initialized: false,
    settings: {
      interval: 5000,
      currency: settings.currency.default,
      availableCurrencies: settings.currency.supported,
      coins: null,
      selectedCoins: [],
      language: settings.language.default,
      availableLanguages: settings.language.supported,
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
    [mutationTypes.SET_LANGUAGE](state, language) {
      state.settings.language = language;
      i18n.locale = language;
    },
  },
});

export default store;
