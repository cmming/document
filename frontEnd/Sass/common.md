## 变量 

> 和php一样，使用以$作为变量名。



### global

> 覆盖全局变量

```scss
$remUnit: null !default;
@media screen and (min-width: 1024px) {
  $remUnit: 102 !global;
}
@media screen and (min-width: 1920px) {
  $remUnit: 192 !global;
}

body {
  width: $remUnit;
}

// 编译后
body {
  width: 192;
}
```

## 数据类型

1.数字，1, 2, 13, 10px

2.字符串，有引号字符串与无引号字符串，"foo", 'bar', baz

3.颜色，blue, #04a3f9, rgba(255,0,0,0.5)

4.布尔型，true, false

5.空值，null

6.数组 (list)，用空格或逗号作分隔符，1.5em 1em 0 2em, Helvetica, Arial, sans-serif

7.maps, 相当于 JavaScript 的 object，(key1: value1, key2: value2)


## mixin（sass中的函数式编程） 

> 创建一个 mixin

```scss
@mixin rounded-corners {
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
}
```

> 调用 mixin

```scss
 @include no-bullets;
```

> 参数定义

```scss
// 支持设置默认值
@mixin rounded-corners($borderRadius:5px,$borderColor:red) {
  border-radius: $borderRadius;
  border-color:$borderColor
}

```

### @content （相当于slot）

> 使mixin 不仅能传递参数，还能传递样式片段。

```scss
$color: white;
@mixin colors($color: blue) {
  background-color: $color;
  @content;
  border-color: $color;
}
.colors {
  @include colors { color: $color; }
}

// 编译后
.colors {
  background-color: blue;
  color: white;
  border-color: blue;
}
```




## 继承 extend

```scss
//通过选择器继承继承样式
.error {
  border: 1px red;
  background-color: #fdd;
}
.seriousError {
  @extend .error;
  border-width: 3px;
}


// 编译后的代码  所有相较于mixin,可以精简代码
.error,.seriousError {
  border: 1px red;
  background-color: #fdd;
}
.seriousError {
  border-width: 3px;
}
```