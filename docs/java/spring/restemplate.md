## 使用场景

> 不同服务之间的调用




## 全局设置

> 通过全局设置，可以统一设置请求头，请求参数，响应处理等，避免每次调用都需要设置。也就是将请求的配置从代码中抽离出来，方便管理。

### 1、配置连接超时时间、读取超时时间

```java

@Bean
public ClientHttpRequestFactory simpleClientHttpRequestFactory() {
    SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
    factory.setReadTimeout(5000);//单位为ms
    factory.setConnectTimeout(5000);//单位为ms
    return factory;
}
```

### 2、BufferingClientHttpRequestFactory 

> 避免读取一次后，数据就被清空，导致多次读取报错。使其具有缓存功能

```java

@Bean
public ClientHttpRequestFactory bufferingClientHttpRequestFactory(ClientHttpRequestFactory factory) {
    return new BufferingClientHttpRequestFactory(factory);
}
```

### 3、为所有请求设置请求前缀

> 避免每次请求都需要写请求前缀 ，使用 DefaultUriBuilderFactory 设置请求前缀

```java
restTemplate.setUriTemplateHandler(new DefaultUriBuilderFactory(url));
```

### 4、设置拦截器

> 可以在拦截器中，进行请求日志打印、请求头统一设置、响应异常数据统一整理数据

```java
/*
 * Copyright 2000-2030 YGSoft.Inc All Rights Reserved.
 */
package com.example.springdemo.interceptor;

import cn.hutool.json.JSON;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import com.example.springdemo.enums.ResultEnum;
import com.example.springdemo.exception.DemoException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpRequest;
import org.springframework.http.MediaType;
import org.springframework.http.client.ClientHttpRequestExecution;
import org.springframework.http.client.ClientHttpRequestInterceptor;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.util.StopWatch;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.SocketTimeoutException;
import java.nio.charset.StandardCharsets;

/**
 * py请求的拦截器 .
 * 1、统一处理异常情况 .
 * 2、统一设置请求头 .
 * @author ChenMing <br>
 * @version JDK 1.8
 * @since 2023/4/25 16:35 <br>
 */
@Slf4j
public class RestTemplateInterceptor implements ClientHttpRequestInterceptor {
    /**
     * 算法接口调用成功的状态码 .
     */
    private final Integer SUCCESS_CODE = 1;

    @Override
    public ClientHttpResponse intercept(HttpRequest request, byte[] body, ClientHttpRequestExecution execution) {
        try {
            // 统一设置请求头
            request.getHeaders().setContentType(MediaType.APPLICATION_JSON);
            log.info("远程调用请求url为:{},请求参数:{}", request.getURI(), new String(body, "UTF-8"));
            final StopWatch stopWatch = new StopWatch();
            stopWatch.start();
            ClientHttpResponse response = execution.execute(request, body);
            String resultStr = responseHandle(response);
            stopWatch.stop();
            log.info("远程调用请求url为:{},响应结果:{},耗时:{}ms", request.getURI(), resultStr, stopWatch.getTotalTimeMillis());
            return response;
        } catch (IOException e) {
            log.error("远程调用请求异常:{}", e);
            throw new DemoException(ResultEnum.SERVER_COMMUNICATION_ERR0R);
        }
    }

    /**
     * 响应处理，非正常的结果统一抛出异常 .
     *
     * @param response 响应
     * @return 响应结果
     */
    private String responseHandle(ClientHttpResponse response) {
        try {
            StringBuilder inputStringBuilder = new StringBuilder();
            BufferedReader bufferedReader = new BufferedReader(
                    new InputStreamReader(response.getBody(), StandardCharsets.UTF_8));
            String line = bufferedReader.readLine();
            while (line!=null){
                inputStringBuilder.append(line).append("\n");
                line = bufferedReader.readLine();
            }
            // 认为接口的返回只一定是一个json，且有code字段，如果code不为1，则抛出异常。根据实际业务情况修改
            JSONObject result = JSONUtil.parseObj(inputStringBuilder.toString());
            Integer code = result.getInt("code");
            if (code != null && !code.equals(SUCCESS_CODE)) {
                throw new DemoException(ResultEnum.SERVER_COMMUNICATION_ERR0R);
            }
            return inputStringBuilder.toString();
        } catch (SocketTimeoutException e) {
            log.error("远程调用响应异常:{}", e);
            throw new DemoException(ResultEnum.SERVER_COMMUNICATION_TIMEOUT);
        } catch (IOException e) {
            log.error("远程调用响应异常:{}", e);
            throw new DemoException(ResultEnum.SERVER_COMMUNICATION_ERR0R);
        }
    }
}

```



### 5. 异常统一处理

> 处理状态码为4xx、5xx的异常，避免每次调用都需要处理异常

```java
@Slf4j
public class MyResponseErrorHandler extends DefaultResponseErrorHandler {

    @Override
    public boolean hasError(ClientHttpResponse response) throws IOException {
        return super.hasError(response);
    }

    @Override
    public void handleError(ClientHttpResponse response) throws IOException {
        HttpStatus statusCode = HttpStatus.resolve(response.getRawStatusCode());
        if (statusCode == null) {
            throw new UnknownHttpStatusCodeException(response.getRawStatusCode(), response.getStatusText(),
                    response.getHeaders(), getResponseBody(response), getCharset(response));
        }
        switch (statusCode.series()) {
            case CLIENT_ERROR:
                throw new HttpClientErrorException(statusCode, response.getStatusText(), response.getHeaders(),
                        getResponseBody(response), getCharset(response));
            case SERVER_ERROR:
                throw new HttpServerErrorException(statusCode, response.getStatusText(), response.getHeaders(),
                        getResponseBody(response), getCharset(response));
            default:
                throw new RestClientException("Unknown status code [" + statusCode + "]");
        }
    }

    private byte[] getResponseBody(ClientHttpResponse response) {
        try {
            return FileCopyUtils.copyToByteArray(response.getBody());
        } catch (IOException ex) {
            // ignore
        }
        return new byte[0];
    }

    private Charset getCharset(ClientHttpResponse response) {
        HttpHeaders headers = response.getHeaders();
        MediaType contentType = headers.getContentType();
        return contentType != null ? contentType.getCharset() : null;
    }
}
```


### 6. 配置RestTemplate


```java

@Value("${py.url:http://localhost:5000}")
private String url;

@Bean(value = "pyClient", name = "pyClient")
public RestTemplate restTemplate() {
    // 避免读取一次后，数据就被清空，导致多次读取报错；设置默认超时时间
    BufferingClientHttpRequestFactory simpleBufferingClientHttpRequest =
            new BufferingClientHttpRequestFactory(simpleClientHttpRequestFactory());
    final RestTemplate restTemplate = new RestTemplate(simpleBufferingClientHttpRequest);
    //  设置请求前缀
    restTemplate.setUriTemplateHandler(new DefaultUriBuilderFactory(url));
    // 设置拦截器
    restTemplate.getInterceptors().add(new PyClientInterceptor());
    // 设置异常处理
    restTemplate.setErrorHandler(new MyResponseErrorHandler());
    return restTemplate;
}

```




### 7、使用

```java

@Autowired
private RestTemplate restTemplate;

public void test() {
    String url = "http://localhost:8080/test";
    String result = restTemplate.getForObject(url, String.class);
    System.out.println(result);
}
```




## 常见问题

### 1、统一设置请求头失效

> 当使用exchange方法时，在自定义拦截器中设置的请求头不生效





