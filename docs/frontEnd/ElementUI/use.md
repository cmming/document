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
