## 配置文件中的取值

> 作为配置类的取值途径，将配置文件中的值注入到变量中

```java
    @Value("#{systemProperties['os.name']}")
    private String osName;
```

## 变量取值

> 通过表达式去变量中取值

```java
# 使用id作为缓存的key，如果缓存中有值，就直接返回，如果没有值，就执行方法，将返回值放入缓存中
@Cacheable(value = "user", key = "#id")
public User getUserById(String id) {
    return new User();
}
```
## 关键字

| 关键字 | 说明 |
| --- | --- |
| this | 当前bean |
| root | 当前根对象 |
| target | 当前目标对象 |
| args | 当前方法参数对象数组 |
| #root.methodName | 当前方法名 |
| #root.target | 当前目标对象 |
| #root.targetClass | 当前目标对象类 |
| #root.args | 当前方法参数对象数组 |
| #root.caches | 当前缓存对象数组 |
| #root.caches[0].name | 当前缓存对象数组中第一个缓存的名字 |
| #root.caches[0].key | 当前缓存对象数组中第一个缓存的key |
| #root.caches[0].condition | 当前缓存对象数组中第一个缓存的condition |
| #root.caches[0].unless | 当前缓存对象数组中第一个缓存的unless |
| #result | 方法执行后的返回值 |
| #argument | 方法参数的别名，如#argument[0]、#p0、#a0都是第一个参数 |
| #result.id | 方法执行后的返回值的id属性 |
| #a0 | 方法参数中的第一个参数 |
| #p0 | 方法参数中的第一个参数 |


```java
    # 正常key都是取入参作为key，如果需要取返回值作为key，可以使用#result.id
    @Cacheable(value = "user", key = "#result.id")
    public User store(User user) {
        return this.getDao().save(user);
    }
```


## 类似技术

> jsonPath 也可以最为一个类似的技术，但是它是用来解析json的，而spel是用来解析表达式的，所以它们的应用场景是不一样的


