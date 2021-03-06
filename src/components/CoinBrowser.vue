<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import { TOGGLE_COIN_SELECTION } from '@/vuex/mutationTypes';
import ListGroup from '@/components/ListGroup';
import ListGroupCoinItem from '@/components/ListGroupCoinItem';

export default {
  data() {
    return {
      term: '',
    };
  },
  components: {
    ListGroup,
    ListGroupCoinItem,
  },
  computed: {
    ...mapGetters(['selectedCoinIds']),
    ...mapState({
      coins: state => state.settings.coins,
      selections: state => state.wallet.selections,
    }),
    filteredCoins() {
      if (this.term.length <= 0) {
        return [];
      }

      return this.coins
        .filter((c) => {
          if (this.selectedCoinIds.indexOf(c.Id) !== -1) {
            return false;
          }

          const strings = [c.Symbol.toLowerCase(), c.CoinName.toLowerCase()];
          return strings.filter(t => t.indexOf(this.term.toLowerCase()) !== -1).length;
        })
        .slice(0, 10);
    },
  },
  methods: {
    ...mapMutations({
      toggleCoinSelection: TOGGLE_COIN_SELECTION,
    }),
    clearAndSelect(coin) {
      this.term = '';
      this.toggleCoinSelection(coin);
      this.$refs.filter.focus();
    },
  },
};
</script>

<template>
<div class="coin-browser">
  <div class="coin-browser-inventory mb-3">
    <h3 v-t="'coinBrowser.selections.title'"></h3>

    <div v-if="selections.length <= 0" v-t="'coinBrowser.selections.empty'"></div>
    <list-group v-else>
      <list-group-coin-item
          v-for="coin in selections"
          :coin="coin"
          :key="coin.Id"
          @click="toggleCoinSelection(coin)"
      />
    </list-group>
  </div>

  <div class="coin-browser-search">
    <div class="form-group">
      <label for="coin-browser-filter" v-t="'coinBrowser.filter.label'"></label>
      <input id="coin-browser-filter" class="form-control" type="search"
             :placeholder="$t('coinBrowser.filter.placeholder')"
             v-model="term"
             ref="filter">
    </div>

    <list-group>
      <list-group-coin-item
          v-for="coin in filteredCoins"
          :selected="selections.indexOf(coin) !== -1"
          :coin="coin"
          :key="coin.Id"
          @click="clearAndSelect(coin)"
      />
    </list-group>

    <small class="form-text text-muted text-center"
           v-t="{ path: 'coinBrowser.totalText', args: { count: coins.length } }"></small>
  </div>
</div>
</template>

<style lang="scss" scoped>
.coin-browser {

}
</style>
