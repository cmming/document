


## 1. 配置

```js
    // 预设
    preset: '@vue/cli-plugin-unit-jest',
    // 收集覆盖率统计
    'collectCoverage': true,
    // 测试覆盖率匹配的文件
    'collectCoverageFrom': ['src/**/*.{js,vue}', '!*.{en.js,zh.js,api.js,en.menu.js,zh.menu.js,model.js}']
```

## 2. [匹配器](https://jestjs.io/docs/zh-Hans/expect)

```js
// 数字
expect(2 + 2).toBe(4); expect(2 + 2).toEqual(4);
//
test('null', () => {
    const n = null;
    expect(n).toBeNull();
    expect(n).toBeDefined();
    expect(n).not.toBeUndefined();
    expect(n).not.toBeTruthy();
    expect(n).toBeFalsy();
});
test('两个浮点数字相加', () => {
const value = 0.1 + 0.2;
    //expect(value).toBe(0.3);           这句会报错，因为浮点数有舍入误差
    expect(value).toBeCloseTo(0.3); // 这句可以运行
});
```

## 3. 命令行

## 4. 异步代码测试

> 使用Async/Await,等待

```js
// 测试是否返回正确的结果
test('the data is peanut butter', async () => {
  await expect(fetchData()).resolves.toBe('peanut butter');
});
// 测试异常能否正常触发
test('the fetch fails with an error', async () => {
  await expect(fetchData()).rejects.toThrow('error');
});
```

## 5. 钩子函数
>为测试提供重复的注备设置
```js
// 为多次测试重复设置
beforeEach
afterEach
// 一次性设置
beforeAll
afterAll
```

## 6. 钩子函数的作用域

>通过 describe 作为测试的区域划分
```js
beforeAll(() => console.log('1 - beforeAll'));
afterAll(() => console.log('1 - afterAll'));
beforeEach(() => console.log('1 - beforeEach'));
afterEach(() => console.log('1 - afterEach'));
test('', () => console.log('1 - test'));
describe('Scoped / Nested block', () => {
  beforeAll(() => console.log('2 - beforeAll'));
  afterAll(() => console.log('2 - afterAll'));
  beforeEach(() => console.log('2 - beforeEach'));
  afterEach(() => console.log('2 - afterEach'));
  test('', () => console.log('2 - test'));
});

// 1 - beforeAll
// 1 - beforeEach
// 1 - test
// 1 - afterEach
// 2 - beforeAll
// 1 - beforeEach
// 2 - beforeEach
// 2 - test
// 2 - afterEach
// 1 - afterEach
// 2 - afterAll
// 1 - afterAll
```

## 7. mock 数据
> 1.模拟函数返回相应的值。例如异步测试的时候，可以模拟接口的返回值。
## 8. 快照
> 确保ui不会发生变化。

## 8. 覆盖率
> 将测试覆盖率生成静态的配置文件。
```shell
jest --collectCoverage
```





