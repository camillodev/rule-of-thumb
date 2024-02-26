<template>
  <div class="pollcard">
    <div class="pollcard__info d-flex row">
      <div class="pollcard__profile col-md-3">
        <img :src="imagePath" :alt="card.name + ' profile picture'" />
      </div>
      <div class="pollcard__details col-md-9">
        <div class="pollcard__description col-md-6">
          <h3>{{ card.name }}</h3>
          <p>{{ card.description }}</p>
        </div>
        <div class="pollcard__actions col-md-3">
          <p v-if="hasVoted">Thank you for voting</p>
          <p v-else>{{ lastUpdatedDescription }}</p>
          <div class="vote-actions">
            <button @click="selectVote('like')" class="like-btn">
              <b-icon icon="hand-thumbs-up"></b-icon>
            </button>
            <button @click="selectVote('dislike')" class="dislike-btn">
              <b-icon icon="hand-thumbs-down"></b-icon>
            </button>
            <button @click="voteHandler" class="vote-now-btn">Vote Now</button>
          </div>
        </div>
      </div>
    </div>
    <div class="vote-results">
      <div class="positive" :style="{ width: positivePercentage + '%' }">
        {{ positivePercentage }}%
      </div>
      <div class="negative" :style="{ width: negativePercentage + '%' }">
        {{ negativePercentage }}%
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'PollCard',
  props: {
    card: {
      type: Object,
      default: () => ({}),
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
  },
  methods: {
    voteHandler() {
      this.hasVoted = true;
      this.$emit('voteEvent', this.selectedVote);
    },

    selectVote(selectedVote) {
      this.selectedVote = selectedVote;
    },
  },
};
</script>

<style lang="scss" scoped>
.pollcard {
  height: 170px;
  width: 100%;
  border: 1px solid #000;
  overflow: hidden;
  position: relative;
  background: linear-gradient(to right, rgba(255, 255, 255, 0), #979797 30%);

  &__description {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__profile {
    height: 170px;
    position: relative;

    img {
      object-fit: cover;
      height: 100%;
      width: 100%;
    }
  }
  &:after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 70%; // Ajuste isso conforme necessário para controlar onde o degradê começa/termina
    background: linear-gradient(to right, rgba(255, 255, 255, 0), #979797 77%);
    pointer-events: none; // Isso garante que o pseudo-elemento não interfira com cliques
  }
}

.vote-results {
  display: flex;
  height: 20px;
  background-color: #f0f0f0;
}
.positive {
  background-color: green;
}
.negative {
  background-color: red;
}
</style>
