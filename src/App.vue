<script>
import { mapState } from 'vuex';
import { SET_INITIALIZED, SET_LANGUAGE } from '@/vuex/mutationTypes';
import Spinner from '@/components/Spinner';

export default {
  name: 'App',
  components: {
    Spinner,
  },
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
      this.$store.dispatch('getCoins').then(() => {
        setTimeout(() => {
          this.$store.commit(SET_INITIALIZED, true);
        }, 200);
      });
    }

    // force i18n update
    this.$store.commit(SET_LANGUAGE, this.$store.state.settings.language);
  },
};
</script>

<template>
<div id="app">
    <transition name="fade">
        <div class="cover" v-if="!initialized" key="loading">
            <Spinner />
        </div>
        <div v-else key="content">
            <div class="mt-4">
                <ul class="nav nav-tabs justify-content-center">
                    <li class="nav-item">
                        <router-link
                            class="nav-link"
                            :to="{ name: 'Index' }"
                            v-t="'navigation.index'"/>
                    </li>
                    <li class="nav-item">
                        <router-link
                            class="nav-link"
                            :to="{ name: 'Settings' }"
                            v-t="'navigation.settings'"/>
                    </li>
                </ul>
            </div>
            <router-view/>
        </div>
    </transition>
</div>
</template>

<style lang="scss">
@import '~bootstrap/scss/bootstrap.scss';
@import 'assets/scss/transitions';

.cover {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
}
</style>
