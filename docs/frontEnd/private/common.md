## HTML

 1.h5新增的标签有哪些？为什么要加强语义化？ (吉利) *3

    <header><footer><nav><article><section><video><figure>，便于开发者理解代码结构，方便网络抓包。



 2.行内元素，块级元素有内些？有什么不同？

    行内(内联)元素：< em >,< input >, < a >, < big >

    块级元素：< div >,< p >,< h >, < ul >

    不同：块级元素会独立成行，会有padding，margin等属性，



 3.第一行 ！docctype是做什么用的？

    定义该页面渲染模式，分为严格模式和混杂模式



 4.HTML页面加载完成后，会触发那个事件？onready还是onload

    onready在dom元素结构完成就会执行，onload会在图片等资源完全加载完之后才执行；onready有多少执行多少，onload只会执行最后一个



5.addEventListener能否多次给DOM对象添加监听事件？

    可以



 6.attachEvent能否删除对象的监听事件？

    不可以，删除的话用detachEvent



 7.new Date（）获取的是哪里的时间？

    PC本地的时间



## CSS

 两个子盒子分别放到父盒子的最左和最右，怎么做？ *2

    position定位：将父子元素同时使用属性absolute，子元素添加距左右边框距离；

    弹性盒子：将父盒子定义属性display: flex;justify-content: space-between;



 css3的新特性

    弹性盒子，2d 3d动画 等



 子盒子在父盒子中水平居中有哪几种方法？

    弹性盒子：父盒子display:flex; justify-content:center;

    position：子盒子margin：auto；


 子盒子的定位，如何上下居中？

    弹性盒子：父盒子display:flex; align-items：center；



 父盒子中的子盒子浮动会有什么后果？

    子盒子浮动，父盒子的高度为0，父盒子高度塌陷



 定位有哪几个属性？（）

    static, relative, fixed, absolute, sticky（最后这个有好多面试官都不知道...）

    注意它们的不同，fixed和absolute会脱离文档流



 行内块元素和行内元素的区别？

    行内块元素就是将块元素以行的形式展示出来，同时保留了块元素可以设置的css属性



 两个行内块元素同行显示时，会出现3px空白间隙，为什么？如何解决？

    这个造成原因是浏览器会把两个块元素中间的换行符解析出来，暴力解决的话就是两个div卸载同一行



 为什么要清除浮动？怎么清除浮动？

    clear:both

    :after{ display:table; comtent: ''; clear:both }



## JS



 1.闭包是什么及优缺点？举例。用let怎么实现？

    闭包就是当外部函数返回，内部函数还可以继续访问外部函数的属性和方法的函数。缺点：内存泄漏。



 2.前后端传递 **'get'**和**'post'**的区别？

    get为从服务器获取数据，post为向服务器上传数据；get会将传输数据暴露在url中，安全性略低，post则不会，但二者安全性又是同一等级；get有缓存，post无缓存；get可传递数据量小，post传递数据量大，没有限制。

 3.js的基本数据类型有哪些？（注意es6的symbol）

    string，number，bool，null，undefined，symbol（独一无二的值，ES6），

 4.null和undefined区别：
 
    undefined是声明完变量没有对其进行初始化值；null是表示空值，对其做typeof ，得到的是object，是一个特殊的对象



 5.现在有几种存储方式？（cookie，localStorage，sessionStorage）分别又有什么不同？

    Cookies会发送到服务端，其他的只会在客户端；localStorage可以长久保存整个网站的数据，sessionStorage在关闭网站之后会删除数据；存储大小不同，sessionStorage最大；存储数量不同



 6.cookie中的session的了解

    一个存储在客户端，一个存储在服务端



 7.如何判断数据类型？

    基本数据类型用typeOf，引用类型用instanceOf



 8.JS的执行机制是什么？

    单线程处理



 9.绑定DOM元素的事件有哪几种方法？

    DOM元素里直接绑定 oncilck="function"；

    在JS代码里写: element.click = function(){}

    绑定事件监听函数: addEventListener



 10.数组的常用遍历方法有哪些？（for；ES6新增）

    for, for..in.., for..of foreach, map, every, some, filter,



 11.JS的三大事件是什么？

    鼠标事件, 键盘事件, HTML事件



 12.this的指向是什么？如何改变指向？

    1.箭头函数 2.that 3.apply，call，bind 4.new



 13.深拷贝和浅拷贝有什么区别？如何实现深拷贝？

 14.数组常用的操作方法？splice和slice的区别

    一个是在原数组进行操作，一个是对原数组进行拷贝进行操作;push()和pop（），shift()和unshift()，splice(),fill(),filter(),includes(),indexOf(),reverse(),some()



 15.事件委托是什么？

 16.for..in..和for..of..的区别

    for..in..遍历的是键名，也就是索引；for..of..可以遍历键值



 17.两个div需要设置层级关系，需要哪些属性

    z-index



 18.eval元素能不能解释为由js源码组成的字符串呢？能不能用断点调试？会不会引起安全问题可以的，不能，会有安全问题，xss攻击


 19.js里，两个整数进行除法，结果是整数还是小数？

 20.可用parseInt和Math.round变为整数



 21.offsetWidth，clientWidth代表什么？

    可见区域的宽度，高度



 22.继承是怎么实现的？用prototype是怎么实现的？

    原型链继承，借用构造函数继承，组合继承，原型式继承，寄生式继承，寄生组合式继承



 23.JS的垃圾回收机制，用JS时怎么调bug的？

    找出不在使用的变量，释放内存，然后周期性的实施这一操作。方法有两种：标记清除和引用计数。
    标记清除：变量进入环境的时候标记为进入环境，离开的时候标记为离开环境。
    引用计数：跟踪记录每个标记被引用的次数；问题：循环引用



## ES6

 1.ES6里面const，let，var的区别

    const是定义一个常量，定义后值无法改变，不存在变量声明提升，有暂时性死区；

    let是定义局部变量，定义块级作用域的变量，不存在变量声明提升，有暂时性死区；

    var是定义变量，存变量声明提升；



 2.ES6有哪些新特性？

    let，const；字符串，数组，对象的方法补充；箭头函数；Promise；Proxy等



 3.const定义的对象能否改变？

    可以



 4.let和var在全局定义的时候有什么区别？

    var在全局对象windows中可以找到，而let不行



 5.ES6里面Promise的两个参数分别是什么？

    resolved和rejected，分别为状态变为fulfilled和rejected的回调函数



## Vue

1.Vue的生命周期有哪些？他们各有什么不同？

```
beforecreate(),在该阶段，vue实例刚被初始化，只存在一些默认的钩子函数和方法，此时 data和methods都没有被初始化；
created()，此时data和methods已经被初始化，如果要调用data中的数据或methods中的方法，最早可以在created中调用；
beforemounte(),此时页面在内存中已被加载完成，及虚拟DOM树，但还未加挂载得到页面上，页面仍是旧的；
mounted(),此时vue实例完成里初始化阶段，进入运行阶段；
beforeupdate(),此时，数据已经发生修改，但是页面上的数据还未修改，内存中的数据和页面的数据费保持同步；
updated(),两者保持同步；
beforedestore(),销毁前夕，数据和方法仍可用；
destored()
```

2.v-if 和 v-show 之间的区别是什么？

    v-if是条件渲染，根据值决定是否渲染；
    v-show是条件展示，都会进行渲染，根据值决定是否展示出；
    v-if具有较高的切换渲染消耗，v-show具有较高的初始渲染消耗



3.Vue里面父子组件怎么传值？兄弟组件是怎么传值的？

    父->子：用v-bind引用子组件的时候进行绑定，在 子组件上用props属性进行定义；

    子->父：用v-on，emit进行收发；



 4.v-for中key值的作用是什么？对使用的影响，没有key时会出现什么情况？



 5.vuex代码怎么写？



 6.computed和watch的区别是什么？应用场景有哪些？

    computed是计算属性，当计算属性所依赖的属性发生变化是，会重新进行计算，计算完成后进行缓存，如果没有改变，再次加载时调用的是缓存中的值；
    watch是监听数据，没有缓存，再次加载页面后会重新调用函数



 7.数据请求在生命周期的那个阶段？

    如果是第一次加载，就在created，如果在页面加载完成之后就用mounted



 8.Vue实现双向绑定的原理是什么？

 9.什么情况下会用created，mounted？

 10.箭头函数和一般函数的区别？

    箭头函数没有this，也没有arguments，不能做构造函数



 11.vue组件中的data为什么是函数形式？

    函数形式返回的是新对象，不会出现多个组件引用同一个对象，避免修改数据带来的连锁反应



 12.vue中this从那个生命周期可以开始被调用？

 13.vue-cli如何使用json数据模拟？

 14.Vue中插槽有什么作用？

 15.app怎么适配？

 16.vue router的钩子函数有哪些？那个是可以全局使用的钩子

 17.jQuery和Vue的区别是什么？

 18.router和route的区别是什么？

 19.Vue中Vuex和Axios的使用

 20.Vue的源码看过吗？怎么实现数据劫持？

    没看过...数据劫持使用Object.defineProperty()方法，该方法可以为对象新增一个属性，或是修改对象的属性，
    然后返回该对象。可通过该方法内的get()和set()属性进行数据的监听。



## 综合

 1.怎么实现跨域？ （1.jsonp 2.代理 3.php header写允许跨域）jsonp的原理是什么？

 2.前端常用的性能优化有哪些？

 3.从输入URL到页面加载完成，中间发生了什么？

 4.如何查看一个网站所使用的的技术？（打开开发者工具）

 5.react核心是什么？

 6.怎么实现文本不自动换行？超出部分显示省略号

 7.HTTP 和HTTPS分别是什么？区别

 8.css动画特性可以用js实现，为什么还要用css实现？（css渲染动画不占用js主线程）

 9.Ajax请求数据重新处理和拦截器

 10.git的使用及常用git的代码

 11.npm中warn了解吗？

 12.用过哪些基础框架？

 13.jQuery中绑定事件on和bind的区别

 14.打开页面，加载较慢，如何缩短时长

 15.http请求头content-type是干什么的？

 16.HTTP常见的状态码有哪几种？JS和DOM操作浏览器兼容的注意事项有哪些?

 17.Web开发常见的安全性漏洞是哪些？

 18.单页面应用的优缺点

 19.同源策略

    这个也非常重要，通常会和跨域一起问

 20.发布订阅



## 算法

 1.如何给数据去重？

      遇事不决两个for...;

      懒得动脑子就用ES6的Set()，不过一般面试官都问这个问题了，就不让你用这个方法；

 2.使用对象属性的唯一性，新建一个对象，让原数组的value变成该对象的key，给key任意赋值（别来null和undefined），遍历完数组后，遍历一遍对象的key就是结果。

ps: 文档我本来写的是markdown格式的，直接复制过来了，比较乱。现已修改，并且把所有问题附上了参考答案（答案只是我的一个见解，大佬们别喷啊~~）