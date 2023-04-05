## 特点

>特点：第3项开始，每一项都等于前两项之和。例如：1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233，377，610，987，1597


## 正常递归版本

>代码整洁，逻辑清楚；但是存在大量的重复计算;性能很差
```js
// 获取第n个斐波那契数 ，也即是斐波那契数的函数定义
function fibonacci(n) { 
if (n === 1 || n === 2) { 
    return 1
}
    return fibonacci(n - 1) + fibonacci(n - 2)
}

```



## for 循环版本
1 1 1 1

2 1 1 1

2 2 1 1

3 3 2 1

4 5 3 2
```js
function fibonacci(n){
    //
    var last = 1
    var last2 = 1
    var current = 1
    for(var i=2;i<n;i++){
        last2 = last
        last = current
        current = last + last2
    }
    return current
}
```

## 参考文章
[用js优美的写各种斐波那契数列](https://www.jianshu.com/p/78243311b8ed)