<template lang="pug">
  b-container
    footer
      p
        | 当サイトにて使用している各種ロゴファイルおよび名称は、各団体・個人によって保護されています。
        br
        | また、当サイトは、それらの団体・個人とは関係がありません。
      p
        | 仮想通貨や蛇口の追加, 編集, 削除は、
        a(href="https://github.com/mika-f/crypto-faucets/" target="_blank") GitHub レポジトリ
        | まで
      p
        | コンタクト: 
        a(href="https://twitter.com/mika_f_cc" target="_blank") @mika_f_cc
        |  / 
        | 寄付: 
        a(href="https://mochizuki.moe/donation/" target="_blank") こちら
      p Copyright &copy; 2018 mochizuki.moe.
</template>

<script>
export default {
  name: "cf-footer"
};
</script>

<style scoped>
footer {
  border-top: thin solid silver;
  padding-top: 10px;
  font-size: 80%;
  text-align: center;
}

p {
  margin: 0;
}
</style>
