

## common js

简称： cjs

使用场景：node应用采用的模块规范。每个文件就是一个模块，有自己的作用域。在一个文件里面定义的变量、函数、类，都是私有的，对其他文件不可见。

CommonJS 特点：
所有代码都运行在模块作用域，不会污染全局作用域。
模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果。要想让模块再次运行，必须清除缓存。
模块加载的顺序，按照其在代码中出现的顺序。

值得一提的是，CommonJS 规范加载模块是同步的，也就是说，只有加载完成，才能执行后面的操作。AMD（Asynchronous Module Definition） 规范则是非同步加载模块，允许指定回调函数。由于 Node.js 主要用于服务器编程，模块文件一般都已经存在于本地硬盘，所以加载起来比较快，不用考虑非同步加载的方式，所以 CommonJS 规范比较适合。但是，如果是浏览器环境，要从服务器端加载模块，这时就必须采用非同步模式，因此浏览器端一般采用 AMD 规范



## es module

简称：es

ECMAScript 6 的一个目标是解决作用域的问题，也为了使JS应用程序显得有序，于是引进了模块。目前部分主流浏览器已原生支持ES Module，使用 type = module 指定为模块引入即可
注意：使用该方式执行 JS 时自动应用 defer 属性


## umd



UMD（Universal Module Definition）提供了支持多种风格的“通用”模式，在兼容CommonJS和AMD规范的同时，还兼容全局引用的方式
UMD实现原理很简单：

1. 先判断是否支持AMD（define 是否存在），存在则使用 AMD 方式加载模块；
2. 再判断是否支持 Node.js 模块格式（exports是否存在），存在则使用 Node.js 模块格式；
3. 前两个都不存在，则将模块公开到全局（window 或 global）

UMD 使得你可以直接使用 script 标签引用

## 参考文章
[CommonJS & UMD & ES Module](https://www.jianshu.com/p/0f9f5b1535da)

