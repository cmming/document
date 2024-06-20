module.exports = {
    title: 'chmi',
    contentLoading: true,
    base:'/document/',
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
                { text: 'typescript', link: '/typescript/chapter1/' },
                { text: 'java', link: '/java/' },
                { text: 'php', link: '/backEnd/php/' },
                { text: 'linux', link: '/backEnd/linux/' }
            ]
        },
        { text: '算法', link: '/algorithm/' },
        { text: '随笔', link: '/thought/' },
        // { text: '项目', link: '/project/' },
        // { text: 'Todo', link: '/todo/' },
        { text: '读书', link: '/reading/' },

        ],
        sidebar: {
            '/frontEnd/': getBlogSidebar('前端'),
            '/java/': getBlogSidebar('java'),
            '/backEnd/php/': getBlogSidebar('php'),
            '/backEnd/linux/': getBlogSidebar('linux'),
            '/typescript/': getBlogSidebar('typescript'),
            '/todo/': getBlogSidebar('todo'),
            '/algorithm/': getBlogSidebar('算法'),
            '/thought/': getBlogSidebar('随笔'),
            '/reading/': getBlogSidebar('读书'),
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
                        ['./JavaScript/module', '模块化'],
                        ['./JavaScript/JS-Array', 'Js 数组'],
                        ['./JavaScript/JS-HOF', 'Js 高阶函数 HOF'],
                        ['./JavaScript/JS-AOP', 'Js 切面 AOP'],
                        ['./JavaScript/Curry', '柯里化'],
                        ['./JavaScript/debounce', '防抖和节流'],
                        ['./JavaScript/setMap', 'set和map'],
                        ['./JavaScript/Proxy', 'Proxy'],
                        ['./JavaScript/Promise', 'Promise'],
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
                    title: 'Bootstrap4',
                    children: [
                        ['./bootstrap4/', '介绍'],
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
                        // sourceCode
                        ['./vue/sourceCode', '源码分析'],
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
                        ['./private/vscode', 'vscode'],
                        ['./private/html', 'html'],
                        ['./private/css', 'css'],
                        ['./private/js', 'js'],
                        ['./private/es6', 'es6'],
                        ['./private/vue', 'vue'],
                        ['./private/all', '综合'],
                        ['./private/algorithm', '算法'],
                        ['./private/test', '测试'],
                    ]
                }
            ]
            break;
        case 'php':
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
                {
                    title: 'mysql',
                    children: [
                        ['./mysql/benchmarks', '基准测试'],
                        ['./mysql/structuralOptimization', '结构优化'],
                        ['./mysql/performanceManage', '性能管理'],
                        ['./mysql/recovery', '数据恢复'],
                        ['./mysql/optimization', '优化'],
                    ]
                },
            ]
            break;
        case 'java':
            return [
                ['', '欢迎'],
                {
                    title: 'java基础',
                    children: [
                        ['./code/optional', 'optional'],
                        ['./code/map', 'map'],
                        ['./code/list', 'list'],
                        ['./code/stream', 'stream'],
                    ]
                },
                {
                    title: 'spring',
                    children: [
                        ['./spring/spel', 'spel'],
                        ['./spring/jpa', 'jpa'],
                        ['./spring/customPlugin', '自定义插件'],
                        ['./spring/strategy', '新增策略模式'],
                        ['./spring/plugin', '插件'],
                        ['./spring/security', 'springboot security'],
                        ['./spring/restemplate', 'restemplate'],
                        ['./spring/validate', '参数校验'],
                        ['./spring/cache', '缓存'],
                        ['./spring/logback', '日志'],
                        ['./spring/thead', '线程'],
                        ['./spring/mapstruct', 'mapstruct'],
                        ['./spring/rabbitmq', 'rabbitmq'],
                        ['./spring/remoteDebug', '远程调试'],
                    ]
                },
                {
                    title: '常见问题',
                    children: [
                        ['./private/data', '数据类型问题'],
                    ]
                },
                {
                    title: 'neo4j',
                    children: [
                        ['./neo4j/summary', '问题总结'],
                        ['./neo4j/apoc', 'apoc'],
                    ]
                }
            ];
            break;
        case 'linux':
            return [
                {
                    title: 'docker',
                    children: [
                        ['./docker/image', '镜像'],
                        ['./docker/container', '容器'],
                    ]
                },
                {
                    title: 'k8s',
                    children: [
                        ['./k8s/install', '安装'],
                        ['./k8s/dashboard', '面板安装'],
                    ]
                },
                // harbor
                {
                    title: 'harbor',
                    children: [
                        ['./harbor/install', '安装'],
                    ]
                }
            ]
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
                },
                {
                    'title': 'ts-axios 接口扩展',
                    collapsable: false,
                    children: [
                        'chapter6/extend',
                        'chapter6/overload',
                        'chapter6/generic'
                    ]
                },
                {
                    'title': 'ts-axios 拦截器实现',
                    collapsable: false,
                    children: [
                        'chapter7/interceptor'
                    ]
                },
                {
                    'title': 'ts-axios 配置化实现',
                    collapsable: false,
                    children: [
                        'chapter8/merge',
                        'chapter8/transform',
                        'chapter8/create'
                    ]
                },
                {
                    'title': 'ts-axios 取消功能实现',
                    collapsable: false,
                    children: [
                        'chapter9/cancel'
                    ]
                },
                {
                    'title': 'ts-axios 更多功能实现',
                    collapsable: false,
                    children: [
                        'chapter10/withCredentials',
                        'chapter10/xsrf',
                        'chapter10/upload-download',
                        'chapter10/auth',
                        'chapter10/validateStatus',
                        'chapter10/paramsSerializer',
                        'chapter10/baseURL',
                        'chapter10/static'
                    ]
                },
                {
                    'title': 'ts-axios 单元测试',
                    collapsable: false,
                    children: [
                        'chapter11/preface',
                        'chapter11/jest',
                        'chapter11/helpers',
                        'chapter11/requests',
                        'chapter11/headers',
                        'chapter11/instance',
                        'chapter11/interceptor',
                        'chapter11/mergeConfig',
                        'chapter11/cancel',
                        'chapter11/more'
                    ]
                },
                {
                    'title': 'ts-axios 部署与发布',
                    collapsable: false,
                    children: [
                        'chapter12/build-deploy',
                        'chapter12/demo'
                    ]
                },
                {
                    'title': '课程总结',
                    collapsable: false,
                    children: [
                        'chapter13/summary'
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
            case '读书':
                return [
                    ['', '欢迎'],
                    {
                        title: '现代前端技术解析',
                        children: [
                            // ['./12/12', '协议'],
                            ['./现代前端技术解析/协议', '第二章前端与协议'],
                            ['./现代前端技术解析/前端三层与应用', '第三章前端三层与应用'],
                            // 前端项目与技术实现
                            ['./现代前端技术解析/前端项目与技术实现', '第五章前端项目与技术实现'],
                        ]
                    },
                ]
                break;
    }
}
