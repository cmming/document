# Js 高阶函数 HOF

> 高阶函数（Higher-order function）英文简称 HOF。

## 什么是「高阶函数」

简单来说，就是：接受函数式参数或者返回函数的函数称为「高阶函数」。

也就是说「高阶函数」是指至少满足下列条件之一的函数：

- 函数可以作为参数被传递
- 函数可以作为返回值输出

## 例子

### promise 

```javascript
// 将请求的返回值以函数的形式返回
new promise((resolve,reject)=>{
    axios.get(url).then(res=>{
        resolve(res)
    }).catch(err=>{
        reject(err)
    })
})

```

### 属性代理

> 为组件初始化默认属性

```javascript

function father(son){
    var a = '父类的属性'

    return son({a:a})
}

function son(a){
    console.log(a)
}

console.log(father(son))
// 输出 {a: "父类的属性"}

```


### 方法继承

> 为组件添加生命周期

```javascript

function before(){
    console.log('before')
}

function after(){
    console.log('before')
}


function decorator(fun){
    before()
    fun()
    after()
}

function fun(){
    console.log('fun')
}

console.log(decorator(fun))
// 输出
// before
// fun
// before

```
### 自定义一个react 的高阶组件

```javascript


function WapperHello (Comp){
	class WaperCom extends React.Component{
		componentDidMount(){
			console.log('新增生命周期 属性代理：对子组件的参数属性进行过滤处理',this.props)
		}
		render(){
			return (
				<div>
					<p>高阶组件</p>
					<Comp {...this.props}></Comp>
				</div>
			)
		}
	}

	return WaperCom
}

@WapperHello
class Hello extends React.Component {
	render() {
		return (
			<div>
				hello chmi welcome react!!
			</div>
		)
	}
}

```


### vue 中的 mixin

[参考官网](https://cn.vuejs.org/v2/api/#Vue-mixin)

```javascript

const hi = {
    methods: {
        sayHello: function() {
            console.log('hello from mixin!')
        }
    },
    mounted() {
            this.sayHello()
        }
    }

    //vue instance or component
    new Vue({
    el: '#app',
    mixins: [hi],
    methods: {
        sayHello: function() {
            console.log('hello from Vue instance!')
        }
    },
    mounted() {
        this.sayHello()
    }
})

// Output in console 
// hello from Vue instance! sayHello 被重写

```
