## 组件封装

> 学习element ui，学习其组件封装的流程化和复用函数。


### 1.父子组件之间的通信

> 由于vue使用 @on 和 $emit 替换了 $dispatch和$broadcast() 。导致跨级的组件通信成为障碍，官方推荐使用vuex。对于一个独立的ui框架显得麻烦。


1. 使用 $dispatch()派发事件，事件沿着父链冒泡；
2. 使用 $broadcast()广播事件，事件向下传导给所有的后代。

[参考element emitter.js](https://github.com/ElemeFE/element/blob/dev/src/mixins/emitter.js)

```js
function broadcast(componentName, eventName, params) {
  this.$children.forEach(child => {
    var name = child.$options.componentName;

    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      broadcast.apply(child, [componentName, eventName].concat([params]));
    }
  });
}
export default {
  methods: {
    dispatch(componentName, eventName, params) {
      var parent = this.$parent || this.$root;
      var name = parent.$options.componentName;

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;

        if (parent) {
          name = parent.$options.componentName;
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    broadcast(componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params);
    }
  }
};

// 使用

mixins: [Emitter],

```


> 整体看下来，每个组件的封装都是很独立的。很方便自己后期更加灵活的使用。 例如里面的icon 组件就不太适用自己使用。需要定制。