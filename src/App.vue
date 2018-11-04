<template>
  <div id="app">
    <Photo/>
    <!--<Jukebox/>-->
  </div>
</template>

<script>
import Photo from './components/Photo';
// import Jukebox from './components/Jukebox';

export default {
  name: 'App',
  components: {
    Photo,
    // Jukebox
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
