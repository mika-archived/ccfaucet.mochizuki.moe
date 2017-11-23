<template lang="pug">
  #app
    container
      router-view
</template>

<script lang="ts">
import Container from "./components/Container.vue";

export default {
  name: "App",
  components: {
    container: Container
  }
};
</script>
