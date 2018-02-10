<script>
import Arrow, { DIRECTIONS } from '@/components/Arrow';
import filters from '@/filters';

export default {
  props: {
    value: {
      type: Number,
      default: null,
    },
  },
  filters,
  components: {
    Arrow,
  },
  data() {
    return {
      direction: DIRECTIONS.RIGHT,
      oldValue: 0,
    };
  },
  computed: {
    delta() {
      return this.value - this.oldValue;
    },
  },
  mounted() {
    this.oldValue = this.value;
    this.$watch('value', (newValue, oldValue) => {
      if (newValue > oldValue) {
        this.direction = DIRECTIONS.UP;
      } else if (newValue < oldValue) {
        this.direction = DIRECTIONS.DOWN;
      } else {
        this.direction = DIRECTIONS.RIGHT;
      }

      this.oldValue = oldValue;
    });
  },
};
</script>

<template>
<span class="change-indicator">
  <Arrow :direction="direction"/>
  <span class="change">
    <template v-if="delta > 0">+</template>{{delta | round}}
  </span>
</span>
</template>

<style lang="scss" scoped>
.arrow {
  &.arrow-up {
    &, & ~ .change {
      color: green;
    }
  }

  &.arrow-down {
    &, & ~ .change {
      color: #b4000d;
    }
  }

  &.arrow-left,
  &.arrow-right {
    &, & ~ .change {
      color: #333;
    }
  }
}

.change {
  font-family: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}

.arrow, .change {
  transition: all 0.25s;
}
</style>
