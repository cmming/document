## docker-compse

> docker-compose 是一个用于定义和运行多容器 Docker 应用程序的工具。通过 Compose，您可以使用 YML 文件来配置应用程序需要的所有服务。然后，使用一个命令，就可以从 YML 文件配置中创建并启动所有服务。


### 常用命令

```sh
# 启动
docker-compose up
# 后台启动
docker-compose up -d
# 停止
docker-compose stop
# 删除
docker-compose down
# 查看日志
docker-compose logs
# 查看容器
docker-compose ps
# 查看镜像
docker-compose images
# 查看网络
docker-compose network
# 查看卷
docker-compose volume
# 查看配置
docker-compose config
# 查看版本
docker-compose version
# 重新构建 重启
docker-compose up -d servername --build 
```