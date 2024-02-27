<template>
  <div class="poll-list">
    <div class="poll-list__header">
      <h1>Previous Rulings</h1>
      <b-dropdown
        v-show="!isMobile"
        size="lg"
        variant="light"
        :text="viewType"
        class="m-md-2 custom-dropdown">
        <b-dropdown-item
          v-for="type in types"
          :key="type"
          @click="viewType = type">
          {{ type }}
        </b-dropdown-item>
      </b-dropdown>
    </div>
    <div class="poll-list__content" :class="{ grid: isSquare }">
      <div
        class="pollcard__container mt-4"
        v-for="personality in personalityList"
        :key="personality.id">
        <PollCardSquare
          v-if="isSquare"
          :card="personality"
          @voteEvent="voteEventHandler(personality.id, $event)" />
        <PollCardHorizontal
          v-else
          :card="personality"
          @voteEvent="voteEventHandler(personality.id, $event)" />
      </div>
    </div>
  </div>
</template>

<script>
import PollCardSquare from './PollCardSquare.vue';
import PollCardHorizontal from './PollCardHorizontal.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'PollList',
  components: {
    PollCardHorizontal,
    PollCardSquare,
  },
  data() {
    return {
      viewType: 'List',
      types: ['Grid', 'List'],
      isMobile: window.innerWidth <= 767,
    };
  },
  computed: {
    ...mapGetters('personality', ['personalityList']),

    isSquare() {
      return this.viewType === 'Grid';
    },
  },

  methods: {
    ...mapActions('personality', ['getPersonalities', 'incrementVote']),

    voteEventHandler(personalityId, voteType) {
      this.incrementVote({ personalityId, voteType });
    },

    checkMobile() {
      let timeout;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        this.isMobile = window.innerWidth <= 767;
        if (this.isMobile) {
          this.viewType = 'Grid';
        }
      }, 200);
    },
  },
  created() {
    this.checkMobile();
    window.addEventListener('resize', this.checkMobile);
    this.getPersonalities();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkMobile);
  },
};
</script>

<style lang="scss">

.poll-list {
  margin-bottom: 35px;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__content {
    display: flex;
    overflow: scroll;

    @media (min-width: 768px) {
      flex-direction: column;
      overflow: unset;
    }

    &.grid {
      @media (min-width: 768px) {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
        justify-content: center;
      }

      @media (min-width: 992px) {
        grid-template-columns: repeat(3, 1fr); 
      }

      .pollcard__container {
        margin-right: 15px;
      }
    }
  }
}

.custom-dropdown {
  width: 200px;
  border: 2px solid var(--color-black);
  border-radius: 0;

  ul.dropdown-menu.show {
    left: -2px;
    border-radius: 0;
  }

  li {
    border: 2px solid var(--color-black);
    border-radius: 0;
    background-color: var(--color-white);
    width: 200px;
    margin-top: -10px;
    margin-bottom: 10px;
    height: 50px;

    &:last-child {
      margin-bottom: -10px;
      border-top:0px;
    }
  }

  .dropdown-menu.show {
    background: unset;
    padding: 0 !important;
  }
}
</style>
