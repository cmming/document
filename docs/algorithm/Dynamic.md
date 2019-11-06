### 最少找零

```js

function makeChange(coins,amount){
    // 将 小于 amount的所有找零进行缓存 所以大量计算可以使用 
    var cache = {}
    function makeChangeDetail(amount){
        // console.log(amount,cache)
        if(!amount) {return []}
        if(cache[amount]) {return cache[amount]}
        var min = [], newMin, newAmount
        // 将所有的数据进行缓存
        coins.map(function(coin){
            newAmount = amount - coin
            if(newAmount>=0){
                newMin = makeChangeDetail(newAmount)
            }
            if (newAmount >= 0 && 
                (newMin.length < min.length - 1 || !min.length) && 
                (newMin.length || !newAmount)) {
                min = [coin].concat(newMin)
            }
        })
        return (cache[amount] = min)
    }
    makeChangeDetail(amount)
    console.log(cache)
    return cache[amount]

}
console.log(makeChange([1,5,10,25],36))
```

### 贪心模式

> 1,5,10,25 4中硬币，组合为36最少的硬币数量

>通过最优解的方式解决
```js

function makeChange(coins,amount){
    var change = []
    var total = 0
    coins.sort(function(a,b){return b-a}).map(function(coin){
        function makeChangeDetail(){
            if((total + coin)<=amount){
                change.push(coin)
                total+=coin
                makeChangeDetail()
            }
        }
        makeChangeDetail()
    })
    return change
}

console.log(makeChange([1,5,10,25],34))

```


### 背包问题

 3种物品的属性为(3,2),(4,3),(5,4) ，重量最大为5，怎么背价值最大的物品
 {3:2,4:3,5:4}

