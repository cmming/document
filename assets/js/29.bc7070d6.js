(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{316:function(t,e,n){"use strict";n.r(e);var i={props:{tab:{type:String,default:""},category:{type:String,default:""}},methods:{getList(t,e){if(!t)return[];const n=this.$site.themeConfig.sidebar;for(let i of Object.keys(n))if(i===`/${t}/`){const t=n[i];for(let n of t){if(!(n instanceof Object)||n.title!==e)continue;const t=n.children;if(t&&t.length>0)return t}}return[]}},computed:{list(){return this.getList(this.tab,this.category)}}},r=n(10),s=Object(r.a)(i,(function(){var t=this,e=t._self._c;return e("ul",t._l(t.list,(function(n,i){return e("li",{key:i},[e("a",{attrs:{href:n[0]+".html"}},[t._v(t._s(n[1]))])])})),0)}),[],!1,null,null,null);e.default=s.exports}}]);