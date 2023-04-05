# 数据驱动

## new Vue

```
Vue 初始化主要就干了几件事情，
合并配置，初始化生命周期，初始化事件中心，初始化渲染，初始化 data、props、computed、watcher 等等。
```

## 挂载的实现

```
mountComponent 核心就是先实例化一个渲染Watcher，在它的回调函数中会调用 updateComponent 方法，
在此方法中调用 vm._render 方法先生成虚拟 Node，最终调用 vm._update 更新 DOM
```

## render

作用：渲染生成vnode

## createElement

作用：render 就是使用 createElement生成vnode


## update

作用：将vnode渲染成真实dom。

## 组件化

### createComponent

```
渲染一个原生组件，它在渲染一个组件的时候的 3 个关键逻辑：构造子类构造函数，安装组件钩子函数和实例化 vnode。
createComponent 后返回的是组件 vnode，它也一样走到 vm._update 方法，进而执行了 patch 函数
```

### patch

1. 为什么要patch
   为了减少dom操作带来的性能损耗，所以就使用一个diff算法去比较元素之前后现在的区别。只改变发生变化的元素。没有发生变化的就不修改。
2. where 
   作用目标是vnode
    
3. what 具体是如何工作的
    所用的diff算法来源于snabbdom，render 函数会生成vnode。

4. when
   当数据发生变化的时候就会发生触发，

5. 工作原理
    


### 合并配置


