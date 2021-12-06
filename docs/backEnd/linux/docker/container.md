
## 常见命令

```sh
# 创建（使用镜像创建容器）（等价于先执行docker create 再执行docker start 命令）
# -t选项让docker分配一个伪终端并绑定到容器的标准输入上， -i则让容器的标准输入保持打开。若要在后台以守护态（daemonized）形式运行，可加参数-d
docker run -i -t REPOSITORY:TAG 
# 进入容器
docker exec -ti [container_id] /bin/bash
# 删除容器
# -f 强制中止并运行的容器
# -l 删除容器的连接，但保留容器
# -v 删除容器挂载的数据卷
docker rm <container...> #：删除一个或多个container
docker rm `docker ps -a -q` #：删除所有的container
docker ps -a -q | xargs docker rm #：同上, 删除所有的container
# 修改容器
docker commit <container> [repo:tag] # 将一个container固化为一个新的image，后面的repo:tag可选。
# 导入和导出容器：导出到一个文件，不管是否处于运行状态。
docker export CONTAINER > test.tar
# 导入为镜像
cat test.tar | docker import - centos:latest
```