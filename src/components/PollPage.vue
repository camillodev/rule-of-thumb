<template>
    <div>
      <NavbarComponent />
      <HeroComponent />
        <div class="max-centered">
        
        </div>
  </div>
</template>

<script>
import NavbarComponent from './NavbarComponent.vue';
import HeroComponent from './HeroComponent.vue';
export default {
  name: 'PollPage',
  components: {
    NavbarComponent,
    HeroComponent,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped></style>
