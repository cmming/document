## 使用场景

>  有些字段是必填的，如果不填写就提交，就会报错，这时候我们可以使用校验注解来解决这个问题。入参校验是在方法执行前进行校验的，如果校验不通过，就会返回错误信息，不会执行方法。避免了在方法体内进行大量的校验操作。

## 使用方法

### 1. 添加依赖

```xml

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
```

### 2. 在实体类的字段上添加校验注解

```java
public class User {
    @NotNull(message = "用户名不能为空")
    private String username;
    @NotNull(message = "密码不能为空")
    private String password;
}
```

### 3. 在controller方法上添加@Validated注解

```java

@RestController
@Validated
public class UserController {

    @PostMapping("/user")
    public String addUser(@RequestBody @Valid User user) {
        return "success";
    }
}
```

### 4、 校验分组

> 有时候我们需要对同一个实体类的同一个字段进行不同的校验，这时候我们可以使用分组的方式来解决这个问题。

```java

public class User {
    @NotNull(message = "用户名不能为空", groups = {Add.class})
    private String username;
    @NotNull(message = "密码不能为空", groups = {Add.class, Update.class})
    private String password;
}
```

```java

@RestController
@Validated
public class UserController {

    @PostMapping("/user")
    public String addUser(@RequestBody @Validated(Add.class) User user) {
        return "success";
    }

    @PutMapping("/user")
    public String updateUser(@RequestBody @Validated(Update.class) User user) {
        return "success";
    }
}
```

### 5、 自定义校验注解

> 有时候我们需要对同一个实体类的同一个字段进行不同的校验，这时候我们可以使用分组的方式来解决这个问题。

```java

@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = {PhoneValidator.class})
public @interface Phone {

    String message() default "手机号格式不正确";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
```

```java

public class PhoneValidator implements ConstraintValidator<Phone, String> {

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (StringUtils.isEmpty(value)) {
            return true;
        }
        String regex = "^1[3|4|5|7|8][0-9]\\d{8}$";
        return Pattern.matches(regex, value);
    }
}
```

```java

public class User {
    @NotNull(message = "用户名不能为空", groups = {Add.class})
    private String username;
    @NotNull(message = "密码不能为空", groups = {Add.class, Update.class})
    private String password;
    @Phone
    private String phone;
}
```

```java

@RestController
@Validated
public class UserController {

    @PostMapping("/user")
    public String addUser(@RequestBody @Validated(Add.class) User user) {
        return "success";
    }

    @PutMapping("/user")
    public String updateUser(@RequestBody @Validated(Update.class) User user) {
        return "success";
    }
}
```