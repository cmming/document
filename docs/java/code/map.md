### map中元素追加

```java
// 使用循环的方式
Map<String, List<String>> map = new HashMap<>();
for (String key : keys) {
    List<String> list = map.get(key);
    if (list == null) {
        list = new ArrayList<>();
        map.put(key, list);
    }
    list.add("value");
}
// 使用computeIfAbsent方法
final Map<String, List<String>> map = new HashMap<>();
map.computeIfAbsent("key", k -> new ArrayList<>()).add("value");
```