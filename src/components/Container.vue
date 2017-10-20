<template>
  <div class="root">
    <l-header />
    <slot />
    <l-footer />
  </div>
</template>

<script>
import Header from './Header.vue'
import Footer from './Footer.vue'

export default {
  name: 'Container',
  components: {
    'l-header': Header,
    'l-footer': Footer
  }
}
</script>

<style>
.root {
  padding-top: 65px;
  margin-bottom: 25px;
}
</style>
