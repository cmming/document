(window.webpackJsonp=window.webpackJsonp||[]).push([[101],{392:function(s,t,a){"use strict";a.r(t);var e=a(10),n=Object(e.a)({},(function(){var s=this,t=s._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h1",{attrs:{id:"自动部署"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#自动部署"}},[s._v("#")]),s._v(" 自动部署")]),s._v(" "),t("blockquote",[t("p",[s._v("利用travis-cl 对github代码的监控,然后利用密钥对进行服务器的登录,进行代码的发布")])]),s._v(" "),t("h2",{attrs:{id:"生成密钥对"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#生成密钥对"}},[s._v("#")]),s._v(" 生成密钥对")]),s._v(" "),t("div",{staticClass:"language-sh extra-class"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[s._v("ssh-keygen "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-t")]),s._v(" rsa "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-C")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"294225707@qq.com"')]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("## 输入自定的位置和名称")]),s._v("\nGenerating public/private rsa key pair.\nEnter "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("file")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("in")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("which")]),s._v(" to save the key "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("/Users/bigno/.ssh/id_rsa"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(": /Users/bigno/.ssh/id_rsa_blog "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 可以命名")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 然后 在文件夹 ~/.ssh 中会多出两个文件, ")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" .ssh/\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#将公钥内容输出到authorized_keys中")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("cat")]),s._v(" id_rsa_blog.pub "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">>")]),s._v(" authorized_keys\n")])])]),t("h2",{attrs:{id:"本地测试登录"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#本地测试登录"}},[s._v("#")]),s._v(" 本地测试登录")]),s._v(" "),t("div",{staticClass:"language-sh extra-class"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 在 ~/.ssh 中生成一个配置文件 ")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("vim")]),s._v(" config\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#文件内容为")]),s._v("\nHost "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("test")]),s._v("\nHostName "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1.1")]),s._v(".1.1"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("你的服务器ip"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#登陆的用户名")]),s._v("\nUser root\nIdentitiesOnly "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("yes")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#登陆使用的密钥")]),s._v("\nIdentityFile ~/.ssh/id_rsa_blog\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 此时将会以root 用户登录")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("ssh")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("test")]),s._v("\n")])])]),t("h2",{attrs:{id:"在linux服务器安装travis客户端工具"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#在linux服务器安装travis客户端工具"}},[s._v("#")]),s._v(" 在Linux服务器安装Travis客户端工具")]),s._v(" "),t("p",[s._v("curl -sSL https://get.rvm.io | bash -s stable\nrvm version")]),s._v(" "),t("h2",{attrs:{id:"安装ruby"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#安装ruby"}},[s._v("#")]),s._v(" 安装ruby")]),s._v(" "),t("div",{staticClass:"language-sh extra-class"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[s._v("rvm "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" ruby\nruby "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("--version")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# [修改源](http://gems.ruby-china.com/)")]),s._v("\ngem sources "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("--add")]),s._v(" https://gems.ruby-china.com/ "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("--remove")]),s._v(" https://rubygems.org/\ngem sources "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-l")]),s._v("\nhttps://gems.ruby-china.com\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 确保只有 gems.ruby-china.com")]),s._v("\n")])])]),t("h2",{attrs:{id:"安装travis命令行工具"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#安装travis命令行工具"}},[s._v("#")]),s._v(" 安装travis命令行工具")]),s._v(" "),t("div",{staticClass:"language-sh extra-class"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[s._v("gem "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" travis\n")])])]),t("h2",{attrs:{id:"添加加密的私钥至代码仓库"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#添加加密的私钥至代码仓库"}},[s._v("#")]),s._v(" 添加加密的私钥至代码仓库")]),s._v(" "),t("div",{staticClass:"language-sh extra-class"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#首先用GitHub账户登陆travis")]),s._v("\ntravis login\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 这一步建议在linux上运行 ")]),s._v("\ntravis encrypt-file ~/.ssh/id_rsa "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("--add")]),s._v("\n")])])]),t("h2",{attrs:{id:"修改配置-添加自动登录的配置文件"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#修改配置-添加自动登录的配置文件"}},[s._v("#")]),s._v(" 修改配置 添加自动登录的配置文件")]),s._v(" "),t("div",{staticClass:"language-sh extra-class"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[s._v("before_install:\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 相当于在travis 中添加配置文件 方便免密登录")]),s._v("\n- "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-e")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Host chenming.club'),t("span",{pre:!0,attrs:{class:"token entity",title:"\\n"}},[s._v("\\n")]),t("span",{pre:!0,attrs:{class:"token entity",title:"\\t"}},[s._v("\\t")]),s._v("HostName 1.1.1.1"),t("span",{pre:!0,attrs:{class:"token entity",title:"\\n"}},[s._v("\\n")]),t("span",{pre:!0,attrs:{class:"token entity",title:"\\t"}},[s._v("\\t")]),s._v("StrictHostKeyChecking no"),t("span",{pre:!0,attrs:{class:"token entity",title:"\\n"}},[s._v("\\n")]),t("span",{pre:!0,attrs:{class:"token entity",title:"\\t"}},[s._v("\\t")]),s._v('IdentityFile ~/.ssh/id_rsa_blog"')]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">>")]),s._v(" ~/.ssh/config\n\n")])])]),t("h2",{attrs:{id:"最终完成的配置文件"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#最终完成的配置文件"}},[s._v("#")]),s._v(" 最终完成的配置文件")]),s._v(" "),t("div",{staticClass:"language-sh extra-class"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[s._v("\nlanguage: node_js\nnode_js:\n- "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'10'")]),s._v("\naddons:\n  ssh_known_hosts: chenming.club\nbefore_install:\n// 解密命令 "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("in")]),s._v(" 待解秘密的文件 out 输出到 Travis服务器的文件夹\n- openssl aes-256-cbc "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-K")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$encrypted_62b781e8019c_key")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-iv")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$encrypted_62b781e8019c_iv")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-in")]),s._v(" id_rsa_blog.enc "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-out")]),s._v(" ~/.ssh/id_rsa_blog "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-d")]),s._v("\n- "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("chmod")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("600")]),s._v(" ~/.ssh/id_rsa_blog\n// 在Travis服务器中添加一个 免密的配置文件\n- "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-e")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Host chenming.club'),t("span",{pre:!0,attrs:{class:"token entity",title:"\\n"}},[s._v("\\n")]),t("span",{pre:!0,attrs:{class:"token entity",title:"\\t"}},[s._v("\\t")]),s._v("HostName 1.1.1.1"),t("span",{pre:!0,attrs:{class:"token entity",title:"\\n"}},[s._v("\\n")]),t("span",{pre:!0,attrs:{class:"token entity",title:"\\t"}},[s._v("\\t")]),s._v("StrictHostKeyChecking no"),t("span",{pre:!0,attrs:{class:"token entity",title:"\\n"}},[s._v("\\n")]),t("span",{pre:!0,attrs:{class:"token entity",title:"\\t"}},[s._v("\\t")]),s._v('IdentityFile ~/.ssh/id_rsa_blog"')]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">>")]),s._v(" ~/.ssh/config\n- "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("yarn")]),s._v(" global "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),s._v(" vuepress\ninstall:\n- "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("yarn")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v("\nscript:\n- "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("yarn")]),s._v(" docs:build\nafter_success:\n- "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" docs/.vuepress\n// 将编译后的代码复制到服务器的指定文件夹 \n- "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("scp")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-o")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("stricthostkeychecking")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("no "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-r")]),s._v(" ./dist root@chenming.club:/home/document/docker/blog-server\n// 将服务容器重新启动\n- "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("ssh")]),s._v(" root@chenming.club "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-o")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("stricthostkeychecking")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("no "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'cd /home/document/docker && docker-compose up -d --build'")]),s._v("\n\n\n")])])])])}),[],!1,null,null,null);t.default=n.exports}}]);