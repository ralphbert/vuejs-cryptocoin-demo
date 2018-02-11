<script>
import ListGroupItem from '@/components/ListGroupItemLink';

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
  components: {
    ListGroupItem,
  },
  methods: {
    onClick() {
      this.$emit('click', this.coin);
    },
  },
};
</script>

<template>
<list-group-item class="coin-list-item"
           :selected="selected"
           @click.prevent="onClick"
           :image-url="coin.ImageUrl">
  {{ coin.CoinName }} <small class="text-muted">({{coin.Symbol}})</small>
</list-group-item>
</template>
