<template>
  <div class="vote-results">
    <div class="positive" :style="{ width: positivePercentage + '%' }">
      {{ positivePercentage }}% <b-icon icon="hand-thumbs-up-fill"></b-icon>
    </div>
    <div class="negative" :style="{ width: negativePercentage + '%' }">
      {{ negativePercentage }}% <b-icon icon="hand-thumbs-down-fill"></b-icon>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VoteResults',
  props: {
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

  div {
    display: flex;
    align-items: center;
    padding: 0 15px;
    color: var(--color-white);
    min-height: 35px;
  }

  .positive { background-color: var(--color-positive); }
  .negative { background-color: var(--color-negative); justify-content: end; }
}
</style>
