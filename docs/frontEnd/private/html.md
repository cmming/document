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
