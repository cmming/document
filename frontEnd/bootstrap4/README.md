# 初识 Bootstrap 4

Bootstrap4 目前是 Bootstrap 的最新版本，是一套用于 HTML、CSS 和 JS 开发的开源工具集。利用我们提供的 Sass 变量和大量 mixin、响应式栅格系统、可扩展的预制组件、基于 jQuery 的强大的插件系统，能够快速为你的想法开发出原型或者构建整个 app 。

## 特点

- **响应式meta标签**

为移动设备优化代码，然后用CSS媒体查询来扩展组件。应该放在head里面。

```html
<!-- shrink-to-fit=no 防止进行缩放来显示页面 -->
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
```

- **box-sizing**

我们把将全局box-sizing的值由默认的content-box重定义为border-box，以保证padding和borde不会影响元素的最后计算宽度。虽然这个称为怪异模式。

- **初始化与CSS重置**

我们使用Reboot，把一系列元素特征的CSS修改放在一个文件里。

- **路线方针**

1. 重置浏览器默认值，使用rem作为尺寸规格单位，代替em用于指定可缩放的组件的间隔与缝隙。
2. 最大化避免使用margin-top,防止使用它造成的垂直外排版（边距）混乱所造成之意想不到结果。更重要的是，一个单一方向的margin是一个简单的构思模型。
3. 为了易于跨设备缩放，block块元素必须使用rem作为margin的单位。
4. 保持font相关属性最小的声明，尽可能地使用inherit属性，不影响容器溢出。

- **初始化值**

```
1. 为了安全起见，<body>的background-color的默认值赋为#fff。
2. <body>元素被赋予一个全局性的font-family和 line-height，其下面的诸多表单元素也继承此属性，以防止字体大小错位冲突。
3. <html>根元素没有声明font-size属性，但被假定为16px大小（这是目前Chrome等浏览器默认值)，然后在此基础上采用font-size:1rem的比例应用于<body>上，使媒体查询能够轻松的实现缩放，最大程序保障用户偏好和易于访问。
4. 全局性地将每一个元素的box-sizing属性(包括*:before、*:after都设置为border-box-以确保DIV元素自身定义的宽度不会因为border或padding而超过。

```




