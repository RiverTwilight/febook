# 冷门特性

本文介绍一些冷门的、容易被忽略的特性。

## Function.length

通过访问函数对象的 length 属性，可以获得参数的长度。

```js
function foo(a, b, c) {}
console.log(foo.length); // 3
```

## Function Constructor

除了 eval 方法，使用 function 构造器也可以动态创建函数（反序列化）。

```js
const decay = 4
const foo = new Function('a', 'b', `return a + b + ${decay}`);
console.log(foo(1, 2)); // 7
```
