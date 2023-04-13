## 使用场景
> 入参和返回值相同，只是业务逻辑不同。比如：数据转换，数据校验，数据加密、支付等。

## 代码实现

1、 定义策略枚举

```java
public enum StrategyEnum {
    /**
     * 数据转换
     */
    CONVERT("convert", "数据转换"),
    /**
     * 数据校验
     */
    VALIDATE("validate", "数据校验"),
    /**
     * 数据加密
     */
    ENCRYPT("encrypt", "数据加密"),
    /**
     * 支付
     */
    PAY("pay", "支付");

    private String code;
    private String desc;

    StrategyEnum(String code, String desc) {
        this.code = code;
        this.desc = desc;
    }

    public String getCode() {
        return code;
    }

    public String getDesc() {
        return desc;
    }
}
```

2、 定义策略接口

```java

public interface IStrategy<T> {

    /**
     * 获取策略枚举
     *
     * @return
     */
    StrategyEnum getStrategyEnum();
    /**
     * 执行策略
     *
     * @param t
     * @return
     */
    T execute(T t);
}
```


3、 定义策略实现类

```java
@Component
public class ConvertStrategy implements IStrategy<String> {

    @Override
    public StrategyEnum getStrategyEnum() {
        return StrategyEnum.CONVERT;
    }

    @Override
    public String execute(String s) {
        return s + " convert";
    }
}
```

```java
@Component
public class ValidateStrategy implements IStrategy<String> {

    @Override
    public StrategyEnum getStrategyEnum() {
        return StrategyEnum.VALIDATE;
    }

    @Override
    public String execute(String s) {
        return s + " validate";
    }
}
```
4、 注册策略

> 通过spring的ApplicationContextAware接口，获取所有实现了IStrategy接口的bean，然后放入map中。

```java
@Component
public class StrategyFactory implements ApplicationContextAware {

    private static Map<IStrategy, IStrategy> strategyMap = new HashMap<>();

    @Autowired
    public StrategyFactory(List<IStrategy> strategyList) {
        strategyList.forEach(strategy -> strategyMap.put(strategy.getStrategyEnum().getCode(), strategy));
    }

    public static IStrategy getStrategy(String code) {
        return strategyMap.get(code);
    }

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        // do nothing
        Map<String, IStrategy> iStrategyMap = applicationContext.getBeansOfType(IStrategy.class);
        iStrategyMap.forEach((k, v) -> strategyMap.put(v.getStrategyEnum(), v));
    }
}
```

5、 使用策略

```java
public class StrategyTest {

    public static void main(String[] args) {
        IStrategy strategy = StrategyFactory.getStrategy(StrategyEnum.CONVERT);
        System.out.println(strategy.execute("hello"));
    }
}
```

