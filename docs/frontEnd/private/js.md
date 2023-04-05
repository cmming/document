
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