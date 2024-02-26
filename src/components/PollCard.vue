<template>
  <div class="pollcard__container" >
    <PollCardSquare :card="card" v-if="isSquare"/>
    <PollCardHorizontal :card="card" v-else />
  </div>
</template>

<script>
import moment from 'moment';
import PollCardHorizontal from './PollCardHorizontal.vue';
import PollCardSquare from './PollCardSquare.vue';

export default {
  name: 'PollCard',
  components: {
    PollCardHorizontal,
    PollCardSquare
  },
  props: {
    card: {
      type: Object,
      default: () => ({}),
    },
    isSquare: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      selectedVote: '',
      hasVoted: false,
    };
  },
  computed: {
    totalVotes() {
      return this.card.votes.positive + this.card.votes.negative;
    },
    positivePercentage() {
      return Math.round((this.card.votes.positive / this.totalVotes) * 100);
    },
    negativePercentage() {
      return Math.round((this.card.votes.negative / this.totalVotes) * 100);
    },
    imagePath() {
      return require('@/assets/img/' + this.card.picture);
    },
    lastUpdatedDescription() {
      const formattedData = moment(this.card.lastUpdated).fromNow();
      const formattedCategory =
        this.card.category.charAt(0).toUpperCase() +
        this.card.category.slice(1);

      return `${formattedData} in ${formattedCategory}`;
    },
    isPositive() {
      return this.card.votes.positive > this.card.votes.negative;
    },
    isNegative() {
      return this.card.votes.negative > this.card.votes.positive;
    },
  },
  methods: {
    voteHandler() {
      this.hasVoted = true;
      this.$emit('voteEvent', this.selectedVote);
      console.log('Voted for: ', this.selectedVote);
    },

    selectVote(selectedVote) {
      this.selectedVote = selectedVote;
      console.log('selected vote: ', this.selectedVote);
    },
  },
};
</script>

<style lang="scss" scoped>
.pollcard__container{
  width: fit-content;
}
</style>
