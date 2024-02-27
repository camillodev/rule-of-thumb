<template>
  <div class="vote-results">
    <div class="positive vote-bar" :class="{'large': large}" :style="{ width: positivePercentage + '%' }">
      {{ positivePercentage }}% <b-icon icon="hand-thumbs-up-fill"></b-icon>
    </div>
    <div class="negative vote-bar" :class="{'large': large}" :style="{ width: negativePercentage + '%' }">
      {{ negativePercentage }}% <b-icon icon="hand-thumbs-down-fill"></b-icon>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VoteResults',
  props: {
    large: Boolean,
    positivePercentage: Number,
    negativePercentage: Number,
  },
};
</script>

<style scoped>
.vote-results {
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 0;
  width: 100%;
  z-index: 9999;
  opacity: 0.6;

  .vote-bar {
    display: flex;
    align-items: center;
    padding: 0 15px;
    color: var(--color-white);
    height: 35px;
  }
  .large {
    height: 55px;
  }
  .positive { background-color: var(--color-positive); }
  .negative { background-color: var(--color-negative); justify-content: end; }
}
</style>
