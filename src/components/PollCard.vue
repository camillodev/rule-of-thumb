<template>
  <div class="poll-card">
    <div class="card-header">
     <div class="card-image">
      <img :src="imagePath" :alt="card.name + ' profile picture'">   
    </div>
     <div class="card-text">
       <h3>{{ card.name }}</h3>
      <p>{{ card.description }}</p>
     </div>
    </div>
    <div class="card-body">
      <div class="vote-results">
        <div class="positive" :style="{ width: positivePercentage + '%' }">{{positivePercentage}}%</div>
        <div class="negative" :style="{ width: negativePercentage + '%' }">{{negativePercentage}}%</div>
      </div>
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
</template>

<script>
export default {
  name: 'PollCard',
  props: {
    card: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      selectedVote: ""
    }
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
    }


  },
  methods: {
    voteHandler() {
      this.$emit("voteEvent", this.selectedVote);
    },

    selectVote(selectedVote) { 
      this.selectedVote = selectedVote;
    }
  }
}
</script>

<style scoped>
.poll-card {
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