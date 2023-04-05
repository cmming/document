<!--
 * @Descripttion: 
 * @version: v 1.0.0
 * @Author: 陈明
 * @Date: 2022-03-15 10:30:07
 * @LastEditors: 陈明
 * @LastEditTime: 2022-03-15 10:53:26
-->
# 查询优化

## 分页优化

### limit 优化

```
# 11s
SELECT CATALOGCODE, COMPCODE FROM t_sac_bizdetail_2021_pz  where (CATALOGCODE='0102001-152' or CATALOGCODE='0102001-153') LIMIT 1300000, 50000
# 2s
SELECT CATALOGCODE, COMPCODE FROM t_sac_bizdetail_2021_pz  where (CATALOGCODE='0102001-152' or CATALOGCODE='0102001-153') order by GID asc LIMIT 1300000, 50000
# 2s
SELECT  CATALOGCODE, COMPCODE FROM t_sac_bizdetail_2021_pz a JOIN (SELECT gid FROM t_sac_bizdetail_2021_pz  where (CATALOGCODE='0102001-152' or CATALOGCODE='0102001-153') order by gid LIMIT 1300000, 50000) b ON a.gid = b.gid
# 1s
SELECT CATALOGCODE, COMPCODE FROM t_sac_bizdetail_2021_pz a inner join (SELECT gid FROM t_sac_bizdetail_2021_pz  where (CATALOGCODE='0102001-152' or CATALOGCODE='0102001-153') LIMIT 1300000, 50000) b ON a.gid = b.gid

```
