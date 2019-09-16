## 选择器优先级

- 内联样式（1000） 如：style='border:1px solid red'
- ID选择器（0100）如：id='id'
- 类选择器/属性选择器/伪类选择器（0010）如：class='class' data-attr  :after
- 元素选择器/关系选择器/伪元素选择器（0001）如 ： p 、 + 、:after
- 通配符选择器（0000） 如 * 全局匹配