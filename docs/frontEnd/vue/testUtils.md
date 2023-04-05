


## 1. 渲染类型

shallowMount ：方法只挂载一个组件而不渲染其子组件 (即保留它们的存根)：
mount  ：


```js 
// options 为组件设置属性 相当于为组件设置初始状态,返回值为{Wrapper}
mount(Component, options)
```

## 2. 挂载选项

>就是 shallowMount函数的参数 options


## 3. Wrapper
>一个 Wrapper 是一个包括了一个挂载组件或 vnode，以及测试该组件或 vnode 的方法。Wrapper也会用户很多属性和方法。

### 3.1 属性和方法

>wrapper.vm 访问一个实例所有的[方法和属性](https://vuejs.org/v2/api/#Instance-Properties)


### 3.2 其它的[函数](https://vue-test-utils.vuejs.org/zh/api/wrapper/#attributes)

### 3.3 findAll 
> 返回一个 WrapperArray

## 4. WrapperArray
>一个 WrapperArray 是一个包含 Wrapper 数组以及 Wrapper 的测试方法等对象。




## 5. 组件

> 看官网介绍，没有找到何使的使用场景


## 6. 断言

>也就是jest中的[匹配器](https://jestjs.io/docs/zh-Hans/using-matchers)

## 7.子组件操作父组件

```js 
<template>
  <div>
    <child-component @custom="onCustom" />
    <p v-if="emitted">Emitted!</p>
  </div>
</template>

<script>
  import ChildComponent from './ChildComponent'

  export default {
    name: 'ParentComponent',
    components: { ChildComponent },
    data() {
      return {
        emitted: false
      }
    },
    methods: {
      onCustom() {
        this.emitted = true
      }
    }
  }
</script>

//test.js
import { shallowMount } from '@vue/test-utils'
import ParentComponent from '@/components/ParentComponent'
import ChildComponent from '@/components/ChildComponent'

describe('ParentComponent', () => {
  it("displays 'Emitted!' when custom event is emitted", () => {
    const wrapper = shallowMount(ParentComponent)
    wrapper.find(ChildComponent).vm.$emit('custom')
    expect(wrapper.html()).toContain('Emitted!')
  })
})
```

8.初始化组件的参数和data

```js 
wrapper.setData({ count: 10 })

wrapper.setProps({ foo: 'bar' })
```