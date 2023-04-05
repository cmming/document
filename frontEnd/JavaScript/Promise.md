## prommise

### 含义

>Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。它由社区最早提出和实现，ES6 将其写进了语言标准，统一了用法，原生提供了Promise对象。
>所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。


### promise.all

```js
const p1 = new Promise((resolve, reject) => {
  resolve('hello')
})
  .then(result => result)
  .catch(e => e)

const p2 = new Promise((resolve, reject) => {
  throw new Error('报错了')
})
  .then(result => result)
  .catch(e => e)

Promise.all([p1, p2])
  .then(result => console.log(result, 'then'))
  .catch(e => console.log(e, 'catch'))

// 总结 如果p2没有catch，将会在catch中捕获，有catch，就只会在then中捕获。
```