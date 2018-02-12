import createPersistedState from 'vuex-persistedstate';

export default [createPersistedState({
  paths: ['settings', 'wallet', 'rates', 'changeIndicators'],
})];
