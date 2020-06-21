## 复制功能
>解决数据库的读负载


### 二进制日志
>记录了所用对mysql数据库的修改时间，包括增删改事件，对表结构修改的事件

1. 查看工具 binlog
2. 参数
   1. binlog_format (row:安全，保证数据一致;statement:占用空间小)
   2. binlog_row_image (full|minimal)

### 基于行的复制（RBR）

> 日志格式为row，基于记录值的修改值进行

1. 避免锁
2. 避免由于不确定值函数产生的值

### 基于sql语句的复制（SBR）

> 日志使用statement格式


### 工作方式 

1. 主服务器将变更写入二进制日志（默认未开启）
2. 从服务器读取主服务器的二进制变更到relay_log中
3. 从服务器重放relay_log中的日志


### 基于日志点主从复制

1. 主服务器配置

```
#mysql master1 config 
[mysqld]
server-id = 1        # 节点ID，确保唯一

# log config
log-bin = mysql-bin     #开启mysql的binlog日志功能
sync_binlog = 1         #控制数据库的binlog刷到磁盘上去 , 0 不控制，性能最好，1每次事物提交都会刷到日志文件中，性能最差，最安全
binlog_format = mixed   #binlog日志格式，mysql默认采用statement，建议使用mixed
expire_logs_days = 7                           #binlog过期清理时间
max_binlog_size = 100m                    #binlog每个日志文件大小
binlog_cache_size = 4m                        #binlog缓存大小
max_binlog_cache_size= 512m              #最大binlog缓存大
binlog-ignore-db=mysql #不生成日志文件的数据库，多个忽略数据库可以用逗号拼接，或者 复制这句话，写多行

auto-increment-offset = 1     # 自增值的偏移量
auto-increment-increment = 1  # 自增值的自增量
slave-skip-errors = all #跳过从库错误
```

2. 从数据库配置

```
[mysqld]
server-id = 2
log-bin=mysql-bin
relay-log = mysql-relay-bin
replicate-wild-ignore-table=mysql.%
replicate-wild-ignore-table=test.%
replicate-wild-ignore-table=information_schema.%
```


3. 主服务器创建用户并且授权

```sql
CREATE USER repl_user IDENTIFIED BY 'repl_passwd';
create user 'repl'@'ip段' identified by 'password'
-- 授权
grant replication slave on *.* to 'repl_user'@'172.17.0.2'  identified by 'repl_passwd';
-- 刷新权限
FLUSH PRIVILEGES;

-- 查看 master状态
show master status;
mysql> show master status;
+------------------+----------+--------------+------------------+-------------------+
| File             | Position | Binlog_Do_DB | Binlog_Ignore_DB | Executed_Gtid_Set |
+------------------+----------+--------------+------------------+-------------------+
| mysql-bin.000005      120|              | mysql            |                   |
+------------------+----------+--------------+------------------+-------------------+
1 row in set (0.00 sec)
```

4. 配置从服务器

```sql
mysql> CHANGE MASTER TO 
MASTER_HOST = '172.17.0.3',  
MASTER_USER = 'repl_user', 
MASTER_PASSWORD = 'repl_passwd',
MASTER_PORT = 3307,
MASTER_LOG_FILE='mysql-bin.000005',
MASTER_LOG_POS=120,
MASTER_RETRY_COUNT = 60,
MASTER_HEARTBEAT_PERIOD = 10000; 

# MASTER_LOG_FILE='mysql-bin.000005',#与主库File 保持一致
# MASTER_LOG_POS=120 , #与主库Position 保持一致
```

5. 启动从库slave进程

```sql
mysql> slave start;
Query OK, 0 rows affected (0.04 sec)
```

6. 查看从服务器状态
```sql
show master status;
```


### 基于GTID主从复制

> 大于 5.6 推荐 GTID复制模式



## 复制拓扑

### 一主多从

#### 合适使用

1. 不同业务使用不同的从库
2. 灾难恢复功能
3. 分担主库的读负载


### 主主复制

#### 注意

1. 容易造成数据冲突
2. 不同的主库中操作不同的表。
3. 使用两个参数控制，自增id
   1. auto_increment_increment = 2 (自增id每次增加2)
   2. auto_increment_offset = 1|2 (自增id分别使用1或2)

### 主主复制（主备）

> 每次只会对外公布一台服务器


### 级联复制

> 当从库过多，会对主库造成过大的复制压力； 创建分发主库，实际也是从库，记录主库传递过来的二进制，传递给其它从库，slave_log_updates


## 高可用

> 以系统的不可用时间长短来衡量


### MMM架构

> 监控和管理mysql的主主复制拓扑，并在当前的主服务器失效时，进行主服务器和主备服务器之间进行切换和故障转移等工作。

### MHAj架构


### 负载均衡和读写分离

> 使用基于mysql-proxy衍生的maxScale。

1. 使用中间件，是根据查询语句的分析，自动完成读写分离
2. 对于程序透明，已有程序不用做任何修改
3. 造成查询效率有很大损耗（50%~70%）






### 参考文档

[mysql实现主从复制/主从同步](https://www.jianshu.com/p/19cb0f16dea4)