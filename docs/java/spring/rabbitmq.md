## RabbitMQ 

### 1. RabbitMQ简介

RabbitMQ是一个开源的消息代理和队列服务器，用来通过普通协议在完全不同的应用之间共享数据，RabbitMQ是使用Erlang语言编写的，并且RabbitMQ是基于AMQP协议的。

### 2. 主要概念

#### 2.1. 消息代理

消息代理是指实现了传递消息的功能，它一般会占用一个端口，客户端连接到该端口，就可以与消息代理通信，消息代理可以接收客户端发送的消息，也可以将消息发送给客户端。

#### 2.2. 队列

队列是消息的容器，它可以存储消息，直到消息被消费者接收，队列一般是在消息代理上进行管理的，消息代理可以创建、删除队列，也可以为队列设置属性。

#### 2.3. 消息

消息是指在消息代理和应用程序之间传递的数据，消息由消息头和消息体组成，消息头包含一些附加信息，比如消息的优先级、消息的路由规则等，消息体是消息的实际内容。

#### 2.4. 虚拟主机

虚拟主机是指在消息代理上创建的虚拟的消息代理，它拥有自己的队列、交换器、绑定和权限机制，虚拟主机是一个独立的服务器，拥有自己的队列、交换器、绑定和权限机制，一个消息代理可以创建多个虚拟主机，虚拟主机之间是相互隔离的，同一个消息代理上的两个不同的虚拟主机之间可以有相同的队列、交换器、绑定和用户，但是它们之间的消息不会互相影响。

#### 2.5. 交换器

交换器是消息的入口，它一方面从生产者接收消息，另一方面将消息发送给队列，交换器根据消息的路由键将消息发送给队列，交换器有四种类型：direct、fanout、topic、headers。

#### 2.6. 绑定

绑定是交换器和队列之间的虚拟连接，它指定了消息的路由规则，绑定可以将交换器和队列绑定在一起，也可以将交换器和交换器绑定在一起。

#### 2.7. 路由键

路由键是交换器将消息发送给队列的依据，它是一个字符串，交换器根据路由键将消息发送给队列，路由键和绑定的路由键匹配时，交换器才会将消息发送给队列。

#### 2.8. 生产者

生产者是指发送消息的应用程序，它创建消息，然后将消息发送给消息代理。

#### 2.9. 消费者

消费者是指接收消息的应用程序，它从消息代理中接收消息，然后处理消息。


### 3. RabbitMQ的exchange类型

RabbitMQ的exchange类型有四种：direct、fanout、topic、headers。每种类型的exchange都有不同的路由规则(修饰路由键的匹配规则)，下面分别介绍这四种类型的exchange。 

#### 3.1. direct

direct类型的exchange根据消息的路由键将消息发送给队列，它是完全匹配的方式，如果消息的路由键和绑定的路由键一致，那么交换器就将消息发送给队列。

```java
    @RabbitListener(bindings = @QueueBinding(
            exchange = @Exchange(value = "myOrder", type = ExchangeTypes.DIRECT),
            key = "fruit",
            value = @Queue("fruitOrderQueue")
    ))
    public void processFruit(String message) {
        log.info("fruitOrderQueue: {}", message);
    }

    @RabbitListener(bindings = @QueueBinding(
            exchange = @Exchange(value = "myOrder", type = ExchangeTypes.DIRECT),
            key = "computer",
            value = @Queue("computerOrderQueue")
    ))
    public void processComputer(String message) {
        log.info("computerOrderQueue: {}", message);
    }
```


#### 3.2. fanout

fanout类型的exchange会将消息发送给所有绑定在该交换器上的队列，它不需要路由键，只需要简单的将队列绑定在交换器上即可。

```java
// 例如：将队列a、队列b、队列c绑定在交换器上，那么交换器就会将消息发送给队列a、队列b、队列c

    @RabbitListener(bindings = @QueueBinding(
            exchange = @Exchange(value = "myOrder", type = ExchangeTypes.FANOUT),
            value = @Queue("fruitOrderQueue")
    ))
    public void processFruit(String message) {
        log.info("fruitOrderQueue: {}", message);
    }

    @RabbitListener(bindings = @QueueBinding(
            exchange = @Exchange(value = "myOrder", type = ExchangeTypes.FANOUT),
            value = @Queue("computerOrderQueue")
    ))
    public void processComputer(String message) {
        log.info("computerOrderQueue: {}", message);
    }
```

#### 3.3. topic

topic类型的exchange根据消息的路由键将消息发送给队列，它是模糊匹配的方式，它和direct类型的exchange相比，多了两个通配符：*和#，其中*表示匹配一个单词，#表示匹配零个或多个单词。

```java
// * 表示匹配一个单词
// # 表示匹配零个或多个单词
// 例如：*.user.* 表示匹配以user为单词的路由键，比如：a.user.b、a.user、user.b等
// 例如：#.user.# 表示匹配包含user的路由键，比如：a.user.b、a.user、user.b、a.user.b.c等

    @RabbitListener(bindings = @QueueBinding(
            exchange = @Exchange(value = "myOrder", type = ExchangeTypes.TOPIC),
            key = "*.user.*",
            value = @Queue("fruitOrderQueue")
    ))
    public void processFruit(String message) {
        log.info("fruitOrderQueue: {}", message);
    }

    // 发送消息时，路由键为：a.user.b
    // 接收消息时，路由键为：*.user.*，所以消息会被接收
    // 发送消息时，路由键为：a.user，接收消息时，路由键为：*.user.*，所以消息不会被接收
    public void send() {
        amqpTemplate.convertAndSend("myOrder", "a.user.b", "hello");
    }

    @RabbitListener(bindings = @QueueBinding(
            exchange = @Exchange(value = "myOrder", type = ExchangeTypes.TOPIC),
            key = "#.user.#",
            value = @Queue("computerOrderQueue")
    ))
    public void processComputer(String message) {
        log.info("computerOrderQueue: {}", message);
    }

    // 发送消息时，路由键为：a.user.b
    // 接收消息时，路由键为：#.user.#，所以消息会被接收
    // 发送消息时，路由键为：a.user，接收消息时，路由键为：#.user.#，所以消息会被接收
    public void send() {
        amqpTemplate.convertAndSend("myOrder", "a.user.b", "hello");
    }
    public void send() {
        amqpTemplate.convertAndSend("myOrder", "a.user", "hello");
    }
```

#### 3.4. headers

headers类型的exchange根据消息的headers将消息发送给队列，它不需要路由键，而是根据消息的headers来匹配，它是完全匹配的方式，如果消息的headers和绑定的headers一致，那么交换器就将消息发送给队列。

```java
// 例如：将队列a、队列b、队列c绑定在交换器上，同时设置headers为{a=1, b=2, c=3}，那么交换器就会将消息发送给队列a、队列b、队列c

    @RabbitListener(bindings = @QueueBinding(
            exchange = @Exchange(value = "myOrder", type = ExchangeTypes.HEADERS),
            value = @Queue("fruitOrderQueue"),
            arguments = {
                    @Argument(name = "a", value = "1"),
                    @Argument(name = "b", value = "2"),
                    @Argument(name = "c", value = "3")
            }
    ))
    public void processFruit(String message) {
        log.info("fruitOrderQueue: {}", message);
    }

    // 发送消息时，headers为{a=1, b=2, c=3}
    // 接收消息时，headers为{a=1, b=2, c=3}，所以消息会被接收
    // 发送消息时，headers为{a=1, b=2}，接收消息时，headers为{a=1, b=2, c=3}，所以消息不会被接收
    public void send() {
        MessageProperties messageProperties = new MessageProperties();
        messageProperties.setHeader("a", "1");
        messageProperties.setHeader("b", "2");
        messageProperties.setHeader("c", "3");
        Message message = new Message("hello".getBytes(), messageProperties);
        amqpTemplate.convertAndSend("myOrder", "", message);
    }

    @RabbitListener(bindings = @QueueBinding(
            exchange = @Exchange(value = "myOrder", type = ExchangeTypes.HEADERS),
            value = @Queue("computerOrderQueue"),
            arguments = {
                    @Argument(name = "a", value = "1"),
                    @Argument(name = "b", value = "2"),
                    @Argument(name = "c", value = "3")
            }
    ))
    public void processComputer(String message) {
        log.info("computerOrderQueue: {}", message);
    }

    // 发送消息时，headers为{a=1, b=2, c=3}
    // 接收消息时，headers为{a=1, b=2, c=3}，所以消息会被接收
    // 发送消息时，headers为{a=1, b=2}，接收消息时，headers为{a=1, b=2, c=3}，所以消息不会被接收
    public void send() {
        MessageProperties messageProperties = new MessageProperties();
        messageProperties.setHeader("a", "1");
        messageProperties.setHeader("b", "2");
        messageProperties.setHeader("c", "3");
        Message message = new Message("hello".getBytes(), messageProperties);
        amqpTemplate.convertAndSend("myOrder", "", message);
    }
```

### 4. RabbitMQ的消息确认机制

RabbitMQ的消息确认机制有两种：生产者确认和消费者确认。

#### 4.1. 生产者确认

生产者确认是confirm确认模式，指生产者发送消息到队列后，队列会给生产者一个回执，告诉生产者消息是否发送成功，如果消息发送成功，那么生产者就可以发送下一条消息，如果消息发送失败，那么生产者就需要重发消息，直到消息发送成功。

```java
// 开启消息确认机制
spring.rabbitmq.publisher-confirms=true
// 消息确认机制类型 simple、correlated、none
// correlated：这种模式下，生产者会为每个发送的消息等待一个确认。当 RabbitMQ 接收到消息并将其写入磁盘后，它会发送一个确认消息给生产者。这种模式可以确保每个消息都被 RabbitMQ 正确接收，但是由于需要等待确认，所以发送消息的速度会比较慢。

// simple：这种模式下，生产者只会等待最新发送的消息的确认。也就是说，如果生产者连续发送了多个消息，它只会等待最后一个消息的确认。这种模式的发送速度比 correlated 模式快，但是如果 RabbitMQ 在接收消息时出现问题，可能会丢失消息。

// none：这种模式下，生产者不会等待任何确认。它会立即发送下一个消息，不管前一个消息是否已经被 RabbitMQ 正确接收。这种模式的发送速度最快，但是如果 RabbitMQ 在接收消息时出现问题，消息可能会丢失。
spring.rabbitmq.publisher-confirm-type=simple

```

```java
    @Autowired
    private RabbitTemplate rabbitTemplate;

    public void send() {
        // 发送消息
        rabbitTemplate.convertAndSend("myOrder", "fruit", "hello");
        // 添加确认回调
        rabbitTemplate.setConfirmCallback((correlationData, ack, cause) -> {
            if (ack) {
                log.info("ConfirmCallback 关联数据：{},投递成功,确认情况：{}", correlationData, true);
            } else {
                log.info("ConfirmCallback 关联数据：{},投递失败,确认情况：{}，原因：{}", correlationData, false, cause);
            }
        });
    }
```



#### 4.2. 消费者确认

消费者确认是指return 退回模式，消费者接收到消息后，消费者会给队列一个回执，告诉队列消息是否处理成功，如果消息处理成功，那么队列就会将消息从队列中删除，如果消息处理失败，那么队列就会将消息重新发送给消费者，直到消息处理成功。



#### 4.2.1 添加配置

```java
// 开启消息返回机制
spring.rabbitmq.publisher-confirms=true
// 消息返回机制类型
spring.rabbitmq.publisher-confirm-type=correlated
```
#### 4.2.2 添加配置类

```java
@Configuration
public class RabbitConfig {

    @Autowired
    private ConnectionFactory connectionFactory;

    @Bean
    public RabbitTemplate rabbitTemplate() {
        RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
        // 开启消息返回机制
        rabbitTemplate.setMandatory(true);
        // 设置生产者确认回调
        rabbitTemplate.setConfirmCallback((correlationData, ack, cause) -> {
            if (ack) {
                log.info("ConfirmCallback 关联数据：{},投递成功,确认情况：{}", correlationData, true);
            } else {
                log.info("ConfirmCallback 关联数据：{},投递失败,确认情况：{}，原因：{}", correlationData, false, cause);
            }
        });

        // 退回模式 消费者返回消息确认 （例如路由不存在的时候，就会触发次回调）
        rabbitTemplate.setReturnCallback((message, replyCode, replyText, exchange, routingKey) -> {
            // 请注意!如果你使用了延迟队列插件，那么一定会调用该callback方法，因为数据并没有提交上去，
            // 而是提交在交换器中，过期时间到了才提交上去，并非是bug！你可以用if进行判断交换机名称来捕捉该报错
            System.out.println("消息无法路由，交换器：" + exchange + "，路由键：" + routingKey);
        });
        return rabbitTemplate;
    }
}
```

#### 4.2.3 添加配置类
```java
    @RabbitListener(queues = "fruitOrderQueue")
    public void processFruit(String message, Channel channel, Message message) {
        log.info("fruitOrderQueue: {}", message);
        try {
            // 处理消息的代码

            // 如果消息处理成功，确认消息
            channel.basicAck(message.getMessageProperties().getDeliveryTag(), false);
        } catch (Exception e) {
            // 如果消息处理失败，拒绝消息，并设置 requeue 为 true，让 RabbitMQ 重新发送消息
            channel.basicNack(message.getMessageProperties().getDeliveryTag(), false, true);
        }
    }
```


### 5. RabbitMQ的消息重试机制

RabbitMQ的消息重试机制有两种：消息的延迟队列和消息的死信队列。


#### 5.1. 防止消息丢失

>延迟队列加死信队列： 当消息超时、或者消息处理过程中出现异常的时候，消息会自动发送给死信队列

```java




// 配置死信队列 （当延迟队列出现超时或者异常的情况下会将信息转发到死信队列中）
@RabbitListener(bindings = @QueueBinding(
        exchange = @Exchange(value = "delay_dead_exchange"),
        key = "delay_dead_key",
        value = @Queue(value = "delay_dead_queue", durable = "true")
))
public void delayDeadQueue(String message) {
    log.info("死信队列接收收到信息 delay_dead_queue MqReceiver: {}", message);
}


@RabbitListener(bindings = @QueueBinding(
        // DLK
        exchange = @Exchange(value = "delay_exchange"),
        key = "delay_key",
        // DLX
        value = @Queue(value = "delay_queue", durable = "true", arguments = {
                // 声明死信交换机
                @org.springframework.amqp.rabbit.annotation.Argument(name = "x-dead-letter-exchange", value = "delay_dead_exchange"),
                // 声明死信路由键
                @org.springframework.amqp.rabbit.annotation.Argument(name = "x-dead-letter-routing-key", value = "delay_dead_key"),
                // 声明队列消息过期时间 TTL
                @org.springframework.amqp.rabbit.annotation.Argument(name = "x-message-ttl", value = "3000", type = "java.lang.Integer")
        })
))
public void delayQueue(String message) throws InterruptedException {

    log.info("delay_queue MqReceiver: {}", message);
    //Thread.sleep(5000);
    throw new RuntimeException("测试延迟队列异常");
}



```

#### 5.2. 消息的延迟队列


> 使用场景：1、消息的延迟队列适用于消息的延迟处理，比如：订单的超时未支付，那么就可以将订单发送到延迟队列，然后延迟队列在指定的时间后将订单发送给队列，队列就可以取消订单了。2、消息延迟重试，比如：订单的支付失败，那么就可以将订单发送到延迟队列，然后延迟队列在指定的时间后将订单发送给队列，队列就可以重新支付订单了。


```java

// 添加延迟队列插件
rabbitmq-plugins enable rabbitmq_delayed_message_exchange


    // 定义支持设置延迟事件的队列
    @RabbitListener(bindings = @QueueBinding(
            exchange = @Exchange(value = "test_delay_exchange", type = "x-delayed-message", arguments = {
                    // x-delayed-type 声明队列类型
                    @Argument(name = "x-delayed-type", value = ExchangeTypes.DIRECT)
            }),
            key = "test_delay_key",
            value = @Queue(value = "test_delay_queue", durable = "true")
    ))
    public void testDelayQueue(String message) throws InterruptedException {
        log.info("test_delay_queue MqReceiver: {}", message);
        // 使用场景：根据message 获取订单信息，如果还没有支付，取消订单
    }

    // 设置消息延迟多久发送
    @GetMapping("sendTestDelayQueue")
    public void sendTestDelayQueue() {
        rabbitTemplate.convertAndSend( "test_delay_exchange","test_delay_key", "now" + new Date(),
                message -> {
                    // 设置延迟毫秒值
                    message.getMessageProperties().setDelay(20000);
                    return message;
                });
    }



```

两种方式比较：更加推荐使用第二种，第一种会出现时序问题。

时序问题：正常的队列应该是先进先出，由于引入过期时间（过期时间越短会越先执行）导致消息执行的顺序被过期时间影响。如果需求严格控制消息执行的顺序，那么TTL加DLX不适合。

时序问题分三种：1、消息的 TTL 过期：如果消息的 TTL 设置为一定的时间，当消息的 TTL 过期时，消息将被标记为 "dead letter" 并发送到 DLX。然后，DLX 可能会立即将消息重新路由到 DLQ（Dead Letter Queue）中，或者根据其他的路由规则将消息发送到其他队列。这可能会导致消息的顺序性发生变化，因为过期时间较短的消息可能会被优先处理。

2、消息被消费者拒绝：
如果消费者在处理消息时拒绝（reject）了消息，消息可能会被重新投递到队列。如果消息设置了 TTL，重新投递的消息仍然会保持原来的 TTL 值。这可能导致消息在重新投递后仍然很快地过期，并最终进入 DLQ。因此，在重新投递时，需要确保消息的 TTL 适当调整，以避免过早进入 DLQ
3、 消息被重新排序：
当 DLX 和 TTL 结合使用时，如果消息在过期前被重新投递或重新路由到其他队列，可能会导致消息的顺序发生变化。这是因为不同消息的 TTL 可能不同，导致它们被处理的时间顺序发生变化。


### 6. RabbitMQ的消息幂等性




### 7. 总结

使用rabbitmq最佳使用方式：推荐同时使用生产者确认和消费者确认，保证消息能被正常投递和消费处理。对于异常的数据


