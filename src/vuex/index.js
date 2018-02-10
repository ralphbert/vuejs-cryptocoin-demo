import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import createPersistedState from 'vuex-persistedstate';
import settings from '@/settings';
import i18n from '@/i18n';
import * as mutationTypes from './mutationTypes';

Vue.use(Vuex);

const store = new Vuex.Store({
  plugins: [createPersistedState({
    paths: ['settings', 'wallet'],
  })],
  state: {
    initialized: false,
    settings: {
      interval: 5000,
      currency: settings.currency.default,
      availableCurrencies: settings.currency.supported,
      coins: null,
      language: settings.language.default,
      availableLanguages: settings.language.supported,
    },
    wallet: {
      selections: [],
    },
  },
  getters: {
    selectedCoinIds(state) {
      return state.wallet.selections.map(c => c.Id);
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
    [mutationTypes.SET_COINS](state, coins) {
      state.settings.coins = coins;
    },
    [mutationTypes.TOGGLE_COIN_SELECTION](state, coin) {
      if (state.wallet.selections.indexOf(coin) === -1) {
        state.wallet.selections.push(coin);
      } else {
        state.wallet.selections = state.wallet.selections.filter(c => c !== coin);
      }
    },
  },
  actions: {
    getCoins(context) {
      return new Promise((resolve, reject) => {
        axios.get('https://min-api.cryptocompare.com/data/all/coinlist').then((result) => {
          const baseImageUrl = result.data.BaseImageUrl;
          const coins = result.data.Data;
          const flatCoins = Object.keys(coins).map((key) => {
            const coin = coins[key];

            if (coin.ImageUrl) {
              coin.ImageUrl = `${baseImageUrl}${coin.ImageUrl}`;
            }

            return coin;
          });
          context.commit(mutationTypes.SET_COINS, flatCoins);
          resolve(flatCoins);
        }).catch((error) => {
          reject(error);
        });
      });
    },
  },
});

export default store;
