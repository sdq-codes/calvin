(this.webpackJsonp=this.webpackJsonp||[]).push([[283],{3807:function(t,e,r){t.exports={}},5092:function(t,e,r){"use strict";r(3807)},5259:function(t,e,r){"use strict";r.r(e);var n=r(14),o=r(8),l=r(2849),c=Object(n.b)({components:{TraderCard:l.a},setup(){const t=Object(n.o)([]),e=Object(n.a)((()=>{const e=[],r=t.value.length/3;for(let i=0;i<r;i++)e.push([t.value[3*i],t.value[3*i+1],t.value[3*i+2]]);return e})),r=Object(n.o)(!0);return Object(n.k)((()=>{(async()=>{var e;r.value=!0;const n=await Object(o.a)({url:"/gw-api/contract-tiger/forward/v1/ifcontract/copy/trade/masters/top",method:"get",params:{page_size:12,page:1,type:2,trend_days:30}});null!=n&&n.success&&(r.value=!1,t.value=(null==n||null===(e=n.data)||void 0===e?void 0:e.roi)||[])})()})),{loading:r,traderList:t,listOf3:e}}}),d=(r(5092),r(6)),component=Object(d.a)(c,(function(){var t,e=this,r=e._self._c;e._self._setupProxy;return r("div",{staticClass:"earn-wrapper"},[r("h3",{staticClass:"head"},[e._v("\n    "+e._s(e.$t("index.copy_trading_wrapper.title_1"))+"\n    "),r("div",{staticClass:"subtitle"},[e._v("\n      "+e._s(e.$t("index.copy_trading_wrapper.title_2"))+"\n    ")])]),e._v(" "),r("el-carousel",{directives:[{name:"show",rawName:"v-show",value:null===(t=e.listOf3)||void 0===t?void 0:t.length,expression:"listOf3?.length"}],staticClass:"banner",attrs:{autoplay:!1,height:"400px","indicator-position":"outside",interval:5e5}},e._l(e.listOf3,(function(t,n){return r("el-carousel-item",{key:n,staticStyle:{"padding-top":"50px","box-sizing":"border-box"},attrs:{height:330}},[r("div",{staticClass:"trader-list"},e._l(t,(function(t){return r("TraderCard",{key:t.account_id,attrs:{prefix:"index.copy_trading_wrapper","trader-data":t},on:{unfollow:function(t){return e.getTraderList()}}})})),1)])})),1),e._v(" "),r("div",{staticClass:"trader-list banner2"},e._l(e.traderList,(function(t){return r("TraderCard",{key:t.account_id,attrs:{prefix:"index.copy_trading_wrapper","trader-data":t},on:{unfollow:function(t){return e.getTraderList()}}})})),1),e._v(" "),r("nuxt-link",{staticClass:"more",attrs:{to:"/futures-copy-trading"}},[r("span",[e._v(e._s(e.$t("index.copy_trading_wrapper.more")))]),e._v(" "),r("i",{staticClass:"icon-more iconfont"},[e._v("")])])],1)}),[],!1,null,"35aebd77",null);e.default=component.exports}}]);