## 1.作用

> 对静态资源进行处理。[个人的webpack使用案例](https://github.com/cmming/webpack-demo.git)

## 2.基本组成

> 由入口、出口、loader、plugin这四个核心模块组成。 loader用户编译不同类型的文件，plugin则是用于在编译过程中的不同生命周期对文件进行操作。

```js
// 一个简单的webpack.base.js 配置
var HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const path = require('path')

module.exports = {
    entry: './src/main.js',
    output: {
        //cdn 地址
        publicPath: "/",
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../dist')
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            //图片 小于 10240B 
                            limit: 10240,
                            name: '[name]_[hash].[ext]',
                            outputPath: "images/"
                        }
                    }
                ]
            },
            //字体文件打包
            {
                test: /\.(eot|ttf|svg)$/,
                loader: 'file-loader',
            },
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }

        ]
    },
    plugins: [
        //清空之前剩余的打包文件
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "src/index.html"
        })
    ],
    //tree shaking 仅仅加载使用的模块
    optimization: {
        usedExports:true,
        //代码分割
        splitChunks: {
            // include all types of chunks
            chunks: 'all'
        }

    },
}
// 一个简单的webpack.pro.js 配置
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

module.exports = merge(baseConfig, devConfig)
```


## 3.必备插件

### 3.1 HtmlWebpackPlugin

    1.为html文件中引入的外部资源如script、link动态添加每次compile后的hash，防止引用缓存的外部文件问题。

    2.可以生成创建html入口文件，比如单页面可以生成一个html文件入口，配置N个html-webpack-plugin可以生成N个页面入口

## 4.必备loader 

    1 babel-loader 处理js
    2 file-loader 字体文件打包
    3 url-loader 处理图片
    4 postcss-loader
        1 就是前面提到的把 CSS 解析成 JavaScript 可以操作的 抽象语法树结构（Abstract Syntax Tree，AST）
        2 就是调用插件来处理 AST 并得到结果。
    5 通过 PostCSS 强大的插件体系，可以对 CSS 进行各种不同的转换和处理，从而尽可能的把繁琐复杂的工作交由程序去处理，而把开发人员解放出来。
    6 sass-loader
    7 style-loader
    8 css-loader

## 5.devServer

> 方便开发，从字面意思可以看出 dev+server 就是，开发模式下的服务。方便代码热加载。

