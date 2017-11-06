<template>
  <b-container>
    <section>
      <h2>このサイトについて</h2>
      <p>
        このサイトは、仮想通貨・暗号通貨のフォーセット(蛇口)へのリンクを纏めた物です。
      </p>
    </section>
    <section>
      <h3>フォーセット (蛇口) とは？</h3>
      <p>
        無料で Bitcoin や Monacoin がもらえるサイトの事です。一定の条件を満たす (広告を見るなど) ことで、少額の暗号通貨を無料でもらうことが出来ます。 基本的には広告収入によって成り立っていますが、 Monacoin などでは、運営者の善意によって配布されていることがあります。
      </p>
    </section>
    <section>
      <h3>各項目について</h3>
      <p>
        蛇口の一覧表示について、各項目の説明です。
      </p>
      <b-table bordered responsive :items="items.items" :fields="items.fields" />
    </section>
    <section>
      <h3>Verify について</h3>
      <p>
        以下、出金に成功した際のトランザクションです。
      </p>
      <b-table bordered responsive :items="transactions.items" :fields="transactions.fields">
        <template slot="txid" slot-scope="data">
          <a :href="linkTo(data.item)" target="_blank">
            <code>{{data.item.txid}}</code>
          </a>
        </template>
      </b-table>
    </section>
    <section>
      <h3>その他</h3>
      <div>
        <h4>招待リンクになっているのウザい</h4>
        <p>
          どうしてもという場合は、URL に
          <code>?refer=false</code> を付けてリロードすると、純粋なサイト URL になります。
        </p>
      </div>
    </section>
  </b-container>
</template>

<script>
/* eslint-disable space-before-function-paren */
export default {
  name: 'About',
  data() {
    return {
      items: {
        fields: {
          label: {label: '項目名'},
          desc: {label: '説明'}
        },
        items: [
          {label: '✓', desc: '当サイトにて、実際に出金を確認できた場合は ✓ が入っています。'},
          {label: '通貨', desc: '蛇口から引き出すことが出来る暗号通貨です。'},
          {label: 'ウェブサイト', desc: '蛇口の URL およびサイト名です。申し訳ありませんが、リンクはアフィリエイトになっています。'},
          {label: 'タイマー', desc: '蛇口から暗号通貨をもらうことが出来る頻度です。 Generate の場合、時間経過によってもらえる量が変化します。'},
          {label: '支払い方法', desc: '暗号通貨の支払い方法です。 Direct 以外は、一旦サイト側に保持され、一定量貯まることで出金できます。'},
          {label: '最小出金額', desc: '暗号通貨を出金する際の最小金額です。この額に満たない場合は出金できず、サイト側にて保持されます。'},
          {label: '手数料', desc: '出金時にかかる手数料です。多くの場合、出金量が多いほど手数料が少なくなります。'},
          {label: '日本円', desc: 'サイトにアクセスした時点の日本円換算での価値です。'},
          {label: '認証形式', desc: 'ロボットでないことを証明するための CAPTCHA の種類です。'}
        ]
      },
      transactions: {
        fields: {
          currency: {label: 'Currency'},
          from: {label: 'From'},
          txid: {label: 'TxID'}
        },
        items: [
          {currency: 'Bitcoin', from: 'CoinPot', txid: '1d6f03b14909353e417422e13332f87012f1a34a70e5b0413acadc882843bc06'},
          {currency: 'Dogecoin', from: 'FaucetHub', txid: '40798c472fe913e0020886bee9fdaaab5f74424fc35d9ee9f72457ecd69357d4'},
          {currency: 'Dogecoin', from: 'FaucetHub', txid: '7e5de2bb05ed85ca521a495648ba4482d739d1c77187d69fbbab66f221a78c9c'},
          {currency: 'Litecoin', from: 'CoinPot', txid: '420c1a180e0d5ee6e0eb2e3ef031314d334adf146e465eaca824ba1ea57a2d38'},
          {currency: 'Monacoin', from: 'Monacoin Station', txid: '524ab77e1a158b5698ca24e7b72cf5cc3f3c242bc87a6b91fc5e15d2b826160b'}
        ]
      },
      blockexplorers: [
        {currency: 'Bitcoin', url: 'https://chainflyer.bitflyer.jp/Transaction'},
        {currency: 'Dogecoin', url: 'https://dogechain.info/tx'},
        {currency: 'Litecoin', url: 'https://live.blockcypher.com/ltc/tx'},
        {currency: 'Monacoin', url: 'https://mona.chainsight.info/tx'}
      ]
    }
  },
  methods: {
    linkTo: function(data) {
      return `${this.$data.blockexplorers.find((w) => w.currency === data.currency).url}/${data.txid}`
    }
  }
}
</script>

<style scoped>
section {
  padding: 10px 0 20px 0;
}
</style>
