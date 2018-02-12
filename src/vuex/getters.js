export default {
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
};
