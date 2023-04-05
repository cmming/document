# 自动部署

> 利用travis-cl 对github代码的监控,然后利用密钥对进行服务器的登录,进行代码的发布

## 生成密钥对

```sh
ssh-keygen -t rsa -C "294225707@qq.com"
## 输入自定的位置和名称
Generating public/private rsa key pair.
Enter file in which to save the key (/Users/bigno/.ssh/id_rsa): /Users/bigno/.ssh/id_rsa_blog # 可以命名
# 然后 在文件夹 ~/.ssh 中会多出两个文件, 
cd .ssh/
#将公钥内容输出到authorized_keys中
cat id_rsa_blog.pub >> authorized_keys
```

## 本地测试登录
```sh
# 在 ~/.ssh 中生成一个配置文件 
vim config
#文件内容为
Host test
HostName 1.1.1.1(你的服务器ip)
#登陆的用户名
User root
IdentitiesOnly yes
#登陆使用的密钥
IdentityFile ~/.ssh/id_rsa_blog
# 此时将会以root 用户登录
ssh test
```

## 在Linux服务器安装Travis客户端工具
curl -sSL https://get.rvm.io | bash -s stable
rvm version

## 安装ruby

```sh
rvm install ruby
ruby --version
# [修改源](http://gems.ruby-china.com/)
gem sources --add https://gems.ruby-china.com/ --remove https://rubygems.org/
gem sources -l
https://gems.ruby-china.com
# 确保只有 gems.ruby-china.com
```

## 安装travis命令行工具

```sh
gem install travis
```

## 添加加密的私钥至代码仓库
```sh
#首先用GitHub账户登陆travis
travis login
# 这一步建议在linux上运行 
travis encrypt-file ~/.ssh/id_rsa --add
```

## 修改配置 添加自动登录的配置文件

```sh
before_install:
# 相当于在travis 中添加配置文件 方便免密登录
- echo -e "Host chenming.club\n\tHostName 1.1.1.1\n\tStrictHostKeyChecking no\n\tIdentityFile ~/.ssh/id_rsa_blog" >> ~/.ssh/config

```

## 最终完成的配置文件
```sh

language: node_js
node_js:
- '10'
addons:
  ssh_known_hosts: chenming.club
before_install:
// 解密命令 in 待解秘密的文件 out 输出到 Travis服务器的文件夹
- openssl aes-256-cbc -K $encrypted_62b781e8019c_key -iv $encrypted_62b781e8019c_iv
  -in id_rsa_blog.enc -out ~/.ssh/id_rsa_blog -d
- chmod 600 ~/.ssh/id_rsa_blog
// 在Travis服务器中添加一个 免密的配置文件
- echo -e "Host chenming.club\n\tHostName 1.1.1.1\n\tStrictHostKeyChecking no\n\tIdentityFile ~/.ssh/id_rsa_blog" >> ~/.ssh/config
- yarn global add vuepress
install:
- yarn install
script:
- yarn docs:build
after_success:
- cd docs/.vuepress
// 将编译后的代码复制到服务器的指定文件夹 
- scp -o stricthostkeychecking=no -r ./dist root@chenming.club:/home/document/docker/blog-server
// 将服务容器重新启动
- ssh root@chenming.club -o stricthostkeychecking=no 'cd /home/document/docker && docker-compose up -d --build'


```

