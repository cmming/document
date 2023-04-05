## 数据恢复

> 误删库不用跑路必备

### Binlog日志

> binary log，是二进制日志文件，有两个作用，一个是增量备份，另一个是主从复制，即主节点维护一个binlog日志文件，从节点从binlog中同步数据，也可以通过binlog日志来恢复数据


### 操作步骤

```sql
-- 模拟数据插入
INSERT INTO t_order_0 (order_id, user_id, create_time) 
VALUES
(5,6,'2021-11-20 11:34:07')
-- 查看是否开启 binlog
show variables like '%log_bin%';

-- 查看所有的binlog日志文件
show master logs;
-- 查看最后一个binlog日志的编号名称及其最后一个操作事件pos结束点的值
show master status; 
-- 
show binlog events in 'mysql-bin.000003';

-- 20211129 17:07 模拟删除 后面是有binlog进行恢复 将这个时间点作为恢复数据的结束点
DELETE FROM t_order_0;

-- 开始利用binlog日志恢复数据
-- 1、重置binlog日志，避免新的操作对之前的数据产生污染，刷新日志
Flush LOGS;
-- 2、查看日志是否刷新重置
SHOW MASTER STATUS;
-- 3、通过事件点进行大致恢复  恢复 下午两点到5点之间的数据，忽略5点之后的数据
/usr/bin/mysqlbinlog --start-datetime="2021-11-29 14:00:00" --stop-datetime="2021-11-29 17:00:00" --database=ds1 /var/log/mysql/mysql-bin.000003 | mysql -uroot -proot -v ds1
-- 密码放在命令行中会由于安全策略导致执行失败，使用时间恢复的时候 一定要注意 mysql服务器的时区
mysqlbinlog --start-datetime="2021-11-29 06:00:00" --stop-datetime="2021-11-29 9:00:00" --database=ds1 /var/log/mysql/mysql-bin.000003 | mysql -uroot -p -v ds1
-- 4、通过position进行准确恢复
```

## 参考文章

[Mysql 通过binlog日志恢复数据](https://www.cnblogs.com/YCcc/p/10825870.html)

 