<template>
  <button
    @click="emitClick"
    class-
    :class="['btn-vote', variant, { active: isActive, disabled: disabled }]"
    :disabled="disabled">
    <b-icon v-if="isPositive" icon="hand-thumbs-up-fill"></b-icon>
    <b-icon v-else icon="hand-thumbs-down-fill"></b-icon>
  </button>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false,
      required: false
    },
    variant: {
      type: String,
      default: "positive",
      required: false
    },
   
    isActive: {
      type: Boolean,
      default: false,
      required: false
    }
  },
   data() {
    return {
      hasVoted: false,
    };
  },
  computed: {
    isPositive() {
      return this.variant === 'positive';
    }
  },
  methods: {
    emitClick() {
      this.$emit('click');
    },
  },
};
</script>

<style scoped>
.btn-vote {
  margin-right: 10px;
  padding: 1px 6px;
  border: none;
  cursor: pointer;
  background-color: var(--color-dark-overlay);
  color: var(--color-white);

  &.positive {
    background-color: var(--color-positive);
  }
  &.negative {
    background-color: var(--color-negative);
  }
  &.disabled {
    cursor: default;
  }
  &.active {
    border: 3px solid var(--color-white);
  }
}
</style>
