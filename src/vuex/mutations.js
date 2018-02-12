import i18n from '@/i18n';
import * as mutationTypes from './mutationTypes';

export default {
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
    const newChangeIndicatorValues = { ...state.changeIndicators };
    newChangeIndicatorValues[payload.name] = {
      prevValue: payload.prevValue,
      newValue: payload.newValue,
    };
    state.changeIndicators = newChangeIndicatorValues;
  },
};
