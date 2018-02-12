import settings from '@/settings';

export default {
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
};
