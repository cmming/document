# 请求中的配置

## Content-Type 

> 默认 为application/json,只有当后台的接口采用是 restful api 风格的时候不需要重新设置

```javascript
// 没有文件 
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
//  对 post 请求数据进行转换 主要是数组格式转换
Qs.stringify(params, {arrayFormat: 'brackets'}

// 有文件 multipart/form-data

// 个人喜欢 application/json 数据显示清晰

```

## 文件下载


```javascript
request({
    url: "/user/export",
    method: "get",
    responseType: "arraybuffer"
    }).then(res => {
    if (res.status === 200 && res.data) {
        // 这个请求头可能找不到,在后端设置请求头,
        // header('Access-Control-Expose-Headers:Content-Disposition');
        var disposition = res.headers["content-disposition"];
        var fileName = decodeURI(
        disposition.substring(
            disposition.indexOf("filename=") + 9,
            disposition.length
        )
        );
        let blob = new Blob([res.data], { type: res.headers["content-type"] });
        let link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
        link.remove();
    }
});
```



