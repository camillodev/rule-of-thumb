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
        <VoteActions large class="pollcard__actions  col-md-5" @onSubmitVote="submitVoteHandler($event)" :lastUpdated="lastUpdatedDescription" />
      </div>
    </div>
    <VoteResults :negativePercentage="negativePercentage" :positivePercentage="positivePercentage" />
  </div>
</template>

<script>
import moment from 'moment';
import VoteButton from './VoteButton.vue';
import VoteActions from './VoteActions.vue';
import VoteResults from './VoteResults.vue';
import { mapActions } from 'vuex';
export default {
  
  name: 'PollCardHorizontal',
  components: {
    VoteButton,
    VoteActions,
    VoteResults
  },
  props: {
    card: {
      type: Object,
      default: () => ({}),
    },
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
     ...mapActions('personality', ['incrementVote']),

    submitVoteHandler(selectedVote) {
      this.incrementVote({personalityId: this.card.id, voteType: selectedVote})
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
    }
  }

  &__actions {
    padding: 30px 15px;
  }
}

.btn-vote {
  border: 0;
  margin-right: 10px;
  padding: 8px 13px;
}
.vote-results {
  display: flex;
  position: absolute;
  z-index: 9999;
  opacity: 0.6;
  font-size: 1.6875rem; // 27px
}


</style>
