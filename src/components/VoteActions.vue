<template>
  <div :class="['vote-actions', { large: large }]">
    <p v-if="hasVoted">Thank you for voting</p>
    <p v-else>{{ lastUpdated }}</p>
    <div class="btn-actions">
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
</template>

<script>
import VoteButton from './VoteButton.vue';

export default {
  name: 'VoteActions',
  components: {
    VoteButton,
  },
  props: {
    lastUpdated: String,
    large: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  data() {
    return {
      selectedVote: '',
      hasVoted: false,
    };
  },
  methods: {
    submitVote() {
      this.hasVoted = true;
      this.$emit('onSubmitVote', this.selectedVote);
    },

    selectVote(value) {
      this.selectedVote = value;
    },

    voteAgain() {
      this.hasVoted = false;
      this.selectedVote = '';
    },
  },
};
</script>

<style scoped lang="scss">
.vote-actions {
    text-align: right;
    p {
      font-weight: bold;
      font-size: 0.75rem; // 12px
    }
}
.btn-actions {
  text-align: right;
}

.btn-vote-now {
  background-color: var(--color-darker-background);
  border: 1px solid var(--color-white);
  padding: 0px 10px;
}

.large {
  
  .btn-vote-now {
    padding: 10px 10px;
  }

  ::v-deep .btn-vote {
    padding: 8px 13px;
  }
}
</style>
