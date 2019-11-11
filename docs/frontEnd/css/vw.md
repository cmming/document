
>VW布局，无需使用JS，虽说在移动端 iOS 8 以上以及 Android 4.4 以上才获得支持，不过还是值得一用的。如果需要兼容 ,可以尝试[viewport-units-buggyfill](https://github.com/rodneyrehm/viewport-units-buggyfill)

### 单位转换


```scss
/* 移动端页面设计稿宽度 */
$design-width: 750;
/* 移动端页面设计稿dpr基准值 */
$design-dpr: 2;

/*
    vw与px对应关系，100vw为视窗宽度，$vw即为$px对应占多宽

        $px                    $vw
    -------------    ===    ------------
    $design-width              100vw
*/

/* 单位px转化为vw */
@function px2vw($px) {
    @return ($px / $design-width) * 100vw;
}

/* 单位vw转化为px，可用于根据vw单位快速计算原px */
@function vw2px($vw) {
    @return #{($vw / 100) * $design-width}px;
}

// 调用方式
height: px2vw(300);
```


### 实现固定宽高比
>利用定位和内边距完成

```scss
/**
 * 实现固定宽高比
 * @param  {string} $position: relative      定位方式
 * @param  {string} $width:    100%          容器宽度
 * @param  {string} $sub:      null          容器的目标子元素
 * @param  {number} $aspectX:  1             容器宽
 * @param  {number} $aspectY:  1             容器高
 */
@mixin aspect-ratio(
    $position: relative,
    $width: 100%,
    $sub: null,
    $aspectX: 1,
    $aspectY: 1
) {
    overflow: hidden;
    position: $position;
    padding-top: percentage($aspectY / $aspectX);
    width: $width;
    height: 0;

    @if $sub == null {
        $sub: "*";
    }

    & > #{$sub} {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }
}

```

### 边框

> 1px 边框采用 transform结合device-pixel-ratio对边框进行缩放

```scss
@charset "UTF-8";

/**
 * 获取边框某项对应的值
 * @example getBorderItemValue(10px, 2)
 * @param  {string|list}    $item  某一项或多个项的列表
 * @param  {number}         $index 下标
 * @return {string}                 项值
 */
@function getBorderItemValue($item, $index) {
    @if (type-of($item) == list) {
        @if ($index > length($item)) {
            $index: 1;
        }

        @return nth($item, $index);
    }
    @else {
        @return $item;
    }
}

/**
 * 判断是否为百分比
 * @param  {number} $value  值
 * @return {boolean}        是否为百分比
 */
@function is-percentage($value) {
    @return type-of($value) == number and unit($value) == '%';
}

/**
 * 边框圆角，支持单个值与多个值，在高清设备下px圆角加倍
 * @param  {number|list} $radius 圆角值
 * @param  {number}      $ratio  设备像素比
 */
@mixin border-radius($radius: 0, $ratio: 1) {
    $border-radius-corner: (top-left, top-right, bottom-right, bottom-left);

    /* 列表 按照四个角的顺序匹配 */
    @if (type-of($radius) == list) {
        @for $i from 1 through length($radius) {
            $item: nth($radius, $i);
            $corner: nth($border-radius-corner, $i);

            /* 普通设备，或者为百分比则直接使用圆角值 */
            @if $ratio == 1 or is-percentage($item) {
                border-#{$corner}-radius: $item;
            }
            /* 否则翻$ratio倍 */
            @else {
                border-#{$corner}-radius: $item * $ratio;
            }
        }
    }
    /* 单个值 */
    @else {
        @if $ratio == 1 or is-percentage($radius) {
            border-radius: $radius;
        } @else {
            border-radius: $radius * $ratio;
        }
    }
}

/**
 * 元素边框
 * @param  {string|list} $direction: all           为all或列表时表示多个方向的边框，否则为单个边框
 * @param  {string|list} $size:      1px           边框尺寸，为列表时表将按照direction的顺序取值
 * @param  {string|list} $style:     solid         边框样式，高清设备下仅支持solid，同上
 * @param  {string|list} $color:     #ddd          边框颜色，同上
 * @param  {string}      $position:  relative      元素定位方式，一般为relative即可
 * @param  {string}      $radius:    0             边框圆角
 */
@mixin border(
    $direction: all,
    $size: 1px,
    $style: solid,
    $color: #ddd,
    $position: relative,
    $radius: 0
) {
    /* 多个边框 */
    @if $direction == all or type-of($direction) == list {
        /* 普通设备 */
        @media not screen and (-webkit-min-device-pixel-ratio: 2) {
            @include border-radius($radius);

            @if $direction == all {
                border: $size $style $color;
            }
            @else {
                @for $i from 1 through length($direction) {
                    $item: nth($direction, $i);

                    border-#{$item}: getBorderItemValue($size, $i) getBorderItemValue($style, $i) getBorderItemValue($color, $i);
                }
            }
        }

        /* 高清设备 */
        @media only screen and (-webkit-min-device-pixel-ratio: 2) {
            @include border-multiple(
                $direction: $direction,
                $size: $size,
                $color: $color,
                $position: $position,
                $radius: $radius
            );
        }
    }

    /* 单个边框 */
    @else {
        /* 普通设备 */
        @media not screen and (-webkit-min-device-pixel-ratio: 2) {
            border-#{$direction}: $size $style $color;
        }

        /* 高清设备 */
        @media only screen and (-webkit-min-device-pixel-ratio: 2) {
            @include border-single(
                $direction: $direction,
                $size: $size,
                $color: $color,
                $position: $position
            );
        }
    }
}

/* 实现1物理像素的单条边框线 */
@mixin border-single(
    $direction: bottom,
    $size: 1px,
    $color: #ddd,
    $position: relative
) {
    position: $position;

    &:after {
        content: "";
        position: absolute;
        #{$direction}: 0;

        pointer-events: none;
        background-color: $color;

        @media only screen and (-webkit-min-device-pixel-ratio: 2) {
            -webkit-transform-origin: 0 0;
                    transform-origin: 0 0;
        }

        /* 上下 */
        @if ($direction == top or $direction == bottom) {
            left: 0;
            width: 100%;
            height: $size;

            @media only screen and (-webkit-device-pixel-ratio: 2) {
                -webkit-transform: scaleY(.5);
                        transform: scaleY(.5);
            }

            @media only screen and (-webkit-device-pixel-ratio: 3) {
                -webkit-transform: scaleY(.333333333333);
                        transform: scaleY(.333333333333);
            }
        }

        /* 左右 */
        @elseif ($direction == left or $direction == right) {
            top: 0;
            width: $size;
            height: 100%;

            @media only screen and (-webkit-device-pixel-ratio: 2) {
                -webkit-transform: scaleX(.5);
                        transform: scaleX(.5);
            }

            @media only screen and (-webkit-device-pixel-ratio: 3) {
                -webkit-transform: scaleX(.333333333333);
                        transform: scaleX(.333333333333);
            }
        }
    }
}

/* 实现1物理像素的多条边框线 */
@mixin border-multiple(
    $direction: all,
    $size: 1px,
    $color: #ddd,
    $position: relative,
    $radius: 0
) {
    position: $position;

    @include border-radius($radius);

    &:after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        pointer-events: none;
        box-sizing: border-box;
        -webkit-transform-origin: top left;

        @media only screen and (-webkit-device-pixel-ratio: 2) {
            width: 200%;
            height: 200%;

            @include border-radius($radius, 2);

            -webkit-transform: scale(.5, .5);
                    transform: scale(.5, .5);
        }

        @media only screen and (-webkit-device-pixel-ratio: 3) {
            width: 300%;
            height: 300%;

            @include border-radius($radius, 3);

            -webkit-transform: scale(.333333333333, .333333333333);
                    transform: scale(.333333333333, .333333333333);
        }

        @if $direction == all {
            border: $size solid $color;
        }
        @else {
            @for $i from 1 through length($direction) {
                $item: nth($direction, $i);

                border-#{$item}: getBorderItemValue($size, $i) solid getBorderItemValue($color, $i);
            }
        }
    }
}

```

## 总结

无需映入js,将元素的宽高，以及字体大小都直接转换为vw，即可。1px 像素问题则使用transform结合scaleY和dpr进行缩放。由于所有的宽度都是一个相对的单位，所以页面的宽度无法设置范围



## 添加rem
>如果需要控制页面的宽度范围来保证页面的多端美观，则需要引入rem；使用rem和vw整体控制。




## 参考文章
[细说移动端 经典的REM布局 与 新秀VW布局](https://www.cnblogs.com/imwtr/p/9648233.html#s4)

[参考代码](https://github.com/imwtr/rem-vw-layout)