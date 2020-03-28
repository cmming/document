## 自我测试

### html

1. h5新增的标签有哪些？

```
1. 布局相关的有header footer aside nav
2. 进度 progress
3. 多媒体 video 视频 ；audio定义声音
4. canvas 由于绘制图表，减小dom开销
```

2. 为什么要加强语义化？
```
好处：
1. 便于开发者理解代码结构，
2. 方便网络抓包,有利于爬虫抓包，提升网站的权重
```

3. 行内元素，块级元素有那些？有什么不同？

```
行内元素：span display:inline
设置宽度width 无效。
设置高度height 无效，可以通过line-height来设置。
设置margin 只有左右margin有效，上下无效。
设置padding 只有左右padding有效，上下则无效。注意元素范围是增大了，但是对元素周围的内容是没影响的。
```

4. HTML页面加载完成后，会触发那个事件？onready还是onload
```
1.onready在dom元素结构完成就会执行，onload会在图片等资源完全加载完之后才执行；
2.编写个数不同，onready有多少执行多少，onload只会执行最后一个
3.简化写法window.onload没有简化写法，$(document).ready(function(){})可以简化写成$(function(){});
```

### css

5. 水平 垂直 居中


```html
<p>absolute + 负margin</p>
<div style="border: 1px solid red; width: 300px; height: 300px;position: relative;">
    <div
        style="border: 1px solid black; width: 100px; height: 100px;position: absolute;left: 50%; top: 50%;margin-left: -50px;margin-top: -50px;">
    </div>
</div>
```
<p>absolute + 负margin</p>
<div style="border: 1px solid red; width: 300px; height: 300px;position: relative;">
    <div
        style="border: 1px solid black; width: 100px; height: 100px;position: absolute;left: 50%; top: 50%;margin-left: -50px;margin-top: -50px;">
    </div>
</div>

```html
<p>absolute + margin auto</p>
<div style="border: 1px solid red; width: 300px; height: 300px;position: relative;">
    <div
        style="border: 1px solid black; width: 100px; height: 100px;position: absolute; top:0;left: 0;right: 0;bottom: 0; margin: auto;">
    </div>
</div>
```

<p>absolute + margin auto</p>
<div style="border: 1px solid red; width: 300px; height: 300px;position: relative;">
    <div
        style="border: 1px solid black; width: 100px; height: 100px;position: absolute; top:0;left: 0;right: 0;bottom: 0; margin: auto;">
    </div>
</div>

```html
<p>flex flex容器中margin auto会自动吸收额外空间</p>
<div style="display: flex;border: 1px solid red;width: 300px; height: 300px;">
    <div style="margin: auto;border: 1px solid black;width: 100px; height: 100px;"></div>
</div>
```

<p>flex flex容器中margin auto会自动吸收额外空间,宽度不固定</p>
<div style="display: flex;border: 1px solid red;width: 300px; height: 300px;">
    <div style="margin: auto;border: 1px solid black;">cecee</div>
</div>

```html
 <p>css table:宽高不固定</p>
<div style="border: 1px solid red;width: 300px; height: 300px;display:table-cell;text-align: center;vertical-align: middle;">
    <div style="display: inline-block;">css table</div>
</div>
```
 <p>css table</p>
<div style="border: 1px solid red;width: 300px; height: 300px;display:table-cell;text-align: center;vertical-align: middle;">
    <div style="display: inline-block;">css table</div>
</div>


方法	居中元素定宽高固定	PC兼容性	移动端兼容性

absolute + 负margin	是	ie6+, chrome4+, firefox2+	安卓2.3+, iOS6+

absolute + margin auto	是	ie6+, chrome4+, firefox2+	安卓2.3+, iOS6+

absolute + calc	是	ie9+, chrome19+, firefox4+	安卓4.4+, iOS6+

absolute + transform	否	ie9+, chrome4+, firefox3.5+	安卓3+, iOS6+

writing-mode	否	ie6+, chrome4+, firefox3.5+	安卓2.3+, iOS5.1+

lineheight	否	ie6+, chrome4+, firefox2+	安卓2.3+, iOS6+

table	否	ie6+, chrome4+, firefox2+	安卓2.3+, iOS6+

css-table	否	ie8+, chrome4+, firefox2+	安卓2.3+, iOS6+

flex	否	ie10+, chrome4+, firefox2+	安卓2.3+, iOS6+

grid	否	ie10+, chrome57+, firefox52+	安卓6+, iOS10.3+

[10种水平垂直居中对齐方式](https://www.jianshu.com/p/907f99004c3e)

简单总结:
PC端有兼容性要求，宽高固定，推荐absolute + 负margin
PC端有兼容要求，宽高不固定，推荐css-table
PC端无兼容性要求，推荐flex
移动端推荐使用flex


6. 清楚浮动

```css
clear:both;

伪类： :after{ display:table; comtent: ''; clear:both }

父元素设置 overflow:hidden
```

7. 高度自适应

```
可以使用vh，去控制高度的自适应
```


### js

7. apply call bind 区别

```
相同：都是用来改变函数this的指向
区别：1. apply与call相似，不同之处在于传递给方法的参数形式不一致。apply传递给方法的参数是数组的形式。
        当你的参数是明确知道数量时用 call。而不确定的时候用apply，然后把参数push进数组传递进去。当参数数量不确定时，函数内部也可以通过 arguments这个数组来遍历所有的参数。
     2. call和apply在改变方法的this指向时，会同时执行方法；而bind不会执行方法，而是返回改变this指向后的新方法。会创建一个新函数，称为绑定函数
```

8. 闭包是什么及优缺点？举例。用let怎么实现？

```
闭包：内部函数还可以继续访问外部函数的属性和方法的函数；闭包可以简单理解成“定义在一个函数内部的函数“。在本质上，闭包是将函数内部和函数外部连接起来的桥梁。
作用： 1. 可以读取函数内部的变量；2.让这些变量的值始终保持在内存中。
缺点： 1. 由于闭包会使得函数中的变量都被保存在内存中，内存消耗很大，所以不能滥用闭包，否则会造成网页的性能问题；解决方法是，在退出函数之前，将不使用的局部变量全部删除。
      2. 闭包会在父函数外部，改变父函数内部变量的值。所以，如果你把父函数当作对象（object）使用，把闭包当作它的公用方法（Public Method），把内部变量当作它的私有属性（private value），这时一定要小心，不要随便改变父函数内部变量的值。
```
```js
// 闭包demo
function outer(x) {
// 参数相当于局部的变量
  function inner(y) {
    console.log(x + y);
  }
  return inner;
}
var closure = outer(3);

closure(7); // 输出10
// inner函数把自己内部的语句，和自己在声明时所处的作用域一起封装成了一个密闭的环境，我们就称之为闭包。
// 函数本身就是一个闭包，函数在定义的时候，就能记住自己的外部环境和内部语句，每次执行的时候，会参考定义时的密闭环境。

// let 实现闭包

for(let i = 0 ; i < 10 ; i++){
  setTimeout(()=>{
    console.log(i); // 0 - 9
    console.log(this.i); // undefined
  });
}
// 如果是用的var i，那么很明显会输出20个10，但是用let 就会输出0 - 9和undefined了，
// 因为let会形成一个块级作用域（作用死域），且不会存在变量提升，而setTimeout的this永远绑定window，所以this里是找不到作为全局变量的i的。

// 自执行函数
for(var i = 0 ; i < 10 ; i++){
  (function(i){
    setTimeout(()=>{
        console.log(i);
    });
  })(i);
}
 
```

9. js基本数据类型

```
5中数据类型：number string Boolean undefind null symbol(独一无二的值，ES6); 如果是es6就再加一个类型
3大引用类型：Object Array Function
```

10. null和undefined区别：

```
undefined是声明完变量没有对其进行初始化值；null是表示空值，对其做typeof ，得到的是object，是一个特殊的对象
```

11. 如何判断数据类型

```
5个基本数据类型使用 typeof 
3个引用类型使用 instaceOf  使用 demo: [1] instanceof Object // true

Object.prototype.toString.call(1)，返回值回事 [Obect, type],无论是基础数据类型，还是引用类型
```

12. 对象遍历

```
1. for in
2. Object.values(obj)  Object.keys(obj)
3. 使用Object.getOwnPropertyNames(obj)

const obj = {
  id:1,
  name:'zhangsan',
  age:18
}
Object.getOwnPropertyNames(obj).forEach(function(key){
  console.log(key+ '---'+obj[key])
})
```

13. 事件委托是什么

```
利用事件冒泡机制指定一个事件处理程序，来管理某一类型的所有事件。即：利用冒泡的原理，把事件加到父级上，触发执行效果。
```
[js 里事件委托](https://www.jianshu.com/p/38d9cb5d1ac2)

14. 可用parseInt和Math.round变为整数,区别

```
parseInt()直接舍去小数部分
Math.round()四舍五入
```

### es6

15. const let var 生命变量的区别

```
const是定义一个常量，定义后值无法改变，不存在变量声明提升，有暂时性死区；

let是定义局部变量，定义块级作用域的变量，不存在变量声明提升，有暂时性死区；

var是定义变量，存变量声明提升；
```

16. es6新特性

```
1. 变量声明的关键字 const let 
2. 新的数据检测api proxy
3. 反射函数
4. 箭头函数
5. 新增的数据类型
6. promise和 ansy await
```

17. js异步回调Async/Await与Promise区别

```
Promise代码完全都是Promise的API（then、catch等等），操作本身的语义反而不容易看出来,
async / await函数的实现最简洁，最符合语义，几乎没有语义不相关的代码
async / await 函数就是 Generator 函数的语法糖
```

18. promise异常捕获

```
1. 如果是一个就直接使用 catch
2. 如果是多级的，第一种单独对 .then() 中指定异常处理函数（第一种一般用在，希望捕获异常然后不影响接下里Promise的执行）

3. 如果是链式的就直接在 then 里面写连个函数，第二个函数就能够捕获异常

```


### vue

18. vue 生命周期

```
8个生命周期

beforecreate()

created()；此时data和methods已经被初始化，如果要调用data中的数据或methods中的方法，最早可以在created中调用；

beforemounte(),此时页面在内存中已被加载完成，及虚拟DOM树，但还未加挂载得到页面上，页面仍是旧的；

mounted(),此时vue实例完成里初始化阶段，进入运行阶段；
beforeupdate(),此时，数据已经发生修改，但是页面上的数据还未修改，内存中的数据和页面的数据费保持同步；

updated(),两者保持同步；

beforedestore(),销毁前夕，数据和方法仍可用；

destored()

```

19. v-if 和 v-show 之间的区别是什么？

```
v-if是条件渲染，根据值决定是否渲染；
v-show是条件展示，都会进行渲染，根据值决定是否展示出；
v-if具有较高的切换渲染消耗，v-show具有较高的初始渲染消耗

```

20. Vue里面父子组件怎么传值？兄弟组件是怎么传值的？

```
父->子 用 v-bind 引用子组件进行绑定，在子组件中使用props进行获取参数
子->父 使用 父组件通过v-on @进行事件绑定，来接收参数；子组件使用emit进行数据返回
```

21. computed和watch 区别

```
computed:1.再次加载页面后会重新调用函数，支持数据缓存；2.当有异步操作的时，无法监听数据的变化无效
watch:1.再次加载页面后会重新调用函数，不支持数据缓存；2.支持异步。
```

22. vue数据响应式的原理

```
1. 递归需要监听对象上的所用属性，使用Object.defineProperty()进行数据劫持。
2. 如有变动可拿到最新值并通知订阅者
3、实现一个指令解析器Compile，对每个元素节点的指令进行扫描和解析，根据指令模板替换数据，以及绑定相应的更新函数
4、实现一个Watcher，作为连接Observer和Compile的桥梁，能够订阅并收到每个属性变动的通知，执行指令绑定的相应回调函数，从而更新视图
```
[剖析Vue原理&实现双向绑定MVVM](https://segmentfault.com/a/1190000006599500?utm_source=tag-newest)


23. 什么情况下会用created，mounted

```
created：实例创建完成，包括data和method ，用于初始化页面数据
mounted：dom元素已经被挂载，能够操作dom元素。根据数据操作页面的元素。
```

24. 页面的数据请求在生命周期中的哪个阶段？

```
第一次加载就在created
如果页面加载完成后，就在mounted
```

25. 路由传参的传参数的方式

```
1. 命名路由搭配params，刷新页面数据会丢失
2. 查询参数搭配query，刷新数据不会丢失
3. 接受参数使用this.$router后面就是搭配路由的名称就能获取到参数的值
```