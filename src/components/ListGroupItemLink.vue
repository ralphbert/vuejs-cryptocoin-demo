<script>
export default {
  props: {
    selected: {
      type: Boolean,
      default: false,
    },
    imageUrl: {
      type: String,
      required: false,
    },
  },
  methods: {
    onClick(e) {
      this.$emit('click', e);
    },
  },
};
</script>

<template>
<a class="list-group-item list-group-item-action"
   :class="{ 'active': selected }"
   href="#"
   @click.prevent="onClick">
  <div class="row align-items-center">
    <div class="col-auto"><img class="img-fluid" v-if="imageUrl" :src="imageUrl" /></div>
    <div class="col"><slot></slot></div>
  </div>
</a>
</template>

<style lang="scss" scoped>
.list-group-item {
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
