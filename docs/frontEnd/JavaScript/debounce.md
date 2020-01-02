## 防抖

> 每次触发都会取消之前的延迟调用。使用场景：一个带搜索功能的输入框，当用户输入值500ms后才会去请求接口数据，在500ms内再次输入，就不发送请求

### 实现

> 1.首次是否立即执行 2.带取消函数

```js

function debounce(func, wait, immediate){
    var timeout, result

    var debounced = function () {
        var args = this
        var context = arguments
        
        if(timeout){
            // 清空掉还来不及执行的函数
            clearTimeout(timeout)
        }
        // 立即执行
        if(immediate){
            var callNow = !timeout
            // 第一次是立即执行，后面必须间隔 指定时间后才能执行
            timeout = setTimeout(function(){
                timeout = null
            }, wait)
            if(callNow){
                // 保持上下文的 this一致
                func.apply(context, args)
            }
        }else{
            timeout = setTimeout(function(){
                func.apply(context, args)
            }, wait)
        }

        return result
    }
    // 取消也就是清空定时器和将timeout设置为null
    debounced.cancel = function () {
        clearTimeout(timeout)
        timeout = null
    }
    

    return debounced
}


// 调用
function test(e){
    console.log('防抖', e)
}
var debounceInstance = debounced(test, 500, false)

document.getElementById('test').onmousemove = debounceInstance
document.getElementById('test').onclick = function(){
    action.cancel()
}

```


## 节流

> 如果你持续触发事件，每隔一段时间，只执行一次事件。关于节流的实现，有两种主流的实现方式，一种是使用时间戳，一种是设置定时器。


### 时间戳

> 使用时间戳，当触发事件的时候，我们取出当前的时间戳，然后减去之前的时间戳(最一开始值设为 0 )，如果大于设置的时间周期，就执行函数，然后更新时间戳为当前的时间戳，如果小于，就不执行。


```js
function throttle(func, wait) {
    var context, args;
    var previous = 0;

    return function() {
        var now = +new Date();
        context = this;
        args = arguments;
        if (now - previous > wait) {
            func.apply(context, args);
            previous = now;
        }
    }
}
```

### 使用定时器

>  触发事件的时候创建一个定时器，如果定时器存在就不执行，直到定时器执行，然后执行函数，清空定时器。（表现为n 秒后第一次执行）

```js
function throttle(func, wait) {
    var timeout
    return function() {
        var context = this
        var args = arguments
        if (!timeout) {
            timeout = setTimeout(function() {
                timeout = null
                func.apply(context, args)
            }, wait);
        }
    }
}
```

### 优化版本

> 鼠标移入能立刻执行，停止触发的时候还能再执行一次！

```js
//  leading：false 和 trailing: false 不能同时设置。
// 如果同时设置的话，比如当你将鼠标移出的时候，因为 trailing 设置为 false，停止触发的时候不会设置定时器，
// 所以只要再过了设置的时间，再移入的话，就会立刻执行，就违反了 leading: false，bug 就出来了，所以，这个 throttle 只有三种用法：
function throttle (func, wait, options) {
    var previous = 0
    var timeout
     if (!options) options = {};

    var throttled = function () {
        var now = +new Date()
        if (!previous && options.leading === false) previous = now;
        var remaining = wait - (now - previous)
        
        var context = this
        var args = arguments

        if(remaining <= 0){
            if(timeout){
                clearTimeout(timeout)
                timeout = null
            }

            previous = now
            func.apply(context, args)
        } else if (!timeout){
            timeout = setTimeout(function(){
                previous = options.leading === false ? 0 : new Date().getTime();
                timeout = null
                func.apply(context, args)
                // ?
                if (!timeout) context = args = null;
            },wait)
        }
    }
}
```


## 参考文档
[JavaScript专题之跟着underscore学防抖](!https://github.com/mqyqingfeng/Blog/issues/22)

[JavaScript专题之跟着 underscore 学节流](!https://github.com/mqyqingfeng/Blog/issues/26)


