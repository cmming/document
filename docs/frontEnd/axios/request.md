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



