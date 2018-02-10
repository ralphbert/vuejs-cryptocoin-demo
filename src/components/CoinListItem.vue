<script>
export default {
  props: {
    selected: {
      type: Boolean,
      default: false,
    },
    coin: {
      type: Object,
      required: true,
    },
  },
  methods: {
    onClick(coin) {
      this.$emit('click', coin);
    },
  },
};
</script>

<template>
<a class="list-group-item list-group-item-action coin-list-item"
   :class="{ 'active': selected }"
   href="#"
   @click.prevent="onClick">
  <div class="row">
    <div class="col-auto"><img class="img-fluid" v-if="coin.ImageUrl" :src="coin.ImageUrl" /></div>
    <div class="col">{{ coin.CoinName }}</div>
  </div>
</a>
</template>

<style lang="scss" scoped>
.coin-list-item {
  img {
    width: 30px;
    height: auto;
  }

  .row {
    margin-right: -5px;
    margin-left: -5px;

    > .col,
    > [class*="col-"] {
      padding-right: 5px;
      padding-left: 5px;
    }
  }
}
</style>
