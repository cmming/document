## Set

### 去重

```js
function unique(arr) {
    return [...new Set(arr)]
}
```

### 完成集合功能

```js
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);
// 并集，去多个数组中的唯一，合并加去重
let union = new Set([...a,...b])
// Set {1, 2, 3, 4}
// 交集
let intersect = new Set([...a].filter(x => b.has(x)))
// set {2, 3}
// 差集
let difference = new Set([...a].filter(x => !b.has(x)));
// Set {1}
```


## Map

> 开发时不确定键值对里面的键的名称，那么你需要用Map

```js
var myMap = new Map();

var keyObj = {},
    keyFunc = function () { return 'hey'},
    keyString = "a string";

myMap.set(keyString, "value associated with 'a string'");
myMap.set(keyObj, "value associated with keyObj");
myMap.set(keyFunc, "value associated with keyFunc");

console.log(myMap.get(keyFunc));
```


## 总结

1. Set 和 Map 主要的应用场景在于 数据重组 和 数据储存


