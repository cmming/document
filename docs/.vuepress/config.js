module.exports = {
    title: 'chmi',
    contentLoading: true,
    configureWebpack: {
        resolve: {
            alias: {
                '@': '/'
            }
        }
    },
    markdown: {
        // lineNumbers: true,
    },
    extendMarkdown: md => {
        // 使用 markdown 插件
    },
    themeConfig: {
        sideBar: 'auto',
        sidebarDepth: 3,
        lastUpdated: '上次更新',
        nav: [{
                text: '博客',
                link: '/blog',
                items: [
                    { text: '前端', link: '/frontEnd/' },
                    { text: '后端', link: '/backEnd/' },
                    { text: 'typescript', link: '/typescript/chapter1/' },
                ]
            },
            { text: '算法', link: '/algorithm/' },
            { text: '随笔', link: '/thought/' },
            // { text: '项目', link: '/project/' },
            { text: 'Todo', link: '/todo/' },

        ],
        sidebar: {
            '/frontEnd/': getBlogSidebar('前端'),
            '/backEnd/': getBlogSidebar('后端'),
            '/typescript/': getBlogSidebar('typescript'),
            '/todo/': getBlogSidebar('todo'),
            '/algorithm/': getBlogSidebar('算法'),
            '/thought/': getBlogSidebar('随笔'),
            // '/project/': getBlogSidebar('项目'),
        },
    },
    plugins: [
        '@vuepress/medium-zoom',
        '@vuepress/back-to-top',
        '@vuepress/nprogress',
        '@vuepress/pwa'
        // '@vuepress/medium-zoom': true,
        // '@vuepress/back-to-top': true,
        // '@vuepress/nprogress':true,
        // '@vuepress/pwa': {
        //     serviceWorker: true,
        //     updatePopup: {
        //         message: "",
        //         buttonText: "点我更新"
        //     },
        //     popupComponent: 'update-popup',
        // },
    ]
}



function getBlogSidebar(type) {
    switch (type) {
        case '前端':
            return [
                ['', '欢迎'],
                {
                    title: 'JavaScript',
                    children: [
                        ['./JavaScript/JS-Array', 'Js 数组'],
                        ['./JavaScript/JS-HOF', 'Js 高阶函数 HOF'],
                        ['./JavaScript/JS-AOP', 'Js 切面 AOP'],
                        ['./JavaScript/Curry', '柯里化'],
                        ['./JavaScript/debounce', '防抖和节流'],
                        ['./JavaScript/setMap', 'set和map'],
                        ['./JavaScript/Proxy', 'Proxy'],
                    ]
                },
                {
                    title: 'css',
                    children: [
                        ['./css/flex-box', 'flexbox'],
                        ['./css/taobao', '淘宝移动'],
                        ['./css/vw', 'vw布局'],
                    ]
                },
                {
                    title: 'Webpack',
                    children: [
                        ['./Webpack/concepts', '概念'],
                        ['./Webpack/init', '从零开始'],
                        ['./Webpack/loader', 'loader'],
                        ['./Webpack/optimize', '优化'],
                    ]
                },
                {
                    title: 'Sass',
                    children: [
                        ['./Sass/common', '常用'],
                        ['./Sass/naming', '命名'],
                    ]
                },
                {
                    title: 'Jest',
                    children: [
                        ['./Jest/common', 'jest'],
                    ]
                },
                {
                    title: 'Vue',
                    children: [
                        ['./vue/response', '响应式原理'],
                        ['./vue/eventLoop', 'eventloop'],
                        ['./vue/component', '组件'],
                        ['./vue/Instance', '实例'],
                        ['./vue/install', '部署'],
                        ['./vue/config', '配置'],
                        ['./vue/travis-cl', 'travis-cl'],
                        ['./vue/testUtils', '单元测试testUtils'],
                    ]
                },
                {
                    title: 'Axios',
                    children: [
                        ['./axios/request', '请求头'],
                        ['./axios/cancel', '取消请求'],
                    ]
                },
                {
                    title: 'ElementUI',
                    children: [
                        ['./ElementUI/basic', '基础结构'],
                        ['./ElementUI/use', '看看官方如何使用自己的框架'],
                        ['./ElementUI/packages', '看看如何封装组件'],
                        ['./ElementUI/component', '封装组件'],
                    ]
                },
                {
                    title: 'React',
                    children: [
                        ['./React/install', '创建项目'],
                    ]
                },
                {
                    title: 'Jenkins',
                    children: [
                        ['./Jenkins/install', 'Jenkins'],
                    ]
                },
                {
                    title: '常见问题',
                    children: [
                        ['./private/html', 'html'],
                        ['./private/css', 'css'],
                        ['./private/js', 'js'],
                        ['./private/es6', 'es6'],
                        ['./private/vue', 'vue'],
                        ['./private/all', '综合'],
                        ['./private/algorithm', '算法'],
                    ]
                }
            ]
            break;
        case '后端':
            return [
                ['', '欢迎'],
                {
                    title: 'laravel',
                    children: [
                        ['./laravel/router', '路由'],
                        ['./laravel/middleware', '中间件'],
                        ['./laravel/validate', '验证'],
                        ['./laravel/JWT', 'JWT'],
                        ['./laravel/OAuth2', 'OAuth2'],
                        ['./laravel/laravel-echo-server', 'laravel-echo-server'],
                        ['./laravel/laravel-horizon', 'laravel-horizon'],
                        ['./laravel/laravel-swoole', 'laravel-swoole'],
                        ['./laravel/run', '运行'],
                    ]
                },
            ]
            break;
        case 'typescript':
            return [
                {
                  title: '初识 TypeScript',
                  collapsable: false,
                  children: [
                    ['./chapter1/', 'Introduction'],
                    './chapter1/install',
                    './chapter1/start'
                  ]
                },
                {
                  title: 'TypeScript 常用语法',
                  collapsable: false,
                  children: [
                    './chapter2/type',
                    './chapter2/declare',
                    './chapter2/interface',
                    './chapter2/class',
                    './chapter2/function',
                    './chapter2/generic',
                    './chapter2/inference',
                    './chapter2/advance'
                  ]
                },
                {
                  title: 'ts-axios 项目初始化',
                  collapsable: false,
                  children: [
                    './chapter3/require',
                    './chapter3/init',
                    './chapter3/base'
                  ]
                },
                {
                  title: 'ts-axios 基础功能实现',
                  collapsable: false,
                  children: [
                    './chapter4/url',
                    './chapter4/data',
                    './chapter4/header',
                    './chapter4/response',
                    './chapter4/response-header',
                    './chapter4/response-data'
                  ]
                },
                {
                  title: 'ts-axios 异常情况处理',
                  collapsable: false,
                  children: [
                    './chapter5/error',
                    './chapter5/enhance'
                  ]
                }
              ]
              break;
        case 'todo':
            return [
                ['', '欢迎'],
                {
                    title: '2019',
                    children: [
                        ['./2019/09', '201909'],
                    ]
                },
            ]
            break;
        case '算法':
            return [
                ['', '欢迎'],
                {
                    title: '斐波那契',
                    children: [
                        ['./Fibonacci', '斐波那契'],
                    ]
                },
                {
                    title: '动态规划',
                    children: [
                        ['./Dynamic', '动态规划'],
                    ]
                },
            ]
            break;
        case '随笔':
            return [
                ['', '欢迎'],
                {
                    title: 'css',
                    children: [
                        ['./css/cssSelector', '选择器'],
                        ['./css/BFC', 'BFC'],
                        ['./css/layout', 'layout'],
                        ['./css/meta', 'meta'],
                    ]
                },
                {
                    title: 'cros',
                    children: [
                        ['./cros', '跨域'],
                    ]
                },
                {
                    title: '优化',
                    children: [
                        ['./indexSeo', '首屏优化'],
                    ]
                },
            ]
            break;
    }
}