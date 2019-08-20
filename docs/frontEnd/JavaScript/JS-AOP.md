# Js 面向切面编程 AOP

## 简介

面向切面编程 AOP（Aspect-oriented programming）的主要作用是把一些跟核心业务逻辑模块无关的功能抽离出来，这些跟业务逻辑无关的功能通常包括日志统计、安全控制、异常处理等。

```javascript
Function.prototype.before = function(beforefn) {
	var __self = this; // 保存原函数的引用
	return function() {	 // 返回包含了原函数和新函数的"代理"函数
	  if (beforefn.apply(this, arguments) === false) { // 执行新函数，修正this
		return false; // 如果返回 false, 便会阻断下一个函数的执行
	  }
	  return __self.apply(this, arguments); // 执行原函数
	}
};

Function.prototype.after = function(afterfn) {
	var __self = this;
	return function() {
	  var ret = __self.apply(this, arguments);
	  if (ret === false) {
		return false;
	  }
	  afterfn.apply(this, arguments);
	  return ret;
	}
};

var func = function() {
    console.log(2);
};

func = func.before(function() {
    console.log(1);
}).after(function() {
    console.log(3);
});

func(); // 按顺序打印出1，2，3
```

## 应用

### 统计操作时长

```javascript

var log_time = function(fun){
    var time;

    return fun.before(function(){
        console.log(1)
        time = new Date()
    }).after(function(){
        console.log(3)
        console.log(new Date() - time)
    })
}

var timeFun = log_time(function(){
    console.log(2)
    // 用于阻断程序 产生间隔时间
    alert(1)
})

timeFun()
// 1
// 2
// 3
// 2296 

```


### 链式操作 

> 分离验证 避免 switch case 和 过多的 if else  

```javascript
//bad
function switchFun(a){
    if(a == 'a'){
        console.log('do a thing')
    }else if(a == 'b'){
        console.log('do b thing')
    }
}

switchFun('a')
//do a thing

//good
var switchFunDefault;
switchFunDefault.prototype.on = function(onfn) {
	var __self = this;
	return function() {
	  var ret = __self.apply(this, arguments);
	  if (ret) { // 如果存在对象的话则阻断调用链
		return ret;
	  }
	  onfn.apply(this, arguments);
	  return ret;
	}
};

function a(val){
    if(val == 'a'){
        console.log('do a thing')
    }
}

function b(val){
    if(val == 'b'){
        console.log('do b thing')
    }
}


switchFunDefault.on(a('a')).on(b('a'))
//do a thing


```





