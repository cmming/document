
## 跨域范围

- Cookie、LocalStorage、sessionStorage和 IndexDB 无法读取。
- DOM 节点无法读取和设置。
- AJAX 请求不能发送。

### dom 跨域

```html
<iframe src="https://www.baidu.com/" id="ifm" frameborder="0" style="width:100vw;height: 100vh;"></iframe>
<script>
// Uncaught DOMException: Blocked a frame with origin "https://www.baidu.com" from accessing a cross-origin frame. 
    console.log(document.getElementsByTagName('iframe')[0].contentWindow.document.getElementById("kw"))
</script>
```


### jsonp 隐患 (csrf和xss)

1. 利用了 js 资源加载时会发送 Referer 的特性，服务端判断 Referer 是不是白名单即可。但实际还会因为过滤的正则不严谨导致绕过，www.qq.com 关键字，那我可以构造 www.qq.com.domain.com 来进行攻击。空 Referer 还是要禁止。```<iframe src="java:'< src=http://attack.com/jsonp></>'"></iframe>；```使用 iframe 调用 java 伪协议，来发送空 Referer 的 js 请求。

2. 部署随机 Token 来防御。

3. 不严谨的 content-type导致的 XSS 漏洞。

    3.1 场景：```http://youdomain.com?callback=<script>alert(1)</script>``` 如果没有严格定义好 Content-Type（ Content-Type: application/json ），再加上没有过滤 callback 参数，直接当 html 解析了，就是一个赤裸裸的 XSS 了

    3.2 解决：严格定义 Content-Type: application/json，然后严格过滤 callback 后的参数并且限制长度（进行字符转义，例如<换成&lt，>换成&gt）等，这样返回的脚本内容会变成文本格式，脚本将不会执行。



## cros

### 后端响应头

1. Access-Control-Allow-Origin ：该字段是必须的。它的值要么是请求时Origin字段的值，要么是一个*，表示接受任意域名的请求。


2. Access-Control-Allow-Credentials ：该字段可选。它的值是一个布尔值，表示是否允许发送Cookie。


3. Access-Control-Expose-Headers ：该字段可选。CORS请求时，XMLHttpRequest对象的getResponseHeader()方法只能拿到6个基本字段：Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma。如果想拿到其他字段，就必须在Access-Control-Expose-Headers里面指定。


### 非简单请求

> 非简单请求是那种对服务器有特殊要求的请求，比如请求方法是PUT或DELETE，或者Content-Type字段的类型是application/json。非简单请求的CORS请求，会在正式通信之前，增加一次HTTP查询请求，称为"预检"请求（preflight）。


```js
// 求类型OPTIONS做个简单的过滤
if (req.method == "OPTIONS") {
    res.send(200);
}
```

## jsonp和 cros 对比

- JSONP只支持GET请求，CORS支持所有类型的HTTP请求

- JSONP的优势在于支持老式浏览器，以及可以向不支持CORS的网站请求数据

- [CROS兼容](https://caniuse.com/#search=cors)



### 参考资料

[前端也需要了解的 JSONP 安全 ](http://www.sohu.com/a/249432637_472869)