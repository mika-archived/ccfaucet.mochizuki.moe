<template lang='pug'>
  .root
    cf-header
    nuxt
    cf-footer
</template>

<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

export default {
  name: "default",
  components: {
    "cf-header": Header,
    "cf-footer": Footer
  }
};
</script>

<style>
.root {
  padding-top: 65px;
  margin-bottom: 25px;
}

section {
  padding: 10px 0 20px 0;
}
</style>
