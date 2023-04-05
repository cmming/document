# 部署

## docker (nginx)

> 使用docker运行nginx docker 镜像包

1. 安装 [docker](https://www.docker.com/get-started)

2. 打包应用 镜像

```docker
# alpine 基础镜像很小 推荐使用
FROM nginx:alpine

COPY ./ /var/www/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
WORKDIR /var/www/html

```

3. 添加.dockerignore在项目的根目录中创建一个文件 

> 设置.dockerignore文件可防止将node_modules任何中间构建工件复制到映像，这可能会在构建期间导致问题。

```
**/node_modules
**/dist
```

4. 添加nginx 配置文件

```nginx
server {
    # 开启 gzip
    gzip on;
    gzip_buffers 16 8k;
    gzip_comp_level 6;
    gzip_http_version 1.1;
    gzip_min_length 256;
    gzip_proxied any;
    gzip_vary on;
    gzip_types
        text/xml application/xml application/atom+xml application/rss+xml application/xhtml+xml image/svg+xml
        text/javascript application/javascript application/x-javascript
        text/x-json application/json application/x-web-app-manifest+json
        text/css text/plain text/x-component
        font/opentype application/x-font-ttf application/vnd.ms-fontobject
        image/x-icon;
    gzip_disable "MSIE [1-6]\.(?!.*SV1)";

    listen       80;
    server_name  localhost;

    #charset koi8-r;
    # access_log  /var/log/nginx/vue.access.log  main;

    location / {
        root   /var/www/html/dist;
        index  index.html index.htm;
    }

    #error_page  404              /404.html;

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

    # proxy the PHP scripts to Apache listening on 127.0.0.1:80
    #
    #location ~ \.php$ {
    #    proxy_pass   http://127.0.0.1;
    #}

    # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
    #
    #location ~ \.php$ {
    #    root           html;
    #    fastcgi_pass   127.0.0.1:9000;
    #    fastcgi_index  index.php;
    #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
    #    include        fastcgi_params;
    #}

    # deny access to .htaccess files, if Apache's document root
    # concurs with nginx's one
    #
    #location ~ /\.ht {
    #    deny  all;
    #}
}
```

5. 构建镜像

```sh
# 镜像名称 dockerhubName/imageName:imageTag 方便将 image 推送到 docker hub
docker build -t chmi294225707/nginx:vue_beta_v1 .

## 将镜像推送到服务器
docker push chmi294225707/nginx:vue_beta_v1

```

6. 拉取镜像 启动服务

```sh
# 拉起镜像
docker pull chmi294225707/nginx:vue_beta_v1
# 创建服务
docker run -d -p 180:80 --name vue-server chmi294225707/nginx:vue_beta_v1
```


## docker-composer 

> 方便多容器的集中部署和管理

1.编写 docker-composer.yml 文件

```yml
version: '3.5'

services:
  nginx_server:
    image: nginx:alpine
    ports:
      - 981:80
    restart: unless-stopped
    volumes:
      - ./upstream.conf:/etc/nginx/conf.d/default.conf

  vue_demo_server:
    build: ../
    restart: unless-stopped
    volumes:
      - ../dist:/usr/share/nginx/html:ro
      - ./nginx.conf:/etc/nginx/conf.d/default.conf

# volumes:
#   dist:


```

### 负载均衡服务器的配置

```nginx
# upstream.conf
upstream fn {
    server vue_demo_server:80;
}

server {
    listen       80;
    location / {  
        proxy_pass   http://fn;
        index  index.html index.htm;  
    } 
}


```

### web 服务的 nginx 配置

```nginx
server {
    listen 80;
    # gzip config
    gzip on;
    gzip_min_length 1k;
    gzip_comp_level 9;
    gzip_types text/plain text/css text/javascript application/json application/javascript application/x-javascript application/xml;
    gzip_vary on;
    gzip_disable "MSIE [1-6]\.";

    root /usr/share/nginx/html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}

```


2. 服务 多开 为web 服务进行负载均衡

```nginx
# 说明 会同时开两个 uam_web_server 服务 nginx.conf 要修改
docker-compose up -d --scale vue_demo_server=3 --build
```