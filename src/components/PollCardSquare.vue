<template>
  <div class="pollcard">
    <div class="pollcard__info">
      <div class="pollcard__profile">
        <img
          :src="imagePath"
          :alt="card.name + ' profile picture'"
          class="image-responsive" />
      </div>
      <div class="pollcard__details text-white">
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

        <div class="pollcard__description">
          <h3>{{ card.name }}</h3>
          <p>{{ card.description }}</p>
        </div>
        <div class="pollcard__actions">
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
  name: 'PollCardSquare',
  components: {
    VoteButton,
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
    },
  },
};
</script>
<style lang="scss" scoped>
.pollcard {
  min-width: 300px;
  height: 350px;
  width: 100%;
  overflow: hidden;
  position: relative;

  &__info {
    position: relative;
    height: 100%;
  }
  &__details {
    position: absolute;
    top: 145px;
    bottom: 0;
    padding: 0 35px;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0),
      var(--color-darker-background)
    );
  }

  &__profile {
    height: 100%;

    img {
      object-fit: cover;
      height: 100%;
      width: 100%;
    }
  }

  &__description {
    text-align: left;
    overflow: hidden;
    h3 {
      color: var(--color-white);
      font-weight: 400;
      font-size: 1.875rem; // 30px
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-bottom: 5px;
      max-width: 250px;
    }
    p {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-bottom: 5px;
      font-size: 1rem;
    }
  }

  &__actions {
    text-align: right;
    p {
      font-weight: bold;
      margin-bottom: 5px;
      font-size: 0.75rem; // 12px
    }

    .vote-actions {
      text-align: right;
    }

    .btn-vote-now {
      background-color: var(--color-darker-background);
      border: 1px solid var(--color-white);
      padding: 0px 10px;
    }
  }
}

.btn-vote {
  border: 0;
  margin-right: 10px;
}

.active {
  border: 3px solid var(--color-white);
}

.btn-result {
  position: absolute;
  top: 7px;
  left: 0;
}

.vote-results {
  display: flex;
  align-items: center;
  height: 35px;
  background-color: var(--color-light-gray);
  position: absolute;
  bottom: 0;
  width: 100%;
  z-index: 9999;
  opacity: 0.8;
  font-size: 1.125rem; // 18px
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
  background-color: rgb(var(--color-green-positive));
}
.negative {
  background-color: rgb(var(--color-yellow-negative));
  justify-content: end;
}
</style>
