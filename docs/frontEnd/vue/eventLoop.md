## 事件循环机制

1. 执行一个宏任务（首次执行的主代码块或者任务队列中的回调函数）

2. 执行过程中如果遇到微任务，就将它添加到微任务的任务队列中

3. 宏任务执行完毕后，立即执行当前微任务队列中的所有任务（依次执行）

4. JS引擎线程挂起，GUI线程执行渲染

5. GUI线程渲染完毕后挂起，JS引擎线程执行任务队列中的下一个宏任务

```html
<body>
    <div class="outer">
        <div class="inner"></div>
    </div>
</body>

<script>
    let inner = document.querySelector('.inner')
    let outer = document.querySelector('.outer')

    // 监听outer元素的attribute变化
    new MutationObserver(function() {
        console.log('mutate')
    }).observe(outer, {
        attributes: true
    })

    // click监听事件
    function onClick() {

        setTimeout(function() {
            console.log('timeout')
        }, 0)

        console.log('click')

        outer.setAttribute('data-random', Math.random())
        
        Promise.resolve().then(function() {
            console.log('promise')
        })

    }

    inner.addEventListener('click', onClick)

    outer.addEventListener('click', onClick)
</script>



// 输出结果 
click
mutate
promise
timeout

```

## nextclick


> 原理： Promise -> MutationObserver -> setImmediate -> setTimeout；

1. 提快响应速度。
2. 无需等待UI渲染完成才进行nextTick的回调函数操作。
3. JS引擎线程和GUI渲染线程之间来回切换，等待GUI渲染线程的过程中，浏览器势必要消耗性能。线程频繁切换会导致性能问题。





## 参考文章

[Vue源码分析 - nextTick](https://github.com/ziyi2/ziyi2.github.io/issues/5)
[Tasks, microtasks, queues and schedules（译）](https://segmentfault.com/a/1190000014812771?utm_source=channel-hottest)