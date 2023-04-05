# 配置

> 项目开发中涉及到配置的

## 多模式 打包和环境变量设置

> 为不同的环境设置不同的环境变量,使得编译的代码能够适应不同的网路环境

1. 创建 不同环境的配置文件 

> 命名 规则 例如  "vue-cli-service build --mode tag" 加载的配置文件为 .env.tag 

```
# 创建文件 .env.tag   指定环境
NODE_ENV = 'tag'

```

2. 修改 config.json 文件

```json

"build:tag": "vue-cli-service build --mode tag",

```


## 为项目添加不经过编译的文件和资源

> 方便后期修改

### 添加不经过编译的配置文件 

1. 在 public中index.html的头部添加 

```javascript
<script src="./js/config.js"></script>
```


```
// 使用全局变量的方式引入
window.GLOBAL_CONFIG_SETTING = {
    UAM_WEB_BASE_API:"/chmi",
    UAM_WEB_WS_API:"ws:192.168.50.179:99",
    UAM_FILE_SERVER_URL:"http://192.168.50.179:8082"
    // UAM_FILE_SERVER_URL:"http://192.168.10.128:8080"
}
````

2.不经过编译的资源

> 资源也应该放在public中

```
# 资源路径
./static/public/...
```