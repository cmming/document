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
                    { text: '工具', link: '/tools/' },
                ]
            },
            { text: '学习', link: '/learn/' },
            { text: '随笔', link: '/thought/' },
            { text: '项目', link: '/project/' },
            { text: 'Todo', link: '/todo/' },

        ],
        sidebar: {
            '/frontEnd/': getBlogSidebar('前端'),
            '/backEnd/': getBlogSidebar('后端'),
            '/tools/': getBlogSidebar('工具'),
            '/interest/': getBlogSidebar('兴趣'),
            '/thought/': getBlogSidebar('随笔'),
            '/words/': getBlogSidebar('手记'),
            '/project/': getBlogSidebar('项目'),
        },
    },
    plugins: [
        // '@vuepress/medium-zoom'
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
                    ]
                },
                {
                    title: 'Vue',
                    children: [
                        ['./vue/component', '组件'],
                        ['./vue/Instance', '实例'],
                        ['./vue/install', '部署'],
                        ['./vue/config', '配置'],
                    ]
                },
                {
                    title: 'Axios',
                    children: [
                        ['./axios/request', '请求头'],
                        ['./axios/cancel', '取消请求'],
                    ]
                }
            ]
            break;
        case '后端':
            return [
                ['', '欢迎'],
                {
                    title: 'base',
                    children: [
                        ['./base/router', '路由'],
                        ['./base/middleware', '中间件'],
                    ]
                },
            ]
            break;
    }
}