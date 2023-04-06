### list 对象，根据属性去重

```java
// 使用循环的方式
List<Map<String, String>> list = new ArrayList<>();
final List<String> keys = Arrays.asList("a", "b", "c", "c");
for (String key : keys) {
    Map<String, String> map = new HashMap<>();
    map.put("key", key);
    list.add(map);
}

List<Map<String, String>> distinctList = list.stream().collect(
                Collectors.collectingAndThen(
                        Collectors.toCollection(() -> new TreeSet<>(Comparator.comparing(o -> o.get("key")))), ArrayList::new));
System.out.println(list);
System.out.println(distinctList);
// [{key=a}, {key=b}, {key=c}, {key=c}]
// [{key=a}, {key=b}, {key=c}]
```