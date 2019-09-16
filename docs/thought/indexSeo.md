1. Vue-Router路由懒加载

```js
val['component'] = () => {
    return import ( /* webpackPrefetch: true */ `@/${component}`)
        .then((component) => { return component })
        .catch(() =>
            import ( /* webpackPrefetch: true */ '@/moudles/errorPage/views/404'))
}

```

2. 使用CDN加速，将通用的库从vendor进行抽离,避免重复加载。

3. Nginx的gzip压缩

4. 使用link标签的rel属性设置 prefetch,preload；(首页的资源均使用preload，而路由对应的资源，则使用prefetch)

    - preload 是告诉浏览器页面必定需要的资源，浏览器一定会加载这些资源

    - prefetch 是告诉浏览器页面可能需要的资源，浏览器不一定会加载这些资源

5. 如果使用了一些UI库，采用按需加载。

