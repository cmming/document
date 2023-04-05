# element ui 源码解析基础篇

> 使用了那么久的element ui,是时候开始看一下它的源码了。永远不要闭门造车。👏
> 我看的版本是 2.12.0。


## 项目结构

```
.
├── .babelrc
├── .eslintignore
├── .eslintrc
├── .git
├── .gitattributes
├── .github                                         ## 开发指南在这里，不在 readme
├── .gitignore
├── .travis.yml                                     ## 自动构建
├── CHANGELOG.en-US.md
├── CHANGELOG.es.md
├── CHANGELOG.fr-FR.md
├── CHANGELOG.zh-CN.md
├── FAQ.md                                          ## 常见问题
├── LICENSE
├── Makefile
├── README.md
├── build                                           ## 打包的脚本和配置
├── components.json
├── element_logo.svg
├── examples                                        ## 我们看到的 https://element.eleme.cn/#/ 就在这里了👇
├── node_modules
├── package.json
├── packages                                        ## 所有的组件
├── src                                             ## 对组件中会使用到的公共方法进行封装
├── test                                            ## 测试代码
├── tree.md
├── types
└── yarn.lock
```


## 先来看example

> 由于项目展示给我们的是这里面的，我就先从这里看起。这里使用的element ui是本地的，所以从这里开始，应该能找到之间的依赖，也不知错了没😀


### 文件结构

```
.
├── app.vue
├── assets
├── bus.js
├── color.js
├── components
├── demo-styles
├── docs
├── dom
├── entry.js            ## 项目入口
├── example.md
├── extension
├── favicon.ico
├── i18n
├── icon.json
├── index.tpl
├── nav.config.json
├── pages
├── play
├── play.js
├── route.config.js
├── util.js
└── versions.json
```



#### entry.js   项目入口

> 这里果然找到了 引入关系。

```js
// 第四行 所以这个main 肯定就是一个 alias （项目路径的别名了。）项目中都没有main这个文件夹，所以肯定在 webpack的配置文件中有写
import Element from 'main/index.js';
```

> 来到 build/config.js  35行 就有别名设置了，所有的路径别名就都在这里了。
```js
exports.alias = {
  // 用来给 examples 调用
  main: path.resolve(__dirname, '../src'),
  packages: path.resolve(__dirname, '../packages'),
  examples: path.resolve(__dirname, '../examples'),
  //   加引号 是由于有 特殊字符
  'element-ui': path.resolve(__dirname, '../')
};
```

### src/index.js

>  在这里就找到了该文件夹依赖于packages 文件夹里面的组件了。


