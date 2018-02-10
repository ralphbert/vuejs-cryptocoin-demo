<template>
<div class="container pt-4">
  <div class="row">
    <div class="col-12 col-sm-6">
      <CoinBrowser/>
    </div>
    <div class="col-12 col-sm-6">
      <div class="form-group">
        <label for="language" v-t="'settings.language'"></label>
        <SelectControl id="language"
                       @change="updateLanguage"
                       :selection="language"
                       :values="languageSelectValues"/>
      </div>

      <div class="form-group">
        <label for="interval" v-t="'settings.interval'"></label>
        <SelectControl id="interval"
                       @change="updateInterval"
                       :selection="interval"
                       :values="[5000, 10000, 15000]"/>
      </div>

      <div class="form-group">
        <label for="currencies" v-t="'settings.currencies'"></label>
        <SelectControl id="currencies"
                       @change="updateCurrency"
                       :selection="currency"
                       :values="availableCurrencies"/>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import { SET_INTERVAL, SET_CURRENCY, SET_LANGUAGE } from '@/vuex/mutationTypes';
import CoinBrowser from '@/components/CoinBrowser';
import SelectControl from '@/components/Select';

export default {
  name: 'Settings',
  components: {
    CoinBrowser,
    SelectControl,
  },
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
    languageSelectValues() {
      return this.availableLanguages.map(lang => ({
        value: lang,
        text: this.$t(`language.${lang}`),
      }));
    },
  },
  methods: {
    ...mapMutations({
      setInterval: SET_INTERVAL,
      setCurrency: SET_CURRENCY,
      setLanguage: SET_LANGUAGE,
    }),
    updateInterval(value) {
      this.setInterval(value);
    },
    updateCurrency(value) {
      this.setCurrency(value);
    },
    updateLanguage(value) {
      this.setLanguage(value);
    },
  },
};
</script>

<style scoped>

</style>
