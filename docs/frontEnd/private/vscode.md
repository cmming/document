1. 如何更改VS code !+tab默认生成的html初始化代码模板?

文件 - 首选项 - 设置

输入框 搜索 emmet.variables， 在settings.json文件中编辑
然后添加

```
{
    "emmet.variables": {
        "lang": "zh"
    }
}
```

