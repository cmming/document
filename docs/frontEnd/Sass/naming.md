# [命名](http://getbem.com/)

> BEM 代表：Block、Element、Modifier。

## 使用 sass 实现一个BEM

### 1.定义配置文件

```scss
$namespace: 'el';
$element-separator: '__';
$modifier-separator: '--';
$state-prefix: 'is-';
```

### 2.为了让 class 名称顺序严格 BEM

> 为了防止由于嵌套造成的BEM 顺序错乱


```scss
/* BEM support Func
 -------------------------- */
@function selectorToString($selector) {
  $selector: inspect($selector);
  $selector: str-slice($selector, 2, -2);
  @return $selector;
}

// 判断是否存在 M 修饰符
@function containsModifier($selector) {
  $selector: selectorToString($selector);

  @if str-index($selector, $modifier-separator) {
    @return true;
  } @else {
    @return false;
  }
}
// 判断是否存在 $state-prefix 修饰符
@function containWhenFlag($selector) {
  $selector: selectorToString($selector);

  @if str-index($selector, '.' + $state-prefix) {
    @return true
  } @else {
    @return false
  }
}
// 判断是否存在 伪类 修饰符；
@function containPseudoClass($selector) {
  $selector: selectorToString($selector);

  @if str-index($selector, ':') {
    @return true
  } @else {
    @return false
  }
}

// 对外暴漏函数
@function hitAllSpecialNestRule($selector) {

  @return containsModifier($selector) or containWhenFlag($selector) or containPseudoClass($selector);
}
```

### 3. mixin 

> 实现bem 的命名规范

```sass
/* BEM
 -------------------------- */
@mixin b($block) {
  $B: $namespace+'-'+$block !global;

  .#{$B} {
    @content;
  }
}

@mixin e($element) {
  $E: $element !global;
  $selector: &;
  $currentSelector: "";
  @each $unit in $element {
    $currentSelector: #{$currentSelector + "." + $B + $element-separator + $unit + ","};
  }

  @if hitAllSpecialNestRule($selector) {
    @at-root {
      #{$selector} {
        #{$currentSelector} {
          @content;
        }
      }
    }
  } @else {
    @at-root {
      #{$currentSelector} {
        @content;
      }
    }
  }
}

@mixin m($modifier) {
  $selector: &;
  $currentSelector: "";
  @each $unit in $modifier {
    $currentSelector: #{$currentSelector + & + $modifier-separator + $unit + ","};
  }

  @at-root {
    #{$currentSelector} {
      @content;
    }
  }
}

@mixin configurable-m($modifier, $E-flag: false) {
  $selector: &;
  $interpolation: '';

  @if $E-flag {
    $interpolation: $element-separator + $E-flag;
  }

  @at-root {
    #{$selector} {
      .#{$B+$interpolation+$modifier-separator+$modifier} {
        @content;
      }
    }
  }
}

@mixin spec-selector($specSelector: '', $element: $E, $modifier: false, $block: $B) {
  $modifierCombo: '';

  @if $modifier {
    $modifierCombo: $modifier-separator + $modifier;
  }

  @at-root {
    #{&}#{$specSelector}.#{$block+$element-separator+$element+$modifierCombo} {
      @content
    }
  }
}

@mixin meb($modifier: false, $element: $E, $block: $B) {
  $selector: &;
  $modifierCombo: '';

  @if $modifier {
    $modifierCombo: $modifier-separator + $modifier;
  }

  @at-root {
    #{$selector} {
      .#{$block+$element-separator+$element+$modifierCombo} {
        @content
      }
    }
  }
}

@mixin when($state) {
  @at-root {
    &.#{$state-prefix + $state} {
      @content;
    }
  }
}

@mixin extend-rule($name) {
  @extend #{'%shared-'+$name};
}

@mixin share-rule($name) {
  $rule-name: '%shared-'+$name;

  @at-root #{$rule-name} {
    @content
  }
}

@mixin pseudo($pseudo) {
  @at-root #{&}#{':#{$pseudo}'} {
    @content
  }
}
```


#### 4.使用示例

```scss
@import "mixins/rem";
$--color-white: #ffffff;
$--color-black:#000000;
@include b(test) {
  width: 100%;
  background-color: $--color-white;
  @include when(center) {
    justify-content: center;
  }
  @include m(success) {
    background-color: $--color-black;
    font-size: 12px;
    .lix-test__description {
      color: $--color-white;
    }
  }
  @include m(warning) {
    background-color: $--color-black;
    font-size: 12px;
    .lix-test__description {
      color: $--color-white;
    }
  }
  @include e(content) {
    display: table-cell;
    padding: 0 8px;
  }
  @include e(title) {
    font-size: 8px;
    line-height: 10px;
    @include when(bold) {
      font-weight: bold;
    }
  }
}

// 编译结果
.ve-test {
  width: 100%;
  background-color: #ffffff; }
  .ve-test.is-center {
    justify-content: center; }
  .ve-test--success {
    background-color: #000000;
    font-size: 12px; }
    .ve-test--success .lix-test__description {
      color: #ffffff; }
  .ve-test--warning {
    background-color: #000000;
    font-size: 12px; }
    .ve-test--warning .lix-test__description {
      color: #ffffff; }
  .ve-test__content {
    display: table-cell;
    padding: 0 8px; }
  .ve-test__title {
    font-size: 8px;
    line-height: 10px; }
    .ve-test__title.is-bold {
      font-weight: bold; }
```
