 1.h5新增的标签有哪些？为什么要加强语义化？ 
   1. header 页面头部
   2. footer 页面底部
   3. aside  页面的侧边栏
   4. nav    定义导航栏
   5. progress 进度
   6. video    视频 ；audio定义声音
   7. datalist 提示input可能的值
   8. canvas 绘制图形
   ```
   <header><footer><nav><article><section><video><figure>
   ```
   便于开发者理解代码结构，方便网络抓包。

 2.为什么要加强语义化？ 

   1、有利于SEO，有利于搜索引擎爬虫更好的理解我们的网页，从而获取更多的有效信息，提升网页的权重。

   2、在没有CSS的时候能够清晰的看出网页的结构，增强可读性。

   3、便于团队开发和维护，语义化的HTML可以让开发者更容易的看明白，从而提高团队的效率和协调能力。





 2.行内元素，块级元素有那些？有什么不同？

    行内(内联)元素：< em >,< input >, < a >, < big >

    块级元素：< div >,< p >,< h >, < ul >

    不同：块级元素会独立成行，会有padding，margin等属性，



 3.第一行 <!DOCTYPE html>是做什么用的？

    定义该页面渲染模式，分为严格模式和混杂模式



 4.HTML页面加载完成后，会触发那个事件？onready还是onload

    1.onready在dom元素结构完成就会执行，onload会在图片等资源完全加载完之后才执行；

    2.编写个数不同，onready有多少执行多少，onload只会执行最后一个

    3.简化写法window.onload没有简化写法，$(document).ready(function(){})可以简化写成$(function(){});



5.addEventListener能否多次给DOM对象添加监听事件？

    可以



 6.attachEvent能否删除对象的监听事件？

    不可以，删除的话用detachEvent
    （事件解绑，removeEventListener，detachEvenet ,jquery用off或者unbind）



 7.new Date（）获取的是哪里的时间？

    PC本地的时间
