<template>
    <div id="app">
        <div v-if="!initialized">
            Loading...
        </div>
        <div v-else class="mt-4">
            <ul class="nav nav-tabs justify-content-center">
                <li class="nav-item">
                    <router-link class="nav-link" :to="{ name: 'Index' }"
                                 v-t="'navigation.index'"/>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" :to="{ name: 'Settings' }"
                                 v-t="'navigation.settings'"/>
                </li>
            </ul>
        </div>
        <router-view/>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { SET_INITIALIZED } from '@/vuex/mutationTypes';

export default {
  name: 'App',
  data() {
    return {};
  },
  computed: {
    ...mapState({
      initialized: 'initialized',
    }),
  },
  mounted() {
    if (!this.initialized) {
      setTimeout(() => {
        this.$store.commit(SET_INITIALIZED, true);
      }, 3000);
    }
  },
};
</script>

<style lang="scss">
    @import '~bootstrap/scss/bootstrap.scss';
    @import 'assets/scss/transitions';
</style>
