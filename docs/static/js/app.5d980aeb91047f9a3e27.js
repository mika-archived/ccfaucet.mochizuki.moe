webpackJsonp([1],{"9M+g":function(e,n){},HCTz:function(e,n,t){"use strict";n.a={name:"Header"}},In9s:function(e,n){},Jmt5:function(e,n){},M93x:function(e,n,t){"use strict";function a(e){t("k5Nm")}var o=t("xJD8"),r=t("sDKM"),i=t("VU/8"),c=a,u=i(o.a,r.a,!1,c,null,null);n.a=u.exports},NHnr:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=t("7+uW"),o=t("sCSS"),r=t("M93x"),i=t("YaEn"),c=t("9M+g"),u=(t.n(c),t("Jmt5"));t.n(u);a.a.use(o.a),a.a.config.productionTip=!1,new a.a({el:"#app",router:i.a,template:"<App/>",components:{App:r.a}})},O9pw:function(e,n){e.exports=[{name:"AllInFaucet",frequency:60,payment:"Pooling",url:"http://namuyan.dip.jp/all_in_faucet.php",min:1}]},P9gH:function(e,n,t){function a(e){return t(o(e))}function o(e){var n=r[e];if(!(n+1))throw new Error("Cannot find module '"+e+"'.");return n}var r={"./bitcoin.json":"RYT6","./bitzeny.json":"sROK","./dash.json":"h5P2","./dogecoin.json":"hX8c","./fujicoin.json":"cxvo","./kumacoin.json":"O9pw","./litecoin.json":"WM/k","./monacoin.json":"pRrM","./nekonium.json":"XlIt","./nem.json":"jjcZ","./sha1coin.json":"enQ5"};a.keys=function(){return Object.keys(r)},a.resolve=o,e.exports=a,a.id="P9gH"},Q29k:function(e,n){e.exports=[{id:"Direct",min:0,name:"Direct",url:""},{id:"Pooling",min:-1,name:"Pooling",url:""},{id:"CoinPot",min:5e-4,name:"CoinPot",url:"https://coinpot.co"},{id:"FaucetHub",min:2e-4,name:"FaucetHub.io",url:"https://faucethub.io"}]},RGWY:function(e,n,t){"use strict";var a=t("teIl"),o=t("TVmP");n.a={name:"Container",components:{"l-header":a.a,"l-footer":o.a}}},RYT6:function(e,n){e.exports=[{name:"Bit Fun",frequency:0,payment:"CoinPot",url:"http://bitfun.co/?ref=6432A0FB3F81"},{frequency:15,name:"Bonus Bitcoin",payment:"CoinPot",url:"http://bonusbitcoin.co/?ref=D7ED3F50E1A9"},{frequency:60,name:"BtcForEveryone.xyz",payment:"FaucetHub",url:"https://btcforeveryone.xyz/?r=1E4NZUSC39BEPsE1xVKVyHrBxstXdrNVM4"},{frequency:60,name:"FreeBitco.in",payment:"Pooling",url:"https://freebitco.in/?r=7713155",min:3e-4},{frequency:0,name:"Moon Bitcoin",payment:"CoinPot",url:"http://moonbit.co.in/?ref=7a838f6cbb5c"},{frequency:5,name:"xFaucet",payment:"FaucetHub",url:"https://www.xfaucet.net/bitcoin/?r=1E4NZUSC39BEPsE1xVKVyHrBxstXdrNVM4"}]},Ryrf:function(e,n,t){"use strict";var a=t("woOf"),o=t.n(a),r=t("mtWM"),i=t.n(r),c=t("M4fF"),u=t.n(c);n.a={name:"Root",data:function(){var e=u.a.sortBy(t("xLvj"),function(e){return e.name.toLowerCase()}),n=[];return u.a.forEach(e,function(e){var a=u.a.sortBy(t("P9gH")("./"+e.name.toLowerCase()+".json"),function(e){return e.name.toLowerCase()});u.a.forEach(a,function(t){n.push(o()(t,{currency:e.symbol}))})}),{currencies:e,faucets:n,fields:{currency:{label:"通貨"},website:{label:"ウェブサイト"},frequency:{label:"支払い間隔"},payment:{label:"支払い方法"},minimumAmount:{label:"最小出金額"},price:{label:"JPY"}},payments:t("Q29k"),selectedCurrency:"*",selectedPayment:"*",tickers:null}},methods:{amount:function(e){return""},filtered:function(){var e=this;return"*"===this.$data.selectedCurrency&&"*"===this.$data.selectedPayment?this.$data.faucets:u.a.filter(this.$data.faucets,function(n){var t=!0;return t&="*"===e.$data.selectedCurrency||n.currency===e.$data.selectedCurrency,t&="*"===e.$data.selectedPayment||n.payment===e.$data.selectedPayment})},minimumAmount:function(e){return"Direct"===e.payment||"Pooling"===e.payment?e.min||0:this.resolve("payments","id",e.payment).min},pricing:function(e){if(null===this.$data.tickers)return"読み込み中...";var n=this.resolve("tickers","symbol",e.currency);if(n){var t=n.price_jpy;return t>=1e3?Math.floor(t):Math.floor(t*Math.pow(10,3))/Math.pow(10,3)}return"使用不可"},readable:function(e){if(e>=60){var n=e/60;return n>1?n+" hours":n+" hour"}return e>0?e+" min":"Generate"},resolve:function(e,n,t){return this.$data[e].find(function(e){return e[n]===t})}},mounted:function(){var e=this;null===this.$data.tickers?i.a.get("https://cors-anywhere.herokuapp.com/https://api.coinmarketcap.com/v1/ticker?convert=JPY").then(function(n){e.$data.tickers=n.data}).catch(function(e){console.error(e)}):console.log("Already loaded, skip.")}}},TVmP:function(e,n,t){"use strict";function a(e){t("In9s")}var o=t("UthT"),r=t("aiZq"),i=t("VU/8"),c=a,u=i(o.a,r.a,!1,c,"data-v-f3b0fe52",null);n.a=u.exports},UthT:function(e,n,t){"use strict";n.a={name:"Footer"}},"WM/k":function(e,n){e.exports=[{frequency:60,name:"Free LTC from the Litecoin Faucet!",payment:"Pooling",url:"http://litecoinfaucet.info/ref/LVfzaELameCFoEWoLQtKiBCsCUWgwkorcq",min:.01},{frequency:60,name:"Litecoin-Faucet.com",payment:"FaucetHub",url:"https://litecoin-faucet.com/?r=LiSmd3Pp1hCoPGPguSVCUyo1RHak5g1mcj"},{frequency:0,name:"Moon Litecoin",payment:"CoinPot",url:"http://moonliteco.in/?ref=c2f750048d81"},{frequency:5,name:"xFaucet",payment:"FaucetHub",url:"https://www.xfaucet.net/litecoin/?r=LiSmd3Pp1hCoPGPguSVCUyo1RHak5g1mcj"}]},XlIt:function(e,n){e.exports=[{name:"Nekonium Mining Pool",frequency:30,payment:"Direct",url:"http://nuko.oldbeyond.com/#/faucet"},{name:"ねこの水飲み場 - Nekonium Faucet",frequency:180,payment:"Direct",url:"https://faucet.nekonium.net/"}]},YaEn:function(e,n,t){"use strict";var a=t("7+uW"),o=t("/ocq"),r=t("c27y"),i=t("tBSM");a.a.use(o.a),n.a=new o.a({routes:[{path:"/",name:"Root",component:i.a},{path:"/about",name:"About",component:r.a}]})},Yk23:function(e,n,t){"use strict";var a=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("b-container",[t("section",[t("h2",[e._v("仮想通貨・暗号通貨フォーセットリスト")]),e._v(" "),t("p",[e._v("\n      仮想通貨・暗号通貨のフォーセット(蛇口)の一覧です。\n      "),t("br"),e._v(" 絞り込み機能を使うことで、 Monacoin (MONA) 限定にしたり、 Direct Payment のみ表示することも出来ます。\n    ")])]),e._v(" "),t("section",[t("b-card",{attrs:{title:"絞り込み"}},[t("b-form",[t("b-form-row",[t("b-col",{attrs:{col:"",md:"auto"}},[t("b-form-group",{attrs:{label:"通貨","label-for":"currency"}},[t("b-form-select",{attrs:{id:"currency"},model:{value:e.selectedCurrency,callback:function(n){e.selectedCurrency=n},expression:"selectedCurrency"}},[t("option",{attrs:{value:"*"}},[e._v("全て")]),e._v(" "),e._l(e.currencies,function(n){return t("option",{key:n.symbol,domProps:{value:n.symbol}},[e._v("\n                  "+e._s(n.name)+" ("+e._s(n.symbol)+")\n                ")])})],2)],1)],1),e._v(" "),t("b-col",{attrs:{col:"",md:"auto"}},[t("b-form-group",{attrs:{label:"支払い方法","label-for":"payment"}},[t("b-form-select",{attrs:{id:"payment"},model:{value:e.selectedPayment,callback:function(n){e.selectedPayment=n},expression:"selectedPayment"}},[t("option",{attrs:{value:"*"}},[e._v("全て")]),e._v(" "),e._l(e.payments,function(n){return t("option",{key:n.id,domProps:{value:n.id}},[e._v("\n                  "+e._s(n.name)+"\n                ")])})],2)],1)],1)],1)],1)],1)],1),e._v(" "),t("section",[t("b-table",{attrs:{bordered:"",striped:"",hover:"","show-empty":"","empty-text":"アイテムが見つかりませんでした",items:e.filtered(),fields:e.fields},scopedSlots:e._u([{key:"currency",fn:function(n){return[e._v("\n        "+e._s(e.resolve("currencies","symbol",n.item.currency).name)+"\n      ")]}},{key:"website",fn:function(n){return[t("a",{attrs:{href:n.item.url,target:"_blank"}},[e._v(e._s(n.item.name))])]}},{key:"frequency",fn:function(n){return[e._v("\n        "+e._s(e.readable(n.item.frequency))+"\n      ")]}},{key:"payment",fn:function(n){return[""===e.resolve("payments","id",n.item.payment).url?[e._v("\n          "+e._s(e.resolve("payments","id",n.item.payment).name)+"\n        ")]:[t("a",{attrs:{href:e.resolve("payments","id",n.item.payment).url,target:"_blank"}},[e._v("\n            "+e._s(e.resolve("payments","id",n.item.payment).name)+"\n          ")])]]}},{key:"minimumAmount",fn:function(n){return[e._v("\n        "+e._s(e.minimumAmount(n.item))+"\n      ")]}},{key:"price",fn:function(n){return[e._v("\n        "+e._s(e.pricing(n.item))+"\n      ")]}}])})],1)])},o=[],r={render:a,staticRenderFns:o};n.a=r},ZpWT:function(e,n,t){"use strict";var a=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("b-navbar",{attrs:{toggleable:"md",type:"dark",variant:"dark",fixed:"top"}},[t("b-container",[t("b-nav-toggle",{attrs:{target:"nav_collapse"}}),e._v(" "),t("b-navbar-brand",{attrs:{to:"/"}},[e._v("mochizuki.moe")]),e._v(" "),t("b-collapse",{attrs:{"is-nav":"",id:"nav_collapse"}},[t("b-nav",{staticClass:"ml-auto",attrs:{"is-nav-bar":""}},[t("b-nav-item",{attrs:{to:"/about"}},[e._v("About")]),e._v(" "),t("b-nav-item",{attrs:{href:"https://github.com/mika-f/crypto-faucets/",target:"_blank"}},[e._v("GitHub")])],1)],1)],1)],1)},o=[],r={render:a,staticRenderFns:o};n.a=r},Zs8U:function(e,n,t){"use strict";n.a={name:"About",data:function(){return{frequency:{fields:{label:{label:"表記"},desc:{label:"説明"}},items:[{label:"時間表記 (例: 1 hour, 15 min)",desc:"表記されている時間が経過することで、一定量の暗号通貨をもらうことができます。"},{label:"Generate",desc:"時間経過によって、もらえる暗号通貨の量が増加します。"}]},payment:{fields:{label:{label:"表記"},desc:{label:"説明"}},items:[{label:"Direct",desc:"入力したアドレスに対して、直接暗号通貨が送信されます。通常、他の蛇口に比べて高額で、手数料も無料です。"},{label:"Pooling",desc:"一定量貯まるまで、サイト側でプールされます。一定量貯めることで、引き出すことが可能です。手数料がかかることがあります。"}]}}}}},aiZq:function(e,n,t){"use strict";var a=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("b-container",[t("footer",[t("p",[e._v("\n      仮想通貨, 暗号通貨や蛇口の追加, 削除は、\n      "),t("a",{attrs:{href:"https://github.com/mika-f/crypto-faucets/"}},[e._v("GitHub リポジトリ")]),e._v("\n      まで\n    ")]),e._v(" "),t("p",[e._v("\n      コンタクト:\n      "),t("a",{attrs:{href:"https://twitter.com/MikazukiFuyuno"}},[e._v("@MikazukiFuyuno")]),e._v("\n      寄付:\n      "),t("a",{attrs:{href:"https://mochizuki.moe/donation/"}},[e._v("こちら")])]),e._v(" "),t("p",[e._v("\n      Copyright © 2017 mochizuki.moe.\n    ")])])])},o=[],r={render:a,staticRenderFns:o};n.a=r},c27y:function(e,n,t){"use strict";function a(e){t("iARi")}var o=t("Zs8U"),r=t("w6lz"),i=t("VU/8"),c=a,u=i(o.a,r.a,!1,c,"data-v-7b9ad5fe",null);n.a=u.exports},cxvo:function(e,n){e.exports=[{name:"AllInFaucet",frequency:60,payment:"Pooling",url:"http://namuyan.dip.jp/all_in_faucet.php",min:0}]},dBjI:function(e,n,t){"use strict";var a=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"root"},[t("l-header"),e._v(" "),e._t("default"),e._v(" "),t("l-footer")],2)},o=[],r={render:a,staticRenderFns:o};n.a=r},enQ5:function(e,n){e.exports=[{name:"AllInFaucet",frequency:60,payment:"Pooling",url:"http://namuyan.dip.jp/all_in_faucet.php",min:0}]},fyf8:function(e,n){},h5P2:function(e,n){e.exports=[{frequency:60,name:"DASH-Faucet.com",payment:"FaucetHub",url:"https://dash-faucet.com/?r=XinqrYP4KD3vxFhuEniqkwa6GPRayhriqU"},{frequency:60,name:"Free DASH from the DASH Faucet!",payment:"Pooling",url:"http://dashfaucet.net/ref/XrTP5SXkzqDuwcEcdSfDASxoqU2ops9RjS",min:2e-4},{frequency:5,name:"xFaucet",payment:"FaucetHub",url:"https://www.xfaucet.net/dashcoin/?r=XinqrYP4KD3vxFhuEniqkwa6GPRayhriqU"}]},hX8c:function(e,n){e.exports=[{frequency:60,name:"DOGE-Faucet.com",payment:"FaucetHub",url:"https://doge-faucet.com/?r=DU2g1zeQbmhXdFzx3vzSFGbkuwzduVas85"},{frequency:60,name:"FreeDoge.co.in",payment:"Pooling",url:"https://freedoge.co.in/?r=1294087",min:200},{frequency:0,name:"Moon Dogecoin",payment:"CoinPot",url:"http://moondoge.co.in/?ref=22948157f96d"},{frequency:5,name:"xFaucet",payment:"FaucetHub",url:"https://www.xfaucet.net/dogecoin/?r=DU2g1zeQbmhXdFzx3vzSFGbkuwzduVas85"}]},iARi:function(e,n){},"ik/t":function(e,n,t){"use strict";function a(e){t("y2Wf")}var o=t("RGWY"),r=t("dBjI"),i=t("VU/8"),c=a,u=i(o.a,r.a,!1,c,null,null);n.a=u.exports},jjcZ:function(e,n){e.exports=[{name:"NEM mainnet Faucet",frequency:240,payment:"Pooling",url:"http://namuyan.dip.jp/nem/mainnet_nodb/",min:5}]},k5Nm:function(e,n){},pRrM:function(e,n){e.exports=[{frequency:360,name:"Monacoin Station",payment:"Pooling",url:"https://faucet.mona-coin.org",min:.002},{frequency:1440,name:"Space Space Faucets",payment:"Direct",url:"http://utyuu.space/spacespace-faucet/"},{frequency:1440,name:"しがないふぉーせっと",payment:"Direct",url:"http://shiganaifaucet.chocottokozukai.click/"},{frequency:30,name:"しがないふぉーせっと2",payment:"Pooling",url:"http://shiganaifaucet.chocottokozukai.click/faucet2/",min:1},{frequency:10,name:"しがないふぉーせっと3",payment:"Pooling",url:"http://www.shiganaicontents.ga/faucet3/",min:.1},{name:"AllInFaucet",frequency:60,payment:"Pooling",url:"http://namuyan.dip.jp/all_in_faucet.php",min:.01}]},sDKM:function(e,n,t){"use strict";var a=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{attrs:{id:"app"}},[t("container",[t("router-view")],1)],1)},o=[],r={render:a,staticRenderFns:o};n.a=r},sROK:function(e,n){e.exports=[{frequency:1440,name:"SA BitZeny Faucet",payment:"Direct",url:"http://shiganairingozeny.chocottokozukai.click/bitzeny/faucet_top.php"},{name:"AllInFaucet",frequency:60,payment:"Pooling",url:"http://namuyan.dip.jp/all_in_faucet.php",min:.1}]},tBSM:function(e,n,t){"use strict";function a(e){t("fyf8")}var o=t("Ryrf"),r=t("Yk23"),i=t("VU/8"),c=a,u=i(o.a,r.a,!1,c,"data-v-12daecc4",null);n.a=u.exports},teIl:function(e,n,t){"use strict";var a=t("HCTz"),o=t("ZpWT"),r=t("VU/8"),i=r(a.a,o.a,!1,null,null,null);n.a=i.exports},w6lz:function(e,n,t){"use strict";var a=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("b-container",[t("section",[t("h2",[e._v("このサイトについて")]),e._v(" "),t("p",[e._v("\n      このサイトは、仮想通貨・暗号通貨のフォーセット(蛇口)へのリンクを纏めた物です。 日本製の通貨を中心に掲載しています。\n    ")])]),e._v(" "),t("section",[t("h3",[e._v("フォーセット (蛇口) とは？")]),e._v(" "),t("p",[e._v("\n      無料で Bitcoin や Monacoin がもらえるサイトの事です。一定の条件を満たす (広告を見るなど) ことで、少額の暗号通貨を無料でもらうことが出来ます。 基本的には広告収入によって成り立っていますが、 Monacoin などでは、運営者の善意によって配布されていることがあります。\n    ")])]),e._v(" "),t("section",[t("h3",[e._v("支払い間隔について")]),e._v(" "),t("p",[e._v("\n      当サイトにて表記している支払い間隔について、以下の分類をしています。\n    ")]),e._v(" "),t("b-table",{attrs:{bordered:"",items:e.frequency.items,fields:e.frequency.fields}})],1),e._v(" "),t("section",[t("h3",[e._v("支払い方法について")]),e._v(" "),t("p",[e._v("\n      当サイトにて表記している支払い方法にについて、サイト名に加えて以下の2種類の表記があります。 なお、サイト名が表記されている場合においても、支払い方法は Pooling と同様です。\n    ")]),e._v(" "),t("b-table",{attrs:{bordered:"",items:e.payment.items,fields:e.payment.fields}})],1)])},o=[],r={render:a,staticRenderFns:o};n.a=r},xJD8:function(e,n,t){"use strict";var a=t("ik/t");n.a={name:"app",components:{container:a.a}}},xLvj:function(e,n){e.exports=[{name:"Bitcoin",symbol:"BTC"},{name:"BitZeny",symbol:"ZNY"},{name:"DASH",symbol:"DASH"},{name:"Dogecoin",symbol:"DOGE"},{name:"Litecoin",symbol:"LTC"},{name:"Nekonium",symbol:"NUKO"},{name:"Monacoin",symbol:"MONA"},{name:"Kumacoin",symbol:"KUMA"},{name:"FujiCoin",symbol:"FJC"},{name:"Sha1coin",symbol:"SHA1"},{name:"NEM",symbol:"XEM"}]},y2Wf:function(e,n){}},["NHnr"]);
//# sourceMappingURL=app.5d980aeb91047f9a3e27.js.map