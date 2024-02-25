<template>
  <div id="app">
      <PollPage />
    </div>
</template>

<script>
import PollPage from './components/PollPage.vue';

export default {
  name: 'App',
  components: {
    PollPage
    }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
