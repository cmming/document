# 取消请求

## 用途

1. 单页切换过程中,取消上个页面的请求
2. token 过期,取消后续的请求

## 实现


> 实现思路: 1. 在所有请求之前将请求进行存储,我选择的存储驱动是vuex. 2.路由的前置事件中添加一个取消请求的过滤器.

### 存储所有的请求

```javascript


// cancelStore.js
const state = {  
    axiosPromiseArr: [],
}

const getters = {
        axiosPromiseArr: state => {
            return state.axiosPromiseArr
    }
}


const mutations = {
    ADD_AXIOS: (state, data) => {
        state.axiosPromiseArr.push(data)
    },
    DELETE_AXIOS: (state, index) => {
        delete state.axiosPromiseArr[index]
    },
    INIT_AXIOS: (state) => {
        state.axiosPromiseArr = []
    },
}

const actions = {
     storeAxios({ commit }, params) {
        commit('ADD_AXIOS', params)
    },
    deleteAxios({ commit }, params) {
        commit('DELETE_AXIOS', params)
    },
    initAxios({ commit }, params) {
        commit('INIT_AXIOS', params)
    },
}


export default {
    state,
    getters,
    mutations,
    actions
}


// cancelRequestInterceptors.js
import axios from 'axios'
const CancelToken = axios.CancelToken;
export default function cancelRequest(store,config) {
    //cancel 白名单 /user/refreshToken 方便刷新接口 我这里使用了 lodash 函数库(_)
    let cancelWhiteList = ['/user/refreshToken']
    if (_.indexOf(cancelWhiteList, config.url) === -1) {
        config.cancelToken = new CancelToken((cancel) => {
            store.dispatch('storeAxios', cancel)
        })
    }
    return config
}


```


### 在路由中添加取消的前置事件

```javascript
import store from '@/store'

export default function cancelRequest() {
    store.getters.axiosPromiseArr.forEach((e,i) => {
        typeof(e)==='function'&&e()
        store.dispatch('storeAxios', i)
        store.dispatch('hideLoading')
    });
    // 每次请求完成后清空 否则这个变量会越来越大 使页面变卡
    store.dispatch('initAxios')
}
```

### 使用位置

1.路由的前置中间件,取消上次页面的请求.

2.接口请求的后置中间件,取消响应码为token 过期,之后的所有请求.避免没必要的请求.