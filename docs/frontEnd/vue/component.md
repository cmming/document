# 组件

## 参数传递

```html
//ComponentParams.vue
<template>
    <div>
        {{params}}
    </div> 
</template>
<script>
export default{
    name:"ComponentParams",
    props:{
        params:{
            type:String,
            default:""
        }
    }
}
</script>          


//调用
<component-params :params="params"></component-params>
<script>
import ComponentParams from 'ComponentParams'
export default{
    component:{
        ComponentParams
    },
    data(){
        return{
            params:"this is a"
        }
    }
}
</script> 
```

## 事件绑定

> 用于返回操作结果

```html
//ComponentParams.vue
<template>
    <div @click="clickEvent">
        {{params}}
    </div> 
</template>
<script>
export default{
    name:"ComponentParams",
    props:{
        params:{
            type:String,
            default:""
        }
    },
    methods:{
        clickEvent(){
            this.params = this.params++
            this.$emit('callBackClick',this.params)
        }
    }

}
</script>          


//调用
<component-params :params="params" @callBackClick="callBackClick"></component-params>
<script>
import ComponentParams from 'ComponentParams'
export default{
    component:{
        ComponentParams
    },
    data(){
        return{
            params:"this is a"
        }
    },
    methods:{
        callBackClick(data){
            console.log('this is callback response:'+data)
        }
    }
}
</script> 
```

## slot

> 传递 html



```html
//ComponentParams.vue
<template>
    <div @click="clickEvent">
        {{params}}
        <slot name="custom-html"></slot>
    </div> 
</template>
<script>
export default{
    name:"ComponentParams",
    props:{
        params:{
            type:String,
            default:""
        }
    },
    methods:{
        clickEvent(){
            this.params = this.params++
            this.$emit('callBackClick',this.params)
        }
    }

}
</script>          


//调用
<component-params :params="params" @callBackClick="callBackClick">
    <div slot="custom-html"> this is custom-html </div>
</component-params>
<script>
import ComponentParams from 'ComponentParams'
export default{
    component:{
        ComponentParams
    },
    data(){
        return{
            params:"this is a"
        }
    },
    methods:{
        callBackClick(data){
            console.log('this is callback response:'+data)
        }
    }
}
</script> 
```



