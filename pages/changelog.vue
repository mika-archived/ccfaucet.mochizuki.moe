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
import Component from "nuxt-class-component";

@Component({
  head() {
    return {
      title: "変更履歴 - 落ち葉拾い"
    };
  }
})
export default class Changelog extends Vue {
  changelogs = [
    {
      date: "2017/11/23",
      content: "リニューアルしました。"
    },
    {
      date: "2017/11/25",
      content: "トランザクションへのリンクを追加。"
    },
    {
      date: "2018/01/15",
      content: "Google にインデックスされるようにいろいろ変更しました。"
    },
    {
      date: "2018/02/12",
      content: "Transacion 情報の有無で絞れるようにしました。"
    },
    {
      date: "2018/02/28",
      content: "検索条件の保存および復元に対応しました (自動で保存と復元を行います)。"
    }
  ].reverse();
}
</script>
