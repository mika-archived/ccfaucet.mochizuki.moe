<template>
  <div id="app">
    <container>
      <router-view/>
    </container>
  </div>
</template>

<script>
import Container from './components/Container.vue'

export default {
  name: 'app',
  components: {
    container: Container
  }
}
</script>
