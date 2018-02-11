<script>

import Arrow, { DIRECTIONS } from '@/components/Arrow';
import filters, { roundFilter } from '@/filters';
import { SET_CHANGE_INDICATOR_VALUE } from '@/vuex/mutationTypes';

export default {
  props: {
    name: {
      require: false,
      type: String,
    },
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
      hasChanged: false,
      direction: DIRECTIONS.RIGHT,
      oldValue: null,
    };
  },
  computed: {
    delta() {
      return roundFilter(this.value) - roundFilter(this.oldValue);
    },
    safeOldValue() {
      if (this.name) {
        return this.$store.state.changeIndicators[this.name];
      }

      return this.oldValue;
    },
  },
  watch: {
    delta() {
      if (this.name) {
        this.$store.commit(SET_CHANGE_INDICATOR_VALUE, { name: this.name, value: this.delta });
      }
    },
  },
  beforeMount() {
    if (!this.$store.state.changeIndicators[this.name]) {
      this.$store.commit(SET_CHANGE_INDICATOR_VALUE, { name: this.name, value: 0 });
    }
  },
  mounted() {
    this.oldValue = this.safeOldValue;
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
    (<template v-if="delta > 0">+</template>{{delta | round}})
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
      color: #ccc;
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
