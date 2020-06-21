## 项目完全启动


### 1. 开启 laravel-echo-server

```
docker-compose up -d laravel-echo-server
```


### 2. 开启队列服务

```
php artisan queue:listen
```

### 3. 开启swoole服务

```
php artisan swoole:http start
```

### 4. 开启horizon服务

```
php artisan horizon
```