<template lang="pug">
  b-container
    section
      h2 更新履歴
    section(v-for="w in changelogs" :key="w.date")
      h3 {{w.date}}
      p {{w.content}}
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class Changelog extends Vue {
  changelogs = [
    {
      date: "2017/11/23",
      content: "リニューアルしました。"
    },
    {
      date: "2017/11/25",
      content: "トランザクションへのリンクを追加"
    }
  ].reverse();
}
</script>
