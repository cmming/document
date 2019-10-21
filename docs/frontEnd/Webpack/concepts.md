## 1.作用

> 对静态资源进行处理。[个人的webpack使用案例](https://github.com/cmming/webpack-demo.git)

## 2.基本组成

> 由入口、出口、loader、plugin这四个核心模块组成。 loader用户编译不同类型的文件，plugin则是用于在编译过程中的不同生命周期对文件进行操作。

```js
// 一个简单的webpack 配置
const devConfig = {
    mode: "development",
    devtool: "cheap-module-eval-source-map",
    devServer: {
        contentBase: path.join(__dirname, 'src'),
        open: true,
        compress: true,
        port: 8909,
        hot: true,
        // hotOnly:true
    },
    module: {
        rules: [
            //scss
            {
                test: /\.css|\.scss$/,  // 正则匹配所有.css后缀的样式文件
                use: ['style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,// 让所有的 scss 都会重新使用 sass-loader postcss-loader 进行处理
                            modules: true //样式模块化 避免全局污染
                        }
                    },
                    "sass-loader",
                    "postcss-loader"] // 使用这两个loader来加载样式文件
            },
            //css
            {
                test: /\.css$/,  // 正则匹配所有.css后缀的样式文件
                use: ['style-loader',
                    "css-loader",
                    "postcss-loader"] // 使用这两个loader来加载样式文件
            },

        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}
```