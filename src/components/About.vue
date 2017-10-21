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
      <h3>支払い間隔について</h3>
      <p>
        当サイトにて表記している支払い間隔について、以下の分類をしています。
      </p>
      <b-table bordered :items="frequency.items" :fields="frequency.fields" />
    </section>
    <section>
      <h3>支払い方法について</h3>
      <p>
        当サイトにて表記している支払い方法にについて、サイト名に加えて以下の2種類の表記があります。 なお、サイト名が表記されている場合においても、支払い方法は Pooling と同様です。
      </p>
      <b-table bordered :items="payment.items" :fields="payment.fields" />
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
      frequency: {
        fields: {
          label: {label: '表記'},
          desc: {label: '説明'}
        },
        items: [
          {label: '時間表記 (例: 1 hour, 15 min)', desc: '表記されている時間が経過することで、一定量の暗号通貨をもらうことができます。'},
          {label: 'Generate', desc: '時間経過によって、もらえる暗号通貨の量が増加します。'}
        ]
      },
      payment: {
        fields: {
          label: {label: '表記'},
          desc: {label: '説明'}
        },
        items: [
          {label: 'Direct', desc: '入力したアドレスに対して、直接暗号通貨が送信されます。通常、他の蛇口に比べて高額で、手数料も無料です。'},
          {label: 'Pooling', desc: '一定量貯まるまで、サイト側でプールされます。一定量貯めることで、引き出すことが可能です。手数料がかかることがあります。'}
        ]
      }
    }
  }
}
</script>

<style scoped>
section {
  padding: 10px 0 20px 0;
}

div {
  padding: 10px 0 10px 0;
}
</style>
