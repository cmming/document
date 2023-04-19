### stream 常用的操作

## 1. 生成流

### 1.1 通过集合生成

```java
List<String> list = new ArrayList<>();
list.add("a");
list.add("b");
list.add("c");
Stream<String> stream = list.stream();
```
### 1.2 通过数组生成

```java
String[] arr = {"a", "b", "c"};
Stream<String> stream = Arrays.stream(arr);
```
### 1.3 通过Stream的静态方法生成

```java
Stream<String> stream = Stream.of("a", "b", "c");
```

## 2. 中间操作

### 2.1 filter

> 过滤流中的元素，只保留符合条件的元素

```java
Stream<String> stream = Stream.of("a", "b", "c");
stream.filter(s -> s.equals("a")).forEach(System.out::println);
```
### 2.2 map

> 将流中的元素映射成另外一个元素，比如将String映射成Integer、将User映射成UserDTO等。
```java
Stream<String> stream = Stream.of("a", "b", "c");
stream.map(s -> s.toUpperCase()).forEach(System.out::println);
```
### 2.3 flatMap

> 将流中的元素映射成另外一个流，然后将所有流连接成一个流。
```java
Stream<List<String>> stream = Stream.of(Arrays.asList("a", "b"), Arrays.asList("c", "d"));
stream.flatMap(list -> list.stream()).forEach(System.out::println);
// 输出
// a
// b
// c
// d
```
### 2.4 distinct

> 去重， 通过流中元素的equals()和hashCode()方法去重。

```java
Stream<String> stream = Stream.of("a", "b", "c", "a");
stream.distinct().forEach(System.out::println);
// 输出
// a
// b
// c
```
### 2.5 sorted

> 排序，通过流中元素的compareTo()方法排序。

```java
Stream<String> stream = Stream.of("a", "b", "c", "a");
stream.sorted().forEach(System.out::println);
// 输出
// a
// a
// b
// c
```

## 3. 终止操作

### 3.1 forEach

> 遍历流中的元素。

```java
Stream<String> stream = Stream.of("a", "b", "c");
stream.forEach(System.out::println);
```
### 3.2 collect

> 将流转换成其他形式，接收一个Collector接口的实现，用于给Stream中元素做汇总的方法。

#### 3.2.1 toList

> 转成list
```java
Stream<String> stream = Stream.of("a", "b", "c");
List<String> list = stream.collect(Collectors.toList()); 
```

#### 3.2.2 toSet

> 转成set, 通过流中元素的equals()和hashCode()方法去重。
```java
Stream<String> stream = Stream.of("a", "b", "c");
Set<String> set = stream.collect(Collectors.toSet());
```

#### 3.2.3 toCollection

> 转成指定的集合类型 
```java
Stream<String> stream = Stream.of("a", "b", "c");
LinkedList<String> linkedList = stream.collect(Collectors.toCollection(LinkedList::new));
```

#### 3.2.4 counting

> 计数, 返回流中元素的总个数
```java
Stream<String> stream = Stream.of("a", "b", "c");
Long count = stream.collect(Collectors.counting());
```

#### 3.2.5 summingInt

> 求和, 返回流中元素的总和
```java
Stream<String> stream = Stream.of("a", "b", "c");
Integer sum = stream.collect(Collectors.summingInt(String::length));
```

#### 3.2.6 averagingInt

> 求平均值, 返回流中元素的平均值
```java
Stream<String> stream = Stream.of("a", "b", "c");
Double avg = stream.collect(Collectors.averagingInt(String::length));
```

#### 3.2.7 summarizingInt

> 统计, 返回IntSummaryStatistics对象，包含count、sum、min、average、max等信息。
```java
Stream<String> stream = Stream.of("a", "b", "c");
IntSummaryStatistics summaryStatistics = stream.collect(Collectors.summarizingInt(String::length));
```

#### 3.2.8 joining

> 连接字符串, 将流中的元素用指定的分隔符连接成一个字符串。
```java
Stream<String> stream = Stream.of("a", "b", "c");
String str = stream.collect(Collectors.joining());
```

#### 3.2.9 maxBy

> 最大值, 返回流中最大值
```java
Stream<String> stream = Stream.of("a", "b", "c");
Optional<String> max = stream.collect(Collectors.maxBy(Comparator.comparing(String::valueOf)));
```

#### 3.2.10 minBy

> 最小值, 返回流中最小值
```java
Stream<String> stream = Stream.of("a", "b", "c");
Optional<String> min = stream.collect(Collectors.minBy(Comparator.comparing(String::valueOf)));
```

#### 3.2.11 groupingBy

> 分组, 根据流中元素的某个属性进行分组。
```java
Stream<String> stream = Stream.of("a", "b", "c");
Map<Integer, List<String>> map = stream.collect(Collectors.groupingBy(String::length));
```

#### 3.2.12 partitioningBy

> 分区, 根据流中元素的某个属性是否满足条件进行分区。
```java
Stream<String> stream = Stream.of("a", "b", "c");
Map<Boolean, List<String>> map = stream.collect(Collectors.partitioningBy(s -> s.length() > 1));
```


### 3.3 reduce

> 将流中元素反复结合起来，得到一个值。例如，求和、求最大值、求最小值。

```java
Stream<String> stream = Stream.of("a", "b", "c");
String str = stream.reduce("", (a, b) -> a + b);
```
### 3.4 count

> 返回流中元素的总个数。
```java
Stream<String> stream = Stream.of("a", "b", "c");
long count = stream.count();
```
### 3.5 max

> 返回流中最大值。
```java
Stream<String> stream = Stream.of("a", "b", "c");
Optional<String> max = stream.max(Comparator.comparing(String::valueOf));
```

### 3.6 min

> 返回流中最小值。
```java
Stream<String> stream = Stream.of("a", "b", "c");
Optional<String> min = stream.min(Comparator.comparing(String::valueOf));
```

### 3.7 findFirst

> 返回流中的第一个元素。
```java
Stream<String> stream = Stream.of("a", "b", "c");
Optional<String> first = stream.findFirst();
```
### 3.8 findAny

> 返回当前流中的任意元素。
```java
Stream<String> stream = Stream.of("a", "b", "c");
Optional<String> any = stream.findAny();
```
### 3.9 anyMatch

> 检查是否匹配至少一个元素。

```java
Stream<String> stream = Stream.of("a", "b", "c");
boolean anyMatch = stream.anyMatch(s -> s.equals("a"));.
// true
```
### 3.10 allMatch

> 检查是否匹配所有元素。
```java
Stream<String> stream = Stream.of("a", "b", "c");
boolean allMatch = stream.allMatch(s -> s.equals("a"));
// false
```
### 3.11 noneMatch

> 检查是否没有匹配所有元素。

```java
Stream<String> stream = Stream.of("a", "b", "c");
boolean noneMatch = stream.noneMatch(s -> s.equals("a"));
```

## 4. 并行流

> 并行流可以把一个内容分成多个数据块，并用不同的线程分别处理每个数据块的内容。最后把每个线程处理的结果合并起来得到最终结果。
```java
Stream<String> stream = Stream.of("a", "b", "c");
stream.parallel().forEach(System.out::println);
```

## 5. 自定义流


```java
Stream<String> stream = Stream.generate(() -> "a").limit(10);
stream.forEach(System.out::println);
```

## 6. Stream的常用使用场景

### 6.1 数组对象根据属性去重

```java
List<User> list = new ArrayList<>();
list.add(new User(1, "张三"));
list.add(new User(2, "李四"));
list.add(new User(3, "王五"));
list.add(new User(4, "赵六"));
list.add(new User(5, "田七"));

List<User> newList = list.stream().collect(
        collectingAndThen(
                toCollection(() -> new TreeSet<>(comparingInt(User::getId))), ArrayList::new)
);
```

> 以上代码的意思是，先将list转换成TreeSet，TreeSet是有序的，然后再将TreeSet转换成ArrayList，这样就可以保证去重后的结果是有序的。

```java
// 使用map key去重
List<User> list = new ArrayList<>();
list.add(new User(1, "张三"));
list.add(new User(2, "李四"));
list.add(new User(3, "王五"));
list.add(new User(4, "赵六"));
list.add(new User(5, "田七"));

final Map<String, User> userMap = list.stream().collect(Collectors.toMap(e -> e.getId(), e -> e, (k1, k2) -> k1)).values();
System.out.println(userMap.values());
```

> 以上代码的意思是，先将list转换成Map，然后再将Map转换成ArrayList，这样就可以保证去重后的结果是有序的。而且，这种方法的效率要比上面的方法高，编写起来也更加简洁。









