# 常见数据类型问题

## 1、Arrays.asList()不能使用add和remove方法的原因

```java
private static void testArrayAsList() {
    Integer[] i = {128,12,1};
    // List<Integer> list1 = new java.util Arrays.ArrayList(i);
    // java.util Arrays.ArrayList 类是一个静态内部类 没有add方法
    List<Integer> list = Arrays.asList(i);
//        list.add(123);
    System.out.println(list);
    // 解决方法 java.util.ArrayList 强制转换一下
    list = new ArrayList(list);
    list.add(456);
    System.out.println(list);
}
```
## 2、List删除元素

```java
private static void testListRemove() {
    List<String> list = new ArrayList<>();
    list.add("a");
    list.add("b");
    list.add("c");
    list.add("d");
    try {
        for (String s : list) {
            list.remove(s);
        }
    } catch (Exception e) {
        // java.util.ConcurrentModificationException
        System.out.println(e.getClass().getName());
    }
    System.out.println(list);
    Iterator<String> it = list.iterator();
    while(it.hasNext()){
        String x = it.next();
        it.remove();
    }
    System.out.println(list);


}
```