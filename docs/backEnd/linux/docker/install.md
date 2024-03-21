## 准备工作

### 修改电脑的hostname

```bash

# 查看当前hostname
hostname
# 修改hostname
hostnamectl set-hostname <new hostname>

```

### 关闭防火墙
> 会导致负载均衡无法使用

```bash
# 查看防火墙状态
systemctl status firewalld
# 关闭防火墙
systemctl stop firewalld
# 禁止开机启动
systemctl disable firewalld

```

### 修改内核参数
    
```bash
vi /etc/sysctl.conf
# 启用ip转发
net.ipv4.ip_forward = 1
# 启用iptables链路跟踪机制
net.bridge.bridge-nf-call-iptables=1
```



