## 淘宝的布局方案

### 文本字号不建议使用rem
> 使用data-dpr来确定字体的大小

```scss
// 创建一个sass 宏

@mixin font-dpr($font-size){
    font-size: $font-size;

    [data-dpr="2"] & {
        font-size: $font-size * 2;
    }

    [data-dpr="3"] & {
        font-size: $font-size * 3;
    }
}

// 使用方式

@include font-dpr(16px);

```


### 元素布局

```scss
// 编写一个px转rem的函数 $base-font-size 根据设计图来的，一般为手机的实际像素除以10 例如：iphone 6 实际宽度的像素为750px
@function pxTorem($pixels,$base-font-size: 75) {
  @return $pixels / 150+rem;
}
// 使用
width: 134px;
width: pxTorem(134);


// 编写一个px转rem的宏
@mixin px2rem($property,$px-values,$baseline-px:16px,$support-for-ie:false){
    //Conver the baseline into rems
    $baseline-rem: $baseline-px / 1rem * 1;
    //Print the first line in pixel values
    @if $support-for-ie {
        #{$property}: $px-values;
    }
    //if there is only one (numeric) value, return the property/value line for it.
    @if type-of($px-values) == "number"{
        #{$property}: $px-values / $baseline-rem;
    }
    @else {
        //Create an empty list that we can dump values into
        $rem-values:();
        @each $value in $px-values{
            // If the value is zero or not a number, return it
            @if $value == 0 or type-of($value) != "number"{
                $rem-values: append($rem-values, $value / $baseline-rem);
            }
        }
        // Return the property and its list of converted values
        #{$property}: $rem-values;
    }
}

// 简写
@mixin px2rem($property,$px-values,$baseline-px:16){
  #{$property}: $px-values/$baseline-px+rem;
}

// 使用 @include(width,134)
@include px2rem('width',20)
width: 1.25rem; 
```



## 参考文章

[官方demo](http://huodong.m.taobao.com/act/yibo.html)

[使用Flexible实现手淘H5页面的终端适配](https://github.com/amfe/article/issues/17)