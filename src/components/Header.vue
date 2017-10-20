<template>
  <b-navbar toggleable="md" type="dark" variant="dark" fixed="top">
    <b-nav-toggle target="nav_collapse"></b-nav-toggle>
    <b-navbar-brand to="/">mochizuki.moe</b-navbar-brand>
    <b-collapse is-nav id="nav_collapse">
      <b-nav is-nav-bar class="ml-auto">
        <b-nav-item to="/about">About</b-nav-item>
      </b-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: 'Header'
}
</script>
