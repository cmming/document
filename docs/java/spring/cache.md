## 作用

> 加速接口响应速度、降低数据库压力

## cacheManager

> 缓存管理器，管理各种缓存组件

```java

@Configuration
@EnableCaching
public class CacheConfig {

    @Bean
    public CacheManager cacheManager(RedisConnectionFactory redisConnectionFactory) {
        // 生成一个默认配置，通过config对象即可对缓存进行自定义配置
        RedisCacheConfiguration config = RedisCacheConfiguration.defaultCacheConfig();
        // 设置缓存的默认过期时间，也是使用Duration设置
        config = config.entryTtl(Duration.ofMinutes(1))
                // 设置 key为string序列化
                .serializeKeysWith(RedisSerializationContext.SerializationPair.fromSerializer(new StringRedisSerializer()))
                // 设置value为json序列化
                .serializeValuesWith(RedisSerializationContext.SerializationPair.fromSerializer(new GenericJackson2JsonRedisSerializer()))
                // 不缓存空值
                .disableCachingNullValues();

        // 使用自定义的缓存配置初始化一个cacheManager
        return RedisCacheManager
                .builder(redisConnectionFactory)
                .cacheDefaults(config)
                .build();
    }
}
```

## 常用注解

> @Cacheable、@CachePut、@CacheEvict、@Caching、@CacheConfig

### @Cacheable

> 将方法的运行结果进行缓存，以后再要相同的数据，直接从缓存中获取，不用调用方法。 例如：分页接口、用户信息详情

```java
@Cacheable(value = "user", key = "#id")
public User getUserById(String id) {
    return new User();
}
```

### @CachePut

> 即调用方法，又更新缓存数据，同步更新缓存。例如：修改用户信息、新增用户信息

```java
@CachePut(value = "user", key = "#user.id")
public User store(User user) {
    return this.getDao().save(user);
}
```

### @CacheEvict

> 清除缓存

```java

@CacheEvict(value = "user", key = "#id")
public void delete(String id) {
    this.getDao().deleteById(id);
}
```

### @Caching

> 组合注解，可以在一个方法上同时指定多个缓存操作，是@Cacheable、@CachePut、@CacheEvict的组合。例如删除了一条用户的数据，需要删掉用户详情的缓存、同时删掉用户列表的缓存

```java
@Caching(
        cacheable = {
                @Cacheable(value = "user", key = "#id")
        },
        put = {
                @CachePut(value = "userPage", allEntries = true)
        }
)
public User deleteUserById(String id) {
    return new User();
}
```

### @CacheConfig

> 在类上指定缓存的公共配置，这样在方法上就不用指定缓存的配置了

```java

@CacheConfig(cacheNames = "user")
public class UserServiceImpl implements UserService {

    @Override
    @Cacheable(key = "#id")
    public User getUserById(String id) {
        return new User();
    }
}
```

## 常用属性

> cacheNames、key、keyGenerator、cacheManager、cacheResolver、condition、unless、sync、allEntries、beforeInvocation、

### cacheNames

> 指定缓存组件的名字

```java
@Cacheable(value = "user", key = "#id")
public User getUserById(String id) {
    return new User();
}
```

### key

> 缓存数据使用的key，可以用它来指定。默认是使用方法参数的值

```java
@Cacheable(value = "user", key = "#id")
public User getUserById(String id) {
    return new User();
}
```

### keyGenerator

> key的生成器，可以自己指定key的生成器的组件id


### cacheManager

> 指定缓存管理器，或者cacheResolver指定获取解析器


### cacheResolver

> 缓存解析器，可以自己指定缓存解析器的组件id


### condition

> 指定符合条件的情况下才缓存，例如：condition = "#id>0"，当id大于0时才缓存


### unless

> 否定缓存，当unless指定的条件为true，方法的返回值就不会被缓存，可以获取到结果进行判断，例如：unless = "#result == null"，当结果为null时不缓存

### sync

> 是否使用异步模式，如果为true，用于控制并发访问时的同步策略，为true时，@Cacheable会用同步锁保证多线程中只会有一个线程访问未缓存的缓存项，其它项需要等待到该缓存项目被缓存后才能访问到该缓存项。默认为false。


