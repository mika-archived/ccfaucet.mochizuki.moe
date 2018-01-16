<template lang="pug">
  b-navbar(toggleable="md" type="dark" variant="dark" fixed="top")
    b-container
      b-nav-toggle(target="nav_collapse")
      b-navbar-brand(to="/") 落ち葉拾い
      b-collapse#nav_collapse(is-nav)
        b-navbar-nav.ml-auto
          b-nav-item(to="/currencies/") 全て
          b-nav-item(to="/about") このサイトについて
          b-nav-item(to="/changelog") 変更履歴
          b-nav-item(href="https://github.com/mika-f/crypto-faucets/" target="_blank") GitHub
</template>
