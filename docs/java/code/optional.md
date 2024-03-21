### 使用场景 

> 为了解决空指针异常（npe），Java 8 引入了一个新的 Optional 类。Optional 类已经成为类库的一部分，用来解决空指针异常。

### 创建Optional 类

Optional 类（java.util.Optional）是一个容器类，代表一个值存在或不存在。使用它来替代 null 值。

```java
final String name = "Java";
// Optional.ofNullable - allows passed parameter to be null.
Optional<String> opt = Optional.ofNullable(name);

```
### 判断值是否存在

Optional 类有很多有用的方法。例如，isPresent() 和 ifPresent() 方法用来检查值是否存在：

```java
if (opt.isPresent()) {
    // ...
}
opt.ifPresent(name -> System.out.println(name.charAt(0)));
```

### 返回默认值

 > 使用 orElse() 和 orElseGet() 方法可以返回默认值。

```java
String text = null;
System.out.println(Optional.ofNullable(text).orElse(sout());
System.out.println(Optional.ofNullable(text).orElseGet(() -> sout()));

public String sout() {
    System.out.println("orElseGet");
    return "orElseGet";
}

// orElse 任然会执行，所有优先使用 orElseGet，跳过不必要的计算
```

两者的区别在于 orElse() 方法将传入的字符串作为默认值，orElseGet() 方法可以接受 Supplier 接口的实现用来生成默认值。orElseGet() 方法在默认值需要计算时的性能优于 orElse() 方法。
无论是否存在值 orElse 里面的方法都会执行，orElseGet 里面的方法只有在值不存在的时候才会执行。


### 抛出异常

> 使用 orElseThrow() 方法可以抛出异常。

```java
String text = null;
System.out.println(Optional.ofNullable(text).orElseThrow(IllegalArgumentException::new));
```

### map() 和 flatMap() 方法

> Optional 类有两个有用的方法：map() 和 flatMap()。这两个方法与 Stream API 中的同名方法类似。map() 方法接受 lambda 表达式作为参数。这个 lambda 表达式对 Optional 的值调用。flatMap() 方法与 map() 方法类似，区别在于 lambda 表达式的返回类型。map() 方法的 lambda 表达式返回值可以是任何类型，而 flatMap() 方法的 lambda 表达式返回值必须是 Optionl 实例。

```java
Optional<String> upperName = opt.map(String::toUpperCase);
System.out.println(upperName.orElse("No value found"));
```

### filter() 方法

> filter() 方法接受 lambda 表达式作为参数。lambda 表达式返回一个 boolean 值。如果为 true，则返回一个包含当前 Optional 值的 Optional 对象。否则，返回一个空的 Optional 对象。

```java
Optional<String> longName = Optional.ofNullable("test").filter(name -> name.length() > 6);
System.out.println(longName.orElse("The name is less than 6 characters"));
```









