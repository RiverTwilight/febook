---
sidebar_position: 1
description: 详细讲解JavaScript常用原生函数的手写实现，包括call、bind、some、instanceof、reduce等。通过循序渐进的练习，帮助你深入理解JavaScript核心概念和设计思想。
keywords:
    [
        JavaScript手写函数,
        原生函数实现,
        call实现,
        bind实现,
        Promise实现,
        深拷贝实现,
        JavaScript进阶,
        前端面试题,
        编程能力提升,
    ]
---

# 函数手写

本文介绍一些原生/常用函数的手写方案，难度逐渐增加。建议先自己思考，最终的目标是能**全部默写出来**。这些练习的目的是：

-   提高编程抽象能力
-   理解 JavaScript 设计思想

事实上，如果你真的理解了这些函数，那么你已经理解了 JavaScript 的精髓。

## 防抖和节流

为了降低某操作的执行频率而设计的逻辑，叫做节流。所有的操作都会被记录，并且逐个执行。

为了提高某项反应的触发门槛（例如滚动的距离），叫做防抖。防抖生效期间的操作会被忽略。

二者的实现都涉及了闭包的知识。

### 防抖

```javascript
function debounce(func, delay) {
	let inDebounce;
	return function () {
		let context = this;
		let args = arguments;
		clearTimeout(inDebounce);
		inDebounce = setTimeout(() => func.apply(context, args), delay);
	};
}
```

ts 版本：

```ts
type Procedure = (...args: any[]) => void;

const debounce = <F extends Procedure>(
	func: F,
	timeout: number = 300
): ((...args: Parameters<F>) => void) => {
	let timer: NodeJS.Timeout;
	return (...args: Parameters<F>) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			func.apply(this, args);
		}, timeout);
	};
};
```

### 节流

```javascript
function throttle(fn, t) {
	let locked = false;
	let savedArgs;
	return function f(...args) {
		if (locked) {
			savedArgs = args;
			return;
		}
		locked = true;
		fn(...args); // 确保第一次触发会执行
		setTimeout(function () {
			locked = false;
			if (savedArgs) {
				f(...savedArgs);
				savedArgs = null;
			}
		}, t);
	};
}
```

## call

思路：使用 apply 实现。

```javascript
Function.prototype.call = function (obj, arg) {
	let arg = Array.prototype.slice.call(arguments, 1);
	const context = this;
	return context.apply(obj, arg);
};
```

:::tip[思考]

为什么不直接使用 slice 方法？

是因为 `arguments` 是一个类数组对象（array-like object），而不是真正的数组。它虽然有 length 属性和索引元素，但是并没有数组的方法如 slice。因此我们需要借用 Array.prototype.slice 通过 call 方法来将类数组转换为真正的数组。

这也是为什么我们写 `Array.prototype.slice.call(arguments, 1)` 而不是直接写 `arguments.slice(1)`。

:::

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

:::tip[思考]

为什么要使用 `callback.call(thisArg, this[i], i, this)` 而不是 `callback(this[i], i, this)`？

这是因为我们需要确保回调函数在正确的上下文中执行。使用 `call` 方法可以：

1. 明确设置回调函数内部的 `this` 值为 `thisArg`
2. 保持与原生 `Array.prototype.some()` 的行为一致
3. 允许调用者通过 `thisArg` 参数指定回调函数执行时的上下文

:::

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

## instanceof

思路：遍历原型链，判断是否存在。欲了解更多，请阅读 [Protochain](./Protochain.md)。

```javascript
function instanceof(a, b) {
    // 获取对象的原型
    let proto = Object.getPrototypeOf(a);
    // 获取构造函数的 prototype 对象
    let prototype = b.prototype;

    // 判断构造函数的 prototype 对象是否在对象的原型链上
    while (true) {
        if (!proto) return false;
        if (proto === prototype) return true;
        proto = Object.getPrototypeOf(proto);
    }
}
```

## reduce

思路：遍历数组，使用回调函数计算，返回最终结果。

```js
Array.prototype.reduce = function (callback, initialValue) {
	let accumulator = initialValue;
	for (let i = 0; i < this.length; i++) {
		accumulator = callback(accumulator, this[i], i, this);
	}
	return accumulator;
};
```

## Promise.all

将多个 Promise 实例包装成一个 promise 实例。

```js
Promise.MyAll = function (promises) {
	let arr = [],
		count = 0;
	return new Promise((resolve, reject) => {
		promises.forEach((item, i) => {
			Promise.resolve(item).then((res) => {
				arr[i] = res;
				count += 1;
				if (count === promises.length) resolve(arr);
			}, reject);
		});
	});
};
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
