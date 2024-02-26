<template>
  <div class="poll-list">
    <div class="poll-list__header">
      <h1>Previous Rulings</h1>
      <b-dropdown
        v-if="!isMobile"
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
import  { mapActions, mapGetters } from 'vuex';

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
      personalityLisxt: [],
      isMobile: window.innerWidth <= 767,
    };
  },
  computed: {
    ...mapGetters('personality',[
      'personalityList', 
    ]),
   
    isSquare() {
      return this.viewType === 'Grid';
    },
  },

  methods: {
    ...mapActions('personality',[
      'getPersonalities', 
    ]),
    checkMobile() {
      this.isMobile = window.innerWidth <= 767;
      if (this.isMobile) {
        this.viewType = 'Grid';
      }
    },

    voteEventHandler(personalityId, voteType) {
      console.log('----vote handler: ', personalityId, voteType);
    },
  },
  created() {
    window.addEventListener('resize', this.checkMobile);
    this.checkMobile();
    this.getPersonalities();
   
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkMobile);
  },
};
</script>

<style scoped lang="scss">
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

    @media (min-width: 767px) {
      flex-direction: column;
      overflow: unset;
    }

    &.grid {
      @media (min-width: 767px) {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
        justify-content: center;
        grid-template-columns: repeat(2, 1fr);
      }

      @media (min-width: 1000px) {
        grid-template-columns: repeat(3, 1fr);
      }

      .pollcard__container {
        margin-right: 15px;
      }
    }
    &.list {
      // list view styles
    }
    &.grid {
      // grid view styles
    }
  }
}

.custom-dropdown {
  width: 200px;
  border: 2px solid #000;
  border-radius: 0;
  ul.dropdown-menu.show {
    left: -2px;
  }
  li {
    border: 1px solid #000;
    border-radius: 0;
    width: 200px;
    margin-top: -10px;
    margin-bottom: 10px;
    height: 50px;
    &:last-child {
      margin-bottom: -10px;
    }
  }
  .dropdown-menu.show {
    background: unset;
    padding: 0 !important;
  }
}
</style>
