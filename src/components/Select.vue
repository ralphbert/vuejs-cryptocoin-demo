<script>
export default {
  props: {
    selection: {
      required: false,
    },
    values: {
      type: Array,
      required: true,
    },
  },
  computed: {
    innerValues() {
      return this.values.map((value) => {
        if (typeof value !== 'object') {
          return { value, text: value };
        }
        return value;
      });
    },
  },
  methods: {
    onChange(e) {
      this.$emit('change', e.target.value);
    },
  },
};
</script>

<template lang="html">
<select class="form-control" @change.prevent="onChange" :value="selection">
  <option v-for="item in innerValues" :key="item.value" :value="item.value">{{ item.text }}</option>
</select>
</template>

<style lang="scss" scoped>

</style>
