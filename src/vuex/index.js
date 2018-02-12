import Vue from 'vue';
import Vuex from 'vuex';

// Store components

import state from './state';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';
import plugins from './plugins';

Vue.use(Vuex);

const store = new Vuex.Store({
  plugins,
  state,
  getters,
  mutations,
  actions,
});

export default store;
