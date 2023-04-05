# 使用swoole加速laravel


## 1. 安装扩展包

```sh
composer require swooletw/laravel-swoole
```

## 2. 修改docker-compose 配置（.env）

```
WORKSPACE_INSTALL_SWOOLE = true
PHP_FPM_INSTALL_SWOOLE=true

 docker-compose build workspace php-fpm
    
docker-compose up -d workspace php-fpm

# 检测是否安装成功插件
php -m | grep swoole
```


## 3. 发布配置文件

```sh
php artisan vendor:publish --tag=laravel-swoole

```


## 4. 修改nginx配置

```
map $http_upgrade $connection_upgrade {
    default upgrade;
    ''      close;
}

 upstream laravels {
     # Connect IP:Port
     server workspace:1215 weight=5 max_fails=3 fail_timeout=30s;
     keepalive 16;
 }

server {

    listen 80 default_server;
    listen [::]:80 default_server ipv6only=on;


    server_name localhost;
    root /var/www/blog-list/public;
    index index.php index.html index.htm;

    location = /index.php {
         # Ensure that there is no such file named "not_exists"
         # in your "public" directory.
         try_files /not_exists @swoole;
     }

    location / {
        try_files $uri $uri/ @swoole;
    }

    location @swoole {
        set $suffix "";

        if ($uri = /index.php) {
            set $suffix ?$query_string;
        }

        proxy_set_header Host $http_host;
        proxy_set_header Scheme $scheme;
        proxy_set_header SERVER_PORT $server_port;
        proxy_set_header REMOTE_ADDR $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;

        # IF https
        # proxy_set_header HTTPS "on";

        #proxy_pass http://127.0.0.1:1215$suffix;
        proxy_pass http://laravels$suffix;
    }

    location ~ /\.ht {
        deny all;
    }

    location /.well-known/acme-challenge/ {
        root /var/www/letsencrypt/;
        log_not_found off;
    }
}

 ```


## 5. 修改项目配置文件

```
#swoole 是否热加载（生产环境改成false）
SWOOLE_HOT_RELOAD_ENABLE=true
#指定 swoole 代理的host
SWOOLE_HTTP_HOST=workspace
SWOOLE_HTTP_DAEMONIZE=true
```

 ## 6. 重启nginx服务和开启 swoole

 ```
docker-compose up -d nginx


docker-compose exec workspace bash 
    
php artisan swoole:http start
 ```


 ## 7. 注意

 > 启动swoole 会很占用cpu (如果主机是使用cpu积分消耗型，会很快把cpu积分耗尽，造成主机卡顿)