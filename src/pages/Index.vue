<script>
import { mapState, mapGetters } from 'vuex';
import { SET_AMOUNT } from '@/vuex/mutationTypes';
import filters from '@/filters';
import ChangeIndicator from '@/components/ChangeIndicator';
import ListGroup from '@/components/ListGroup';
import ListGroupItem from '@/components/ListGroupItem';

export default {
  name: 'Index',
  components: {
    ChangeIndicator,
    ListGroup,
    ListGroupItem,
  },
  filters,
  data() {
    return {
      timeout: null,
    };
  },
  methods: {
    setAmount(symbol, amount) {
      this.$store.commit(SET_AMOUNT, { symbol, amount });
    },
    update() {
      this.$store.dispatch('getRates').then(() => {
        this.timeout = setTimeout(() => {
          this.update();
        }, this.interval);
      });
    },
  },
  computed: {
    ...mapState({
      interval: state => state.settings.interval,
      currency: state => state.settings.currency,
      updated: state => state.wallet.rates.updated,
    }),
    ...mapGetters({
      items: 'coinValues',
    }),
    total() {
      return this.items.reduce((prev, item) => prev + (item.ledger.amount * item.rate), 0);
    },
  },
  mounted() {
    this.update();
  },
  beforeDestroy() {
    clearTimeout(this.timeout);
  },
};
</script>

<template>
<div class="container mt-4 mb-4">
  <div v-if="items.length">
    <list-group>
      <list-group-item :image-url="item.coin.ImageUrl"
                       v-for="item in items"
                       :key="item.coin.Id">
        <div class="row row justify-content-between">
          <div class="col-auto">
            {{item.rate}} {{item.symbol}}
            <ChangeIndicator :name="item.symbol" :value="item.rate"/>
          </div>
          <div class="col-6">
            <div class="row">
              <div class="col-6">
                <input class="form-control" type="number"
                       @input="setAmount(item.symbol, $event.target.value)"
                       :value="item.ledger.amount">
              </div>
              <div class="col-6 text-right">
                {{ item.ledger.amount * item.rate | round(2) }} {{currency}}
              </div>
            </div>
          </div>
        </div>
      </list-group-item>
      <list-group-item class="list-group-item-light">
        <div class="text-right font-weight-bold">
          Total: {{total | round(2) }} {{currency}} <ChangeIndicator name="total" :value="total" />
        </div>
      </list-group-item>
    </list-group>

    <div class="text-center pt-2 pb-2">
      <small class="text-muted">{{ $t('wallet.lastUpdate') }} {{ updated | date }}</small>
    </div>
  </div>
  <div v-else class="text-center">
    <p>{{ $t('wallet.empty') }}</p>

    <p><router-link :to="{ name: 'Settings' }">{{ $t('wallet.goToSettings') }}</router-link></p>
  </div>
</div>
</template>

<style scoped>

</style>
