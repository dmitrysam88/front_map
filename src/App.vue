<template>
  <div id="app">
    <ThisMap/>
  </div>
</template>

<script>
  import ThisMap from './components/ThisMap';

export default {
  name: 'App',
  components: {
    ThisMap
  }
}
</script>

<style>
  html, body, #app {
    height: 100%;
    margin: 0;
  }
</style>
