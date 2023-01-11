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

## Promise

## 扩展阅读

[The seventh way to call a JavaScript function without parentheses](https://portswigger.net/research/the-seventh-way-to-call-a-javascript-function-without-parentheses)
