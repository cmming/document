## 将语言作为路由的一级

## 左侧菜单生成

根据配置文件 nav.config.js，经过 registerRoute 函数生成。

## 代码高亮

```js
// https://github.com/highlightjs/highlight.js/issues/909#issuecomment-131686186
const blocks = document.querySelectorAll('pre code:not(.hljs)');
Array.prototype.forEach.call(blocks, hljs.highlightBlock);

router.afterEach(route => {
  // https://github.com/highlightjs/highlight.js/issues/909#issuecomment-131686186
  Vue.nextTick(() => {
    const blocks = document.querySelectorAll('pre code:not(.hljs)');
    Array.prototype.forEach.call(blocks, hljs.highlightBlock);
  });
}
```


## 样式导入

> 一次性将所有的样式导入
import 'packages/theme-chalk/src/index.scss';


## 组件导入

> 一次性将所有的组件导入

import Element from 'main/index.js';



## 如何按组件模块导入

> 借助 webpack 插件 (babel-plugin-component)[https://github.com/ElementUI/babel-plugin-component]，也是ElementUI 出的的。

```js
// 将 语法进行转换
import { Button } from 'components'

// 自动导入 js 和 css 导入
require('components/lib/styleLibraryName/index.css')
var button = require('components/lib/styleLibraryName/button.css')
```
然后，将 .babelrc 修改为：

```js 
{
  "presets": [["es2015", { "modules": false }]],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
```


