webpackJsonp([0],{"+EIT":function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e._m(0),n("section",{staticClass:"container"},[n("div",[n("table",{staticClass:"table table-striped table-bordered"},[e._m(1),n("tbody",e._l(e.faucets,function(t,r){return n("tr",{key:r},[n("td",[e._v(e._s(e.relation("currencies",t.currency).name))]),n("td",[n("a",{attrs:{href:t.url,target:"_blank"}},[e._v("\n                "+e._s(t.name)+"\n              ")])]),n("td",[e._v("\n              "+e._s(e.time(t.frequency))+"\n            ")]),n("td",[0===t.payment||1===t.payment?[e._v("\n                "+e._s(e.relation("payment_methods",t.payment).name)+"\n              ")]:[n("a",{attrs:{href:e.relation("payment_methods",t.payment).url,target:"_blank"}},[e._v("\n                  "+e._s(e.relation("payment_methods",t.payment).name)+"\n                ")])]],2),n("td",[0===t.payment||1===t.payment?[e._v("\n                なし\n              ")]:[e._v("\n                "+e._s(e.relation("payment_methods",t.payment).min)+"\n              ")]],2)])}))])])]),e._m(2)])},c=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"container"},[n("h1",{staticClass:"title"},[e._v("\n      暗号通貨フォーセットリスト\n    ")]),n("p",[e._v("\n      暗号通貨のフォーセット(蛇口)リストです。"),n("br"),e._v(" 当サイトで得た情報によって何らかの損害を得たとしても、責任を負うことは出来ません。\n      "),n("br"),e._v(" どのフォーセットを使用するかは、あなた自身によって決めて下さい。\n    ")])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("thead",[n("tr",[n("td",[e._v("暗号通貨")]),n("td",[e._v("ウェブサイト")]),n("td",[e._v("支払い間隔")]),n("td",[e._v("支払い方法")]),n("td",[e._v("最小出金額 (BTC)")])])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("footer",[n("small",[n("a",{attrs:{href:"https://mochizuki.moe/donation"}},[e._v("Donate")]),n("br"),e._v(" Copyright © 2017 mochizuki.moe.\n    ")])])}],a={render:r,staticRenderFns:c};t.a=a},"+n04":function(e,t){e.exports={currencies:[{name:"Bitcoin",id:"BTC"},{name:"BitZeny",id:"ZNY"},{name:"DASH",id:"DASH"},{name:"Dogecoin",id:"DOGE"},{name:"Litecoin",id:"LTC"},{name:"Monacoin",id:"MONA"}],faucets:[{currency:"BTC",frequency:60,name:"Bit Fun",payment:0,url:"http://bitfun.co/?ref=6432A0FB3F81"},{currency:"BTC",frequency:15,name:"Bonus Bitcoin",payment:2,url:"http://bonusbitcoin.co/?ref=D7ED3F50E1A9"},{currency:"BTC",frequency:60,name:"BtcForEveryone.xyz",payment:2,url:"https://btcforeveryone.xyz/?r=1E4NZUSC39BEPsE1xVKVyHrBxstXdrNVM4"},{currency:"BTC",frequency:60,name:"FreeBitco.in",payment:1,url:"https://freebitco.in/?r=7713155"},{currency:"BTC",frequency:0,name:"Moon Bitcoin",payment:2,url:"http://moonbit.co.in/?ref=7a838f6cbb5c"},{currency:"BTC",frequency:5,name:"xFaucet",payment:3,url:"https://www.xfaucet.net/bitcoin/?r=1E4NZUSC39BEPsE1xVKVyHrBxstXdrNVM4"},{currency:"ZNY",frequency:1440,name:"SA BitZeny Faucet",payment:0,url:"http://shiganairingozeny.chocottokozukai.click/bitzeny/faucet_top.php"},{currency:"DASH",frequency:60,name:"DASH-Faucet.com",payment:3,url:"https://dash-faucet.com/?r=XinqrYP4KD3vxFhuEniqkwa6GPRayhriqU"},{currency:"DASH",frequency:60,name:"Free DASH from the DASH Faucet!",payment:1,url:"http://dashfaucet.net/ref/XrTP5SXkzqDuwcEcdSfDASxoqU2ops9RjS"},{currency:"DASH",frequency:5,name:"xFaucet",payment:3,url:"https://www.xfaucet.net/dashcoin/?r=XinqrYP4KD3vxFhuEniqkwa6GPRayhriqU"},{currency:"DOGE",frequency:60,name:"DOGE-Faucet.com",payment:3,url:"https://doge-faucet.com/?r=DU2g1zeQbmhXdFzx3vzSFGbkuwzduVas85"},{currency:"DOGE",frequency:60,name:"FreeDoge.co.in",payment:1,url:"https://freedoge.co.in/?r=1294087"},{currency:"DOGE",frequency:0,name:"Moon Dogecoin",payment:2,url:"http://moondoge.co.in/?ref=22948157f96d"},{currency:"DOGE",frequency:5,name:"xFaucet",payment:3,url:"https://www.xfaucet.net/dogecoin/?r=DU2g1zeQbmhXdFzx3vzSFGbkuwzduVas85"},{currency:"LTC",frequency:60,name:"Free LTC from the Litecoin Faucet!",payment:1,url:"http://litecoinfaucet.info/ref/LVfzaELameCFoEWoLQtKiBCsCUWgwkorcq"},{currency:"LTC",frequency:60,name:"Litecoin-Faucet.com",payment:3,url:"https://litecoin-faucet.com/?r=LiSmd3Pp1hCoPGPguSVCUyo1RHak5g1mcj"},{currency:"LTC",frequency:0,name:"Moon Litecoin",payment:2,url:"http://moonliteco.in/?ref=c2f750048d81"},{currency:"LTC",frequency:5,name:"xFaucet",payment:3,url:"https://www.xfaucet.net/litecoin/?r=LiSmd3Pp1hCoPGPguSVCUyo1RHak5g1mcj"},{currency:"MONA",frequency:360,name:"Monacoin Station",payment:1,url:"https://faucet.mona-coin.org"},{currency:"MONA",frequency:1440,name:"Space Space Faucets",payment:0,url:"http://utyuu.space/spacespace-faucet/"},{currency:"MONA",frequency:1440,name:"しがないふぉーせっと",payment:0,url:"http://shiganaifaucet.chocottokozukai.click/"},{currency:"MONA",frequency:30,name:"しがないふぉーせっと2",payment:1,url:"http://shiganaifaucet.chocottokozukai.click/faucet2/"},{currency:"MONA",frequency:10,name:"しがないふぉーせっと3",payment:1,url:"http://www.shiganaicontents.ga/faucet3/"}],payment_methods:[{id:0,min:0,name:"Direct",url:""},{id:1,min:0,name:"Pooling",url:""},{id:2,min:5e-4,name:"CoinPot",url:"https://coinpot.co"},{id:3,min:2e-4,name:"FaucetHub.io",url:"https://faucethub.io"}]}},"/TYz":function(e,t,n){"use strict";function r(e){n("x0nS")}Object.defineProperty(t,"__esModule",{value:!0});var c=n("/W8I"),a=n("+EIT"),u=n("VU/8"),o=r,i=u(c.a,a.a,!1,o,null,null);t.default=i.exports},"/W8I":function(e,t,n){"use strict";t.a={data:function(){return n("+n04")},methods:{relation:function(e,t){return this.$data[e].find(function(e){return e.id===t})},time:function(e){if(0===e)return"Generate";if(e>0&&e<60)return e+" min";var t=e/60;return t>1?t+" hours":t+" hour"}},head:{link:[{rel:"stylesheet",href:"https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css"}]}}},jbd8:function(e,t,n){t=e.exports=n("FZ+f")(!1),t.push([e.i,"section{padding:10px 0 20px}footer{text-align:center}",""])},x0nS:function(e,t,n){var r=n("jbd8");"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);n("rjj0")("5f29858a",r,!0)}});
//# sourceMappingURL=index.17b4d78518f48cdf2e68.js.map