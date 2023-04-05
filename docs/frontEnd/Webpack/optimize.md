## 优化

>前面只是添加了一个开发模式，代码还没有打包命令。此时就会用到mode，来区分不同的工作模式；[个人的webpack使用案例](https://github.com/cmming/webpack-demo.git)


### 使用webpack-merge

>合并不同环境的配置文件

```shell
cnpm install webpack-merge -D
```

### 创建三个文件

> webpack.base.js：基础配置 webpack.dev.js：开发环境的配置 webpack.prod.js：代码打包会用到的配置


// webpack.base.js
```js 
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
    // npm install --save-dev clean-webpack-plugin
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
var webpack = require("webpack");

module.exports = {
    entry: './src/index.js',
    module: {
        rules: [{
                test: /\.(png|jpe?g|gif|eot|woff2?|ttf|svg)(\?.*)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        //图片 小于 10240B 
                        limit: 10240,
                        name: '[name]_[hash].[ext]',
                        outputPath: "images/"
                    }
                }]
            },
            {
                test: /\.css|\.scss$/, // 正则匹配所有.css后缀的样式文件
                use: ['style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 2, // 让所有的 scss 都会重新使用 sass-loader postcss-loader 进行处理
                                modules: true //样式模块化 避免全局污染
                            }
                        },
                        "sass-loader",
                        "postcss-loader"
                    ] // 使用这两个loader来加载样式文件
            },
            //css
            {
                test: /\.css$/, // 正则匹配所有.css后缀的样式文件
                use: ['style-loader',
                        "css-loader",
                        "postcss-loader"
                    ] // 使用这两个loader来加载样式文件
            },
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
    },
    plugins: [
        //清空之前剩余的打包文件
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
    ],
    //tree shaking 仅仅加载使用的模块
    optimization: {
        usedExports: true,
        //代码分割
        splitChunks: {
            // include all types of chunks
            chunks: 'all'
        }

    },
}
```

// webpack.prod.js
```js 
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base')


const prodConfig = {
    mode: "production",
    devtool: "cheap-module-source-map",
}

module.exports = merge(baseConfig, prodConfig)
```

// webpack.dev.js

```js
const path = require('path')
//  cnpm install webpack-merge -D
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base')


const devConfig = {
    mode: "development",
    devtool: "cheap-module-eval-source-map",
    devServer: {
        host: 'localhost',
        port: '8883',
        open: true,
        overlay: true,
    },
}

module.exports = merge(baseConfig, devConfig)
```

### 配置命令行

```json 
"dev-build": "webpack --config ./build/webpack.dev.js",
// 编译
"build": "webpack --config ./build/webpack.prod.js",
// 开发模式
"start": "webpack-dev-server --compress --progress --config ./build/webpack.dev.js",
```