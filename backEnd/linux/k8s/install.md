## 正式安装

### 1、环境准备

```sh

# 分别在三个主机上设置主机名，重启生效
hostnamectl set-hostname master
reboot

hostnamectl set-hostname node1
reboot

hostnamectl set-hostname node2
reboot

#设置免登录(在master上运行) 仅仅是为了复制文件方便 可以不操作
ssh-keygen
ssh-copy-id root@node01
ssh-copy-id root@node02

#把hosts文件复制到node01\02(在msster上运行)
scp /etc/hosts root@node01:/etc/hosts
scp /etc/hosts root@node02:/etc/hosts

# 关闭防火墙和iptables
systemctl stop firewalld.service
systemctl disable firewalld.service
systemctl stop iptables.service
systemctl disable iptables.service

#关闭防火墙(在3台机运行)
systemctl stop firewalld && systemctl disable firewalld

#关闭selinux(在3台机运行)
sed -i 's/enforcing/disabled/' /etc/selinux/config && setenforce 0

#关闭swap(在3台机运行)
swapoff -a && sed -ri 's/.*swap.*/#&/' /etc/fstab


#时间同步(在3台机运行)
yum install ntpdate -y && timedatectl set-timezone Asia/Shanghai  && ntpdate time.windows.com
```

> <span style="color:red"> 如果私有ip不通，存在公网ip的云服务器,建立虚拟网卡</span>

```sh
# step1 ，注意替换你的公网IP进去
cat > /etc/sysconfig/network-scripts/ifcfg-eth0:1 <<EOF
BOOTPROTO=static
DEVICE=eth0:1
IPADDR=你的公网IP
PREFIX=32
TYPE=Ethernet
USERCTL=no
ONBOOT=yes
EOF
# step2 如果是centos8，需要重启）（建议直接换成centos7，centos8的网卡设置复杂一些）
# 华为云服务器在网卡设置上是默认了有eth1-eth5 所以需要把默认的这些全部取消 不然会抛错导致网卡无法重启
systemctl restart network
# step3 查看新建的IP是否进去
ip addr
```

### 2、安装Docker
```sh
# step 1: 安装必要的一些系统工具
sudo yum install -y yum-utils device-mapper-persistent-data lvm2
# Step 2: 添加软件源信息
sudo yum-config-manager --add-repo https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
# Step 3: 更新并安装Docker-CE
sudo yum makecache fast
sudo yum -y install docker-ce
# Step 4: 开启Docker服务
sudo systemctl start docker && systemctl enable docker

# 注意：
# 官方软件源默认启用了最新的软件，您可以通过编辑软件源的方式获取各个版本的软件包。例如官方并没有将测试版本的软件源置为可用，您可以通过以下方式开启。同理可以开启各种测试版本等。
# vim /etc/yum.repos.d/docker-ee.repo
#   将[docker-ce-test]下方的enabled=0修改为enabled=1
#
# 安装指定版本的Docker-CE:
# Step 1: 查找Docker-CE的版本:
# yum list docker-ce.x86_64 --showduplicates | sort -r
#   Loading mirror speeds from cached hostfile
#   Loaded plugins: branch, fastestmirror, langpacks
#   docker-ce.x86_64            17.03.1.ce-1.el7.centos            docker-ce-stable
#   docker-ce.x86_64            17.03.1.ce-1.el7.centos            @docker-ce-stable
#   docker-ce.x86_64            17.03.0.ce-1.el7.centos            docker-ce-stable
#   Available Packages
# Step2: 安装指定版本的Docker-CE: (VERSION例如上面的17.03.0.ce.1-1.el7.centos)
# sudo yum -y install docker-ce-[VERSION]

# docker镜像加速，"https://s2q9fn53.mirror.aliyuncs.com"这个地址建议自己登陆阿里云，在容器镜像服务中找到。
# 可以通过修改daemon配置文件/etc/docker/daemon.json来使用加速器
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "exec-opts": ["native.cgroupdriver=systemd"],
  "registry-mirrors": ["https://s2q9fn53.mirror.aliyuncs.com"]
}
EOF
sudo systemctl daemon-reload && sudo systemctl restart docker
```

### 3、安装kubelet、kubeadm、kubectl

```sh
#添加kubernetes阿里YUM源
cat <<EOF > /etc/yum.repos.d/kubernetes.repo
[kubernetes]
name=Kubernetes
baseurl=https://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64/
enabled=1
gpgcheck=1
repo_gpgcheck=1
gpgkey=https://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg https://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
EOF

# 安装 或者指定版本
yum install -y kubelet kubeadm kubectl && systemctl enable kubelet && systemctl start kubelet
# yum install -y kubelet-1.19.4 kubeadm-1.19.4 kubectl-1.19.4 && systemctl enable kubelet && systemctl start kubelet

```

### 4、部署Kubernetes Master

```sh

#注意，kubeadm init 前,先准备k8s运行所需的容器
#可查询到kubernetes所需镜像
kubeadm config images list

#写了个sh脚本，把所需的镜像拉下来
cat >> alik8simages.sh << EOF
#!/bin/bash
list='kube-apiserver:v1.19.4
kube-controller-manager:v1.19.4
kube-scheduler:v1.19.4
kube-proxy:v1.19.4
pause:3.2
etcd:3.4.13-0
coredns:1.7.0'
for item in \$list
  do

    docker pull registry.aliyuncs.com/google_containers/\$item && docker tag registry.aliyuncs.com/google_containers/\$item k8s.gcr.io/\$item && docker rmi registry.aliyuncs.com/google_containers/\$item

  done
EOF
#运行脚本下载
bash alik8simages.sh



#初始化k8s集群
kubeadm init \
--apiserver-advertise-address=192.168.0.200 \
--kubernetes-version=v1.19.4 \
--service-cidr=10.96.0.0/12 \
--pod-network-cidr=10.244.0.0/16

#提示initialized successfully!表示初始化成功
##注意提示：to start using you cluster,you need to run the following as a regular user:
mkdir -p ...
sudo cp ...
sudo chown ...
#按提示执行以上三条命令
#执行完后可以运行,查看node节点情况
kubectl get nodes

#还有一条提示：
#then you can join any number of worker nodes by running the following on each as root
#翻译：然后，您可以通过在每个worker节点上以root身份运行以下命令来连接任意数量的worker节点
#接着把提示如下的语句复制到node节点运行
kubeadm join 192.168.1.200:6443 --token ...

```
### 5、应用网络插件

```sh
kubectl apply -f https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml
```


### 6、节点加入集群

```sh
[root@node1 ~]# kubeadm join 192.168.0.46:6443 --token b2n16t.n6filxh3vc6byr7c \
>         --discovery-token-ca-cert-hash sha256:f4d103707658df3fa7a8dc95a59719f362cd42edb40c8ebc5ae19d53655813d1
[preflight] Running pre-flight checks
[preflight] Reading configuration from the cluster...
[preflight] FYI: You can look at this config file with 'kubectl -n kube-system get cm kubeadm-config -o yaml'
[kubelet-start] Writing kubelet configuration to file "/var/lib/kubelet/config.yaml"
[kubelet-start] Writing kubelet environment file with flags to file "/var/lib/kubelet/kubeadm-flags.env"
[kubelet-start] Starting the kubelet
[kubelet-start] Waiting for the kubelet to perform the TLS Bootstrap...

This node has joined the cluster:
* Certificate signing request was sent to apiserver and a response was received.
* The Kubelet was informed of the new secure connection details.

Run 'kubectl get nodes' on the control-plane to see this node join the cluster.

[root@node1 ~]#

```

>如果想在节点上执行kubectl命令，则需要将master节点配置拷贝至节点的$HOME/.kube目录下。

```sh
#在节点上创建一个目录，即kubectl默认启动读取证书配置目录
[root@node1 ~]# mkdir -p $HOME/.kube

#在master节点将配置复制到node1节点
[root@master ~]# scp .kube/config root@node1:/root/.kube/

#可在node节点查看节点，组件，pod等状态
[root@node1 ~]# kubectl get nodes
NAME     STATUS   ROLES                  AGE   VERSION
master   Ready    control-plane,master   43m   v1.23.1
node1    Ready    <none>                 39m   v1.23.1
node2    Ready    <none>                 39m   v1.23.1
[root@node1 ~]# kubectl get ns
NAME              STATUS   AGE
default           Active   43m
kube-node-lease   Active   43m
kube-public       Active   43m
kube-system       Active   43m
[root@node1 ~]# kubectl get cs
Warning: v1 ComponentStatus is deprecated in v1.19+
NAME                 STATUS    MESSAGE                         ERROR
scheduler            Healthy   ok
controller-manager   Healthy   ok
etcd-0               Healthy   {"health":"true","reason":""}
[root@node1 ~]# kubectl get pods -nkube-system
NAME                             READY   STATUS    RESTARTS   AGE
coredns-64897985d-bs6b9          1/1     Running   0          43m
coredns-64897985d-s2kml          1/1     Running   0          43m
etcd-master                      1/1     Running   0          44m
kube-apiserver-master            1/1     Running   0          44m
kube-controller-manager-master   1/1     Running   0          44m
kube-flannel-ds-8jpd4            1/1     Running   0          39m
kube-flannel-ds-jlfzx            1/1     Running   0          39m
kube-flannel-ds-jztwk            1/1     Running   0          41m
kube-proxy-5lnr9                 1/1     Running   0          39m
kube-proxy-thghs                 1/1     Running   0          43m
kube-proxy-w7rhv                 1/1     Running   0          39m
kube-scheduler-master            1/1     Running   0          44m
[root@node1 ~]#

```


## 参考文章

[使用Kubeadm在华为云上搭建V1.23.1版本Kubernetes](https://segmentfault.com/a/1190000041143220)
[华为云+阿里云 不同云服务器部署Kubernetes(K8S)](https://segmentfault.com/a/1190000040043530)
[github](https://github.com/sskcal/kubernetes)
[kubelet常见问题处解决](https://www.cnblogs.com/yunweiadmin/p/10441724.html)

