---
sidebar_position: 1
---

# 函数手写

本文介绍一些原生函数的手写方案，难度逐渐增加。建议先自己思考，最终的目标是能**全部默写出来**。这些练习的目的是：

-   提高编程抽象能力
-   理解 Javascript 设计思想

## call

思路：使用 apply 实现。

```javascript
Function.prototype.call = function (obj, arg) {
	let arg = Array.prototype.slice.call(arguments, 1);
	const context = this;
	return context.apply(obj, arg);
};
```

## some

该方法检查数组中是否含有符合条件的元素。

思路：遍历数组，使用回调函数判断，如果有一个满足条件，返回 true，否则返回 false。

```javascript
Array.prototype.some = function (callback, thisArg) {
	for (let i = 0; i < this.length; i++) {
		if (callback.call(thisArg, this[i], i, this)) {
			return true;
		}
	}
	return false;
};
```

## bind

bind 方法会返回一个新函数，永久绑定参数函数的 this。

思路：使用 apply 实现。

```javascript
Function.prototype.bind = function (obj, arg) {
	let arg = Array.prototype.slice.call(arguments, 1);
	const context = this;
	const bound = function (newArg) {
		arg = arg.concat(Array.prototype.slice.call(newArg));
		return context.apply(obj, arg);
	};
	// 保留原型
	const F = function () {};
	F.prototype = context.prototype;
	bound.prototype = new F();
	return bound;
};
```

## reduce

思路：遍历数组，使用回调函数计算，返回最终结果。

## Promise.all

将多个 Promise 实例包装成一个 promise 实例。

```js
Promise.MyAll = function (promises) {
  let arr = [],
    count = 0
  return new Promise((resolve, reject) => {
    promises.forEach((item, i) => {
      Promise.resolve(item).then(res => {
        arr[i] = res
        count += 1
        if (count === promises.length) resolve(arr)
      }, reject)
    })
  })
}
```

## 深拷贝

### 最简单的做法

```js
JSON.parse(JSON.stringify(obj));
```

然而，由于 undefined、function、symbol 会在转换过程中被忽略，这种做法存在局限性。

### 高级做法

利用递归的思想，我们可以写出近乎完美的深拷贝。

```js
function deepClone(source) {
	const targetObj = source.constructor === Array ? [] : {}; // 判断复制的目标是数组还是对象
	for (let keys in source) {
		// 遍历目标
		if (source.hasOwnProperty(keys)) {
			if (source[keys] && typeof source[keys] === "object") {
				// 如果值是对象，就递归一下
				targetObj[keys] = source[keys].constructor === Array ? [] : {};
				targetObj[keys] = deepClone(source[keys]);
			} else {
				// 如果不是，就直接赋值
				targetObj[keys] = source[keys];
			}
		}
	}
	return targetObj;
}
```

### 取巧做法

你可以使用 `Array.slice` 和 `Array.concat` 实现数组的浅层深拷贝。

## 扩展阅读

-   [The seventh way to call a JavaScript function without parentheses](https://portswigger.net/research/the-seventh-way-to-call-a-javascript-function-without-parentheses)

-   [https://mp.weixin.qq.com/s/qdJ0Xd8zTgtetFdlJL3P1g](https://mp.weixin.qq.com/s/qdJ0Xd8zTgtetFdlJL3P1g)

-   [https://juejin.cn/post/7069805387490263047#heading-18](https://juejin.cn/post/7069805387490263047#heading-18)
