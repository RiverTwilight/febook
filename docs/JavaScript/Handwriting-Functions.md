# 常见函数手写

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
	const F = function () {};
	F.prototype = context.prototype;
	bound.prototype = new F();
	return bound;
};
```

## 扩展阅读

[The seventh way to call a JavaScript function without parentheses](https://portswigger.net/research/the-seventh-way-to-call-a-javascript-function-without-parentheses)
