# 实例

## html 使用

### filter

> 转换数据 transform

```javascript
/**
*
* val 页面中传过来的只
*/
Vue.filter('changeTableColumns',function(val,params){
    let result = '异常'
    if(val){
        result = '正常'
    }
    return result
})

// default
<div>{{val | changeTableColumns}}</div>
//从第二个参数开始 传递 自定义参数
<div>{{val | changeTableColumns(val,'custom-params')}}</div>

```

### 事件绑定 参数传递

>'@' :事件绑定  
>':' :传递参数
```javascript

<template>
    <div @click :data="data"></div> 
</template>

```


### 自定义指令

> [参考](https://cn.vuejs.org/v2/guide/custom-directive.html)