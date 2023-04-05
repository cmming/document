## 常用布局总结

> 整理常用的布局

### 左侧宽度固定，右侧自动适应

1. float + margin


```html
<div class="box">
    <div class="box-left"></div>
    <div class="box-right"></div>
</div>
```


```css
.box {
    height: 200px;
}

.box>div {
    height: 100%;
}

.box-left {
    width: 200px;
    float: left;
    background-color: blue;
}

.box-right {
    margin-left: 200px;
    background-color: red;
}
```

2. 使用 calc

```html
<div class="calc-box">
    <div class="calc-box-left"></div>
    <div class="calc-box-right"></div>
</div>
```

```css
 /* calc- */
    
.calc-box {
    height: 200px;
}

.calc-box>div {
    height: 100%;
}

.calc-box-left {
    width: 200px;
    float: left;
    background-color: blue;
}

.calc-box-right {
    width: calc(100% - 200px);
    float: right;
    background-color: red;
}
```

3. overflow + BFC

> 右侧使用overflow: hidden；形成一个BFC。清楚浮动。

```html
<div class="overflow-box">
    <div class="overflow-box-left"></div>
    <!-- 形成一个BFC  -->
    <div class="overflow-box-right">
    </div>
</div>
```
```css
.overflow-box {
    height: 200px;
}

.overflow-box>div {
    height: 100%;
}

.overflow-box-left {
    width: 200px;
    float: left;
    background-color: blue;
}

.overflow-box-right {
    overflow: hidden;
    background-color: red;
}
```

4. flex

```html
<div class="flex-box">
    <div class="flex-box-left"></div>
    <div class="flex-box-right">
    </div>
</div>
```

```css
.flex-box {
    height: 200px;
    display: flex;
}

.flex-box>div {
    height: 100%;
}

.flex-box-left {
    width: 200px;
    background-color: blue;
}

.flex-box-right {
    flex: 1;
    overflow: hidden;
    background-color: red;
}
```