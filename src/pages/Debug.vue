<script>
import Arrow, { DIRECTIONS } from '@/components/Arrow';
import ChangeIndicator from '@/components/ChangeIndicator';

export default {
  components: {
    Arrow,
    ChangeIndicator,
  },
  data() {
    return {
      direction: DIRECTIONS.LEFT,
      newValue: 100,
    };
  },
  mounted() {
    const dirs = [DIRECTIONS.UP, DIRECTIONS.RIGHT, DIRECTIONS.DOWN, DIRECTIONS.LEFT];
    let counter = 0;
    setInterval(() => {
      counter += 1;
      this.direction = dirs[counter % dirs.length];
      this.newValue = Math.random() * 100;
    }, 1000);
  },
};
</script>

<template>
<div>
  <div>
    Arrow: <Arrow :direction="direction" /><br>
    ChangeIndicator: <ChangeIndicator :value="newValue" /><br>
  </div>
</div>
</template>

