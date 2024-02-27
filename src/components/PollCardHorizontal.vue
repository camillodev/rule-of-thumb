<template>
  <div class="pollcard">
    <div class="pollcard__info d-flex row">
      <div class="pollcard__profile col-md-3">
        <div class="pollcard__bg"></div>
        <VoteButton
          v-if="isNegative"
          class="btn-result"
          variant="negative"
          disabled />
        <VoteButton
          v-if="isPositive"
          class="btn-result"
          variant="positive"
          disabled />

        <img :src="imagePath" :alt="card.name + ' profile picture'" />
      </div>
      <div class="pollcard__details d-flex text-white col-md-9">
        <div class="pollcard__description col-md-7">
          <h3>{{ card.name }}</h3>
          <p>{{ card.description }}</p>
        </div>
        <div class="pollcard__actions col-md-5">
          <p v-if="hasVoted">Thank you for voting</p>
          <p v-else>{{ lastUpdatedDescription }}</p>
          <div class="vote-actions">
            <VoteButton
              v-if="!hasVoted"
              variant="positive"
              :is-active="selectedVote == 'positive'"
              @click="selectVote('positive')" />
            <VoteButton
              v-if="!hasVoted"
              variant="negative"
              :is-active="selectedVote == 'negative'"
              @click="selectVote('negative')" />
            <button
              v-if="hasVoted"
              @click="voteAgain"
              class="btn-vote-now text-white">
              Vote Again
            </button>
            <button
              v-else
              @click="submitVote"
              :disabled="!selectedVote"
              class="btn-vote-now text-white">
              Vote Now
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="vote-results">
      <div class="positive" :style="{ width: positivePercentage + '%' }">
        <b-icon icon="hand-thumbs-up-fill"></b-icon>
        {{ positivePercentage }}%
      </div>
      <div class="negative" :style="{ width: negativePercentage + '%' }">
        {{ negativePercentage }}% <b-icon icon="hand-thumbs-down-fill"></b-icon>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import VoteButton from './VoteButton.vue';

export default {
  name: 'PollCardHorizontal',
  components: {
    VoteButton,
  },
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
      return this.totalVotes > 0
        ? Math.round((this.card.votes.positive / this.totalVotes) * 100)
        : 0;
    },
    negativePercentage() {
      return this.totalVotes > 0
        ? Math.round((this.card.votes.negative / this.totalVotes) * 100)
        : 0;
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
    submitVote() {
      this.hasVoted = true;
      this.$emit('voteEvent', this.selectedVote);
    },

    voteAgain() {
      this.hasVoted = false;
      this.selectedVote = '';
    },

    selectVote(selectedVote) {
      this.selectedVote = selectedVote;
      console.log('selected vote: ', this.selectedVote);
    },
  },
};
</script>

<style lang="scss" scoped>
.pollcard {
  height: 170px;
  width: 100%;
  overflow: hidden;
  position: relative;
  background-color: var(--color-gray);

  &__info {
    position: relative;
  }
  &__bg {
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0),
      var(--color-gray) 90%
    );
    position: absolute;
    top: 0;
    right: 0;
    width: 145px;
    height: 100%;
  }

  &__description {
    text-align: left;
    overflow: hidden;
    padding: 10px 0;
    height: 140px;
    h3 {
      color: var(--color-white);
      font-weight: 400;
      font-size: 2.25rem; // 36px
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    p {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 1rem;
    }
  }

  &__profile {
    height: 170px;
    position: relative;

    img {
      object-fit: cover;
      height: 100%;
      width: 100%;
    }
    .btn-result {
      position: absolute;
      top: 0;
      left: 10px;
      height: 45px;
      width: 45px;
      padding: 10px 10px;
    }
  }

  &__actions {
    margin-top: 10px;
    text-align: right;
    padding: 0 15px;
    p {
      font-weight: bold;
      font-size: 1.125rem; // 18px
    }

    .btn-vote-now {
      background-color: var(--color-dark-overlay);
      border: 1px solid var(--color-white);
      font-size: 1.125rem; // 18px
      padding: 10px 10px;
    }
  }
}

.btn-vote {
  border: 0;
  margin-right: 10px;
  padding: 8px 13px;
}

.active {
  border: 3px solid var(--color-white);
}

.vote-results {
  display: flex;
  align-items: center;
  height: 50px;
  background-color: var(--color-background);
  position: absolute;
  bottom: 0;
  width: 100%;
  z-index: 9999;
  opacity: 0.6;
  font-size: 1.6875rem; // 27px
  div {
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 15px;
    color: var(--color-white);
  }
  .b-icon {
    margin: 0 5px;
  }
}
.positive {
  background-color: var(--color-positive);
}
.negative {
  background-color: var(--color-negative);
  justify-content: end;
}
</style>
