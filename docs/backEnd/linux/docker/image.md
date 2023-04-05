
## 常用命令

```sh
# 搜索镜像
docker search image
#  下载镜像
docker pull image:tag
# 列出镜像
docker images
# 推送镜像
docker push NAME[:TAG]
# 删除一个或多个image
docker rmi <image ID>
# 存出和载入镜像
docker save -o ubuntu_14.04.tar ubuntu:14.04
docker load --input ubuntu_14.04.tar
docker load ubuntu_14.04.tar
```

## 参考文章

[docker核心概念（镜像、容器、仓库）及基本操作](https://www.cnblogs.com/whych/p/9446032.html)
