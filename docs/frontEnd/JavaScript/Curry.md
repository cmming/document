# 柯里化 Curry


## 简介

在计算机科学中，柯里化（英语：Curry），又译为卡瑞化或加里化，是

> 把接受**多个参数的函数**变换成接受一个**单一参数**（最初函数的第一个参数）的函数，并且返回**接受余下的参数而且返回结果的新函数**的技术。

简单来说，就是：只传递给函数**一部分参数**来调用它，让它**返回一个函数**去处理剩下的参数。

```javascript

var add = function(x) {
  return function(y) {
    return x + y;
  };
};

var increment = add(1);
var addTen = add(10);

increment(2);
// 3

addTen(2);
// 12

```

## 作用

柯里化有 3 个常见作用：

1. 参数复用
2. 提前返回
3. 延迟计算 / 运行

### 参数复用

这就是最基本的用法，也是前面的介绍中的例子，通过闭包的方式继续引用了声明时的第一个参数，让后面调用的时候就不需要重复使用。

### 提前返回

举一个解决兼容性的例子：

```javascript
const addEvent = function(el, type, fn, capture) {
  if (window.addEventListener) {
    el.addEventListener(type, function(e) {
      fn.call(el, e)
    }, capture)
  } else if (window.attachEvent) {
    el.attachEvent("on" + type, function(e) {
      fn.call(el, e)
    })
  }
}
```

上面代码意味着，每次添加事件的时候都会走一遍 `if...else`，其实，通过柯里化，可以做到一次判定：

```js
const addEvent = (function(){
  if (window.addEventListener) {
    return function(el, sType, fn, capture) {
      el.addEventListener(sType, function(e) {
        fn.call(el, e)
      }, (capture))
    }
  } else if (window.attachEvent) {
    return function(el, sType, fn, capture) {
      el.attachEvent("on" + sType, function(e) {
        fn.call(el, e)
      })
    }
  }
})()
```
初始 `addEvent` 的执行其实值实现了部分的应用（只有一次的 `if...else` 判定），而剩余的参数应用都是其「返回的函数」实现的，典型的柯里化。

