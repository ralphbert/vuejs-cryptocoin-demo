<template>
    <div>
        <div class="form-group">
            <label for="interval" v-t="'settings.interval'"></label>
            <select id="interval" @change="updateInterval" :value="interval">
                <option v-for="i in [5000, 10000, 15000]" :key="i" :value="i">{{ i }}</option>
            </select>
        </div>

        <div class="form-group">
            <label for="currencies" v-t="'settings.currencies'"></label>
            <select id="currencies" @change="updateCurrency" :value="currency">
                <option v-for="availableCurrency in availableCurrencies"
                        :key="availableCurrency">{{ availableCurrency }}</option>
            </select>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import { SET_INTERVAL, SET_CURRENCY } from '@/vuex/mutationTypes';

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
    }),
  },
  methods: {
    ...mapMutations({
      setInterval: SET_INTERVAL,
      setCurrency: SET_CURRENCY,
    }),
    updateInterval(e) {
      this.setInterval(e.target.value);
    },
    updateCurrency(e) {
      this.setCurrency(e.target.value);
    },
  },
};
</script>

<style scoped>

</style>
