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

<style>
@font-face {
  font-family: "Original Yu Gothic";
  src: local("Yu Gothic");
  font-weight: 300;
}

@font-face {
  font-family: "Original Yu Gothic";
  src: local("Yu Gothic");
  font-weight: 500;
}

@font-face {
  font-family: "Original Yu Gothic";
  src: local("Yu Gothic");
  font-weight: bold;
}
@font-face {
  font-family: "Helvetica Neue";
  src: local("Helvetica Neue Regular");
  font-weight: 100;
}
@font-face {
  font-family: "Helvetica Neue";
  src: local("Helvetica Neue Regular");
  font-weight: 200;
}

html {
  font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue",
    "Original Yu Gothic", "Yu Gothic", YuGothic, Verdana, Meiryo, "M+ 1p",
    sans-serif;
}

/* IE10以上 */
@media all and (-ms-high-contrast: none) {
  html {
    font-family: Verdana, Meiryo, sans-serif;
  }
}
@media all and (-ms-high-contrast: active) {
  html {
    font-family: Verdana, Meiryo, sans-serif;
  }
}

body {
  color: #333;
  background-color: #f9f9f9;
}
</style>
