## 跟新neo4j 节点 cql

```sql
MATCH (n:Person) WHERE n.name = 'Tom Hanks' SET n.age = 60 RETURN n



MATCH (n:`Person`) WHERE n.name = 'Tom Hanks' SET n.age = 60 RETURN n

-- 删除一个点相关的所有点


MATCH (n)-[r]->m WHERE n.name = 'Tom Hanks' DETACH DELETE n


-- 删除所有的点
match (n:`fa107e8d4897497d80b6aff9afa42c20`)  detach delete n

```


docker run -d --name neo4j --publish=7474:7474 --publish=7687:7687 --volume=$HOME/neo4j/data:/data -e MAIN_CLASS=MAIN_CLASS neo4j 

docker-compose up -d web --sacle web=3

 tar -czvf kg.hbztb.tar.gz  --exclude='*.pdf' --exclude='*.log' --exclude=".jar" ./kg.hbztb

tar -czvf kg.parent.tar.gz  --exclude='*.pdf' --exclude='*.log' --exclude=".tar" ./kg.parent

git pull origin dev_hbztb






