
 1.两个子盒子分别放到父盒子的最左和最右，怎么做？ *2

    position定位：将父子元素同时使用属性absolute，子元素添加距左右边框距离；

    弹性盒子：将父盒子定义属性display: flex;justify-content: space-between;



 2.css3的新特性

    弹性盒子，2d 3d动画 等



 3.子盒子在父盒子中水平居中有哪几种方法？

    弹性盒子：父盒子display:flex; justify-content:center;

    position：子盒子margin：auto；


 4.子盒子的定位，如何上下居中？

    弹性盒子：父盒子display:flex; align-items：center；



 5.父盒子中的子盒子浮动会有什么后果？

    子盒子浮动，父盒子的高度为0，父盒子高度塌陷



 6.定位有哪几个属性？（）

    static, relative, fixed, absolute, sticky（最后这个有好多面试官都不知道...）

    注意它们的不同，fixed和absolute会脱离文档流



 7.行内块元素和行内元素的区别？

    行内块元素就是将块元素以行的形式展示出来，同时保留了块元素可以设置的css属性



 8.两个行内块元素同行显示时，会出现3px空白间隙，为什么？如何解决？

    这个造成原因是浏览器会把两个块元素中间的换行符解析出来，暴力解决的话就是两个div卸载同一行



 9.为什么要清除浮动？怎么清除浮动？

    clear:both

    :after{ display:table; comtent: ''; clear:both }