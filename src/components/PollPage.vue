<template>
  <div>
    <NavbarComponent />
    <HeroComponent />
    <div class="max-centered">
      <BannerComponent />
      <hr role="separator" />
      <FooterComponent />
    </div>
  </div>
</template>

<script>
import NavbarComponent from './NavbarComponent.vue';
import HeroComponent from './HeroComponent.vue';
import BannerComponent from './BannerComponent.vue';
import FooterComponent from './FooterComponent.vue';
export default {
  name: 'PollPage',
  components: {
    NavbarComponent,
    HeroComponent,
    BannerComponent,
    FooterComponent,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped></style>
