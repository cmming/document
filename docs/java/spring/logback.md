## Logback

> 优点：性能高，功能强大，配置简单，支持groovy脚本，支持多种日志格式，支持多种日志输出方式，支持多种日志分割方式，支持多种日志存储方式，支持多种日志过滤方式，支持多种日志级别

> 缺点：配置文件复杂，不支持动态修改配置，不支持动态修改日志级别


### springboot中扩展

#### 依赖springboot内置的，然后扩展 ELK

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE configuration>
<configuration>
    <springProperty scope="context" name="appName" source="spring.application.name" defaultValue="demo"/>
    <!--帮助文档 https://docs.spring.io/spring-boot/docs/current/reference/html/spring-boot-features.html#boot-features-logging-->
    <include resource="org/springframework/boot/logging/logback/base.xml"/>
    <!--输出到logstash的appender-->
    <appender name="LOGSTASH" class="net.logstash.logback.appender.LogstashTcpSocketAppender">
        <!--可以访问的logstash日志收集端口-->
        <destination>10.122.3.52:4560</destination>
        <encoder charset="UTF-8" class="net.logstash.logback.encoder.LogstashEncoder">
            <customFields>{"appName":"${appName}"}</customFields>
        </encoder>
    </appender>
    <root level="INFO">
        <!--<appender-ref ref="CONSOLE"/>-->
        <!--<appender-ref ref="FILE"/>-->
        <appender-ref ref="LOGSTASH"/>
    </root>
</configuration>
```

#### 使用springboot的配置文件

> 通过 springProperty 标签，可以将配置文件中的属性注入到logback.xml中

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE configuration>
<configuration>
    <springProperty scope="context" name="appName" source="spring.application.name" defaultValue="demo"/>
    <!--帮助文档 https://docs.spring.io/spring-boot/docs/current/reference/html/spring-boot-features.html#boot-features-logging-->
    <include resource="org/springframework/boot/logging/logback/base.xml"/>
    <!--输出到logstash的appender-->
    <appender name="LOGSTASH" class="net.logstash.logback.appender.LogstashTcpSocketAppender">
        <!--可以访问的logstash日志收集端口-->
        <destination>
            ${logstash.host}:${logstash.port}
        </destination>
        <encoder charset="UTF-8" class="net.logstash.logback.encoder.LogstashEncoder">
            <customFields>{"appName":"${appName}"}</customFields>
        </encoder>
    </appender>
    <root level="INFO">
        <!--<appender-ref ref="CONSOLE"/>-->
        <!--<appender-ref ref="FILE"/>-->
        <appender-ref ref="LOGSTASH"/>
    </root>
</configuration>
```


#### elk搭建参考文章

> https://www.jianshu.com/p/203447e25ad5