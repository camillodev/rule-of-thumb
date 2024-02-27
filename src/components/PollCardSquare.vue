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
        <VoteActions @onSubmitVote="submitVoteHandler($event)" :lastUpdated="lastUpdatedDescription" />
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
  name: 'PollCardSquare',
  components: {
    VoteButton,
    VoteActions,
    VoteResults,
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
    ...mapActions('personality', ['incrementVote']),

    submitVoteHandler(selectedVote) {
      this.incrementVote({personalityId: this.card.id, voteType: selectedVote})
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
}


.btn-result {
  position: absolute;
  top: 7px;
  left: 0;
}

.vote-results {
  position: absolute;
  z-index: 9999;
  opacity: 0.8;
  font-size: 1.125rem; // 18px
  
}

</style>
