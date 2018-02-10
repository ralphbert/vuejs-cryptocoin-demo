<script>
export const DIRECTIONS = {
  UP: 'arrow-up',
  DOWN: 'arrow-down',
  LEFT: 'arrow-left',
  RIGHT: 'arrow-right',
};

export default {
  props: {
    direction: {
      type: String,
      default: DIRECTIONS.UP,
    },
  },
};
</script>

<template>
<span class="arrow" :class="direction"></span>
</template>

<style lang="scss" scoped>
.arrow {
  display: inline-block;
  font-size: 0.8em;

  &.arrow-up {
    transform: rotate(0);
  }

  &.arrow-right {
    transform: rotate(90deg);
  }

  &.arrow-down {
    transform: rotate(180deg);
  }

  &.arrow-left {
    transform: rotate(270deg);
  }

  &:before {
    content: '';
    display: block;
    width: 0;
    height: 0;
    border-bottom: 0.5em solid currentColor;
    border-left: 0.5em solid transparent;
    border-right: 0.5em solid transparent;
  }

  &:after {
    content: '';
    display: block;
    position: relative;
    width: 0.2em;
    height: 0.5em;
    left: 0.5em;
    transform: translate(-50%, 0);
    background: currentColor;
  }
}
</style>
