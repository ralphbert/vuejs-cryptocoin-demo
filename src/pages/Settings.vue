<template>
    <div class="container pt-4">
        <div class="form-group">
            <label for="language" v-t="'settings.language'"></label>
            <select class="form-control" id="language" @change="updateLanguage" :value="language">
                <option v-for="availableLanguage in availableLanguages"
                        :key="availableLanguage"
                        :value="availableLanguage"
                        v-t="'language.' + availableLanguage">{{ availableLanguage }}</option>
            </select>
        </div>

        <div class="form-group">
            <label for="interval" v-t="'settings.interval'"></label>
            <select class="form-control" id="interval" @change="updateInterval" :value="interval">
                <option v-for="i in [5000, 10000, 15000]"
                        :key="i"
                        :value="i">{{ i / 1000 }} s</option>
            </select>
        </div>

        <div class="form-group">
            <label for="currencies" v-t="'settings.currencies'"></label>
            <select class="form-control" id="currencies" @change="updateCurrency" :value="currency">
                <option v-for="availableCurrency in availableCurrencies"
                        :key="availableCurrency">{{ availableCurrency }}</option>
            </select>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import { SET_INTERVAL, SET_CURRENCY, SET_LANGUAGE } from '@/vuex/mutationTypes';

export default {
  name: 'Settings',
  data() {
    return {};
  },
  computed: {
    ...mapState({
      interval: state => state.settings.interval,

      availableCurrencies: state => state.settings.availableCurrencies,
      currency: state => state.settings.currency,

      availableLanguages: state => state.settings.availableLanguages,
      language: state => state.settings.language,
    }),
  },
  methods: {
    ...mapMutations({
      setInterval: SET_INTERVAL,
      setCurrency: SET_CURRENCY,
      setLanguage: SET_LANGUAGE,
    }),
    updateInterval(e) {
      this.setInterval(e.target.value);
    },
    updateCurrency(e) {
      this.setCurrency(e.target.value);
    },
    updateLanguage(e) {
      this.setLanguage(e.target.value);
    },
  },
};
</script>

<style scoped>

</style>
