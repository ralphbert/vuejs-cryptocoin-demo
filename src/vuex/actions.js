import axios from 'axios';
import * as mutationTypes from './mutationTypes';

export default {
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
};
