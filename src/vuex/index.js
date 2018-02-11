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
    paths: ['settings', 'wallet', 'rates', 'changeIndicators'],
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
      rates: {
        updated: null,
        values: {},
      },
      amounts: {},
    },
    changeIndicators: {},
  },
  getters: {
    selectedCoinIds(state) {
      return state.wallet.selections.map(c => c.Id);
    },
    selectedCoinSymbols(state) {
      return state.wallet.selections.map(c => c.Symbol);
    },
    coinValues(state) {
      const rates = state.wallet.rates.values;

      return state.wallet.selections.map((coin) => {
        const symbol = coin.Symbol;
        let rate = 0;

        try {
          rate = rates[symbol][state.settings.currency];
        } catch (e) {
          // ignore the error
        }

        const amount = state.wallet.amounts[symbol];

        return {
          symbol,
          coin,
          rate,
          ledger: {
            amount,
            total: rate * amount,
          },
        };
      });
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
        state.wallet.amounts[coin.Symbol] = 0;
      } else {
        state.wallet.selections = state.wallet.selections.filter(c => c !== coin);
        delete state.wallet.amounts[coin.Symbol];
      }
    },
    [mutationTypes.SET_RATES](state, rates) {
      state.wallet.rates.values = rates.values;
      state.wallet.rates.updated = rates.updated;
    },
    [mutationTypes.SET_AMOUNT](state, payload) {
      const amounts = { ...state.wallet.amounts };
      amounts[payload.symbol] = payload.amount;
      state.wallet.amounts = amounts;
    },
    [mutationTypes.SET_CHANGE_INDICATOR_VALUE](state, payload) {
      state.changeIndicators[payload.name] = payload.value;
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
    getRates(context) {
      const currency = context.state.settings.currency;
      let symbols = context.getters.selectedCoinSymbols;

      if (symbols.length <= 0) {
        return Promise.resolve();
      }

      symbols = [...symbols, currency];
      const query = symbols.join(',').toUpperCase();

      return new Promise((resolve, reject) => {
        axios.get(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${query}&tsyms=${query}`)
          .then((result) => {
            const values = result.data;
            const rates = {
              values,
              updated: new Date(),
            };
            context.commit(mutationTypes.SET_RATES, rates);
            resolve(rates);
          }).catch((error) => {
            reject(error);
          });
      });
    },
  },
});

export default store;
