<script>

import { mapState } from 'vuex';
import Arrow, { DIRECTIONS } from '@/components/Arrow';
import filters, { roundFilter } from '@/filters';
import { SET_CHANGE_INDICATOR_VALUE } from '@/vuex/mutationTypes';

export default {
  props: {
    name: {
      require: true,
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
      direction: DIRECTIONS.RIGHT,
    };
  },
  methods: {
    update() {
      if (this.newValue > this.prevValue) {
        this.direction = DIRECTIONS.UP;
      } else if (this.newValue < this.prevValue) {
        this.direction = DIRECTIONS.DOWN;
      } else {
        this.direction = DIRECTIONS.RIGHT;
      }
    },
  },
  computed: {
    ...mapState({
      newValue(state) {
        if (state.changeIndicators[this.name]) {
          return state.changeIndicators[this.name].newValue;
        }

        return this.value;
      },
      prevValue(state) {
        if (state.changeIndicators[this.name]) {
          return state.changeIndicators[this.name].prevValue;
        }

        return this.value;
      },
    }),
    delta() {
      return roundFilter(this.newValue) - roundFilter(this.prevValue);
    },
  },
  watch: {
    value(prevValue, newValue) {
      this.$store.commit(SET_CHANGE_INDICATOR_VALUE, {
        name: this.name,
        prevValue,
        newValue,
      });
    },
    delta() {
      this.update();
    },
  },
  mounted() {
    if (!this.$store.state.changeIndicators[this.name]) {
      this.$store.commit(SET_CHANGE_INDICATOR_VALUE, {
        name: this.name,
        prevValue: this.value,
        newValue: this.value,
      });
    } else {
      this.update();
    }
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
