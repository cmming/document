## 背景

> 项目部署不可避免使用私有仓库，调研后选择harbor。


### 安装步骤

> 安装包地址：https://github.com/goharbor/harbor/releases


```sh
#下载安装包
wget https://storage.googleapis.com/harbor-releases/harbor-offline-installer-v2.7.0.tgz
下载完成之后，进行解压:
tar -zxvf harbor-offline-installer-v2.7.0.tgz
```

#### 修改配置

> 修改配置文件harbor.yml

```sh
# 生成配置文件
cp harbor.yml.tmpl harbor.yml
# 修改配置文件
# 修改hostname
hostname = 主机ip
```
#### 安装
  
```sh
./install.sh
```

#### 修改配置重启

```sh
docker-compose down
# 重新生成配置文件
./prepare
docker-compose up -d
```


### 使用服务器

> 如果想使用私有镜像的docker镜像，需要修改docker配置文件

```sh
# 修改docker配置文件
vim /etc/docker/daemon.json

# 添加配置
{
  "insecure-registries" : ["harbor地址"]
}
# 重启docker
systemctl restart docker
```
