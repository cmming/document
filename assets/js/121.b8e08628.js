(window.webpackJsonp=window.webpackJsonp||[]).push([[121],{413:function(t,s,a){"use strict";a.r(s);var n=a(10),e=Object(n.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h2",{attrs:{id:"跟新neo4j-节点-cql"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#跟新neo4j-节点-cql"}},[t._v("#")]),t._v(" 跟新neo4j 节点 cql")]),t._v(" "),s("div",{staticClass:"language-sql extra-class"},[s("pre",{pre:!0,attrs:{class:"language-sql"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("MATCH")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("n:Person"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("WHERE")]),t._v(" n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("name "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Tom Hanks'")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("SET")]),t._v(" n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("age "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("60")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("RETURN")]),t._v(" n\n\n\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("MATCH")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("n:"),s("span",{pre:!0,attrs:{class:"token identifier"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("`")]),t._v("Person"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("`")])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("WHERE")]),t._v(" n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("name "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Tom Hanks'")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("SET")]),t._v(" n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("age "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("60")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("RETURN")]),t._v(" n\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("-- 删除一个点相关的所有点")]),t._v("\n\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("MATCH")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("r"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("m "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("WHERE")]),t._v(" n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("name "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Tom Hanks'")]),t._v(" DETACH "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("DELETE")]),t._v(" n\n\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("-- 删除所有的点")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("match")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("n:"),s("span",{pre:!0,attrs:{class:"token identifier"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("`")]),t._v("fa107e8d4897497d80b6aff9afa42c20"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("`")])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("  detach "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("delete")]),t._v(" n\n\n")])])]),s("p",[t._v("docker run -d --name neo4j --publish=7474:7474 --publish=7687:7687 --volume=$HOME/neo4j/data:/data -e MAIN_CLASS=MAIN_CLASS neo4j")]),t._v(" "),s("p",[t._v("docker-compose up -d web --sacle web=3")]),t._v(" "),s("p",[t._v("tar -czvf kg.hbztb.tar.gz  --exclude='"),s("em",[t._v(".pdf' --exclude='")]),t._v('.log\' --exclude=".jar" ./kg.hbztb')]),t._v(" "),s("p",[t._v("tar -czvf kg.parent.tar.gz  --exclude='"),s("em",[t._v(".pdf' --exclude='")]),t._v('.log\' --exclude=".tar" ./kg.parent')]),t._v(" "),s("p",[t._v("git pull origin dev_hbztb")])])}),[],!1,null,null,null);s.default=e.exports}}]);