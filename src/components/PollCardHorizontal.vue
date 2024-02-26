<template>
  <div class="pollcard">
    <div class="pollcard__info d-flex row">
      <div class="pollcard__profile col-md-3">
        <b-icon
          v-if="isNegative"
          icon="hand-thumbs-down-fill"
          class="btn-vote btn-result text-white negative"></b-icon>
        <b-icon
          v-if="isPositive"
          icon="hand-thumbs-up-fill"
          class="btn-vote btn-result text-white positive"></b-icon>
        <img :src="imagePath" :alt="card.name + ' profile picture'" />
      </div>
      <div class="pollcard__details d-flex text-white col-md-9">
        <div class="pollcard__description col-md-8">
          <h3>{{ card.name }}</h3>
          <p>{{ card.description }}</p>
        </div>
        <div class="pollcard__actions col-md-4">
          <p v-if="hasVoted">Thank you for voting</p>
          <p v-else>{{ lastUpdatedDescription }}</p>
          <div class="vote-actions">
            <button
            v-if="!hasVoted"
              @click="selectVote('like')"
              class="btn-like btn-vote text-white positive"
              :class="{ active: selectedVote === 'like' }">
              <b-icon icon="hand-thumbs-up-fill"></b-icon>
            </button>
            <button
            v-if="!hasVoted"
              @click="selectVote('dislike')"
              class="btn-dislike btn-vote text-white negative"
              :class="{ active: selectedVote === 'dislike' }">
              <b-icon icon="hand-thumbs-down-fill"></b-icon>
            </button>
            <button @click="voteHandler" class="btn-vote-now text-white">
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
.pollcard {
  height: 170px;
  width: 100%;
  overflow: hidden;
  position: relative;
  background-color: #979797;
  &:after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 76%;
    background: linear-gradient(to right, rgba(255, 255, 255, 0), #979797 96%);
    pointer-events: none;
  }
  &.square {
    width: 350px;
    height: 350px;
  }

  &__description {
    text-align: left;
    overflow: hidden;
    padding: 10px 0;
    height: 140px;
    h3 {
      color: #fff;
      font-weight: 400;
      font-size: 36px;
    }
    p {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
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
    p {
      font-weight: bold;
    }

    .vote-actions {
      text-align: right;
      padding: 0 15px;
    }

    .btn-vote-now {
      background-color: rgba(0, 0, 0, 0.6);
      border: 1px solid #fff;
      font-size: 18px;
      padding: 10px 15px;
    }
  }
}

.btn-vote {
  border: 0;
  margin-right: 10px;
  padding: 10px 15px;
}

.active {
  border: 3px solid #fff;
}

.vote-results {
  display: flex;
  align-items: center;
  height: 50px;
  background-color: #f0f0f0;
  position: absolute;
  bottom: 0;
  width: 100%;
  z-index: 9999;
  opacity: 0.6;
  font-size: 27px;
  div {
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 15px;
    color: #fff;
  }
  .b-icon {
    margin: 0 5px;
  }
}
.positive {
  background-color: #3cbbb4;
}
.negative {
  background-color: #f9ad1d;
  justify-content: end;
}
</style>
