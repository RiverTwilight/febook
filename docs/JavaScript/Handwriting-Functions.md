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
```

## 扩展阅读

[The seventh way to call a JavaScript function without parentheses](https://portswigger.net/research/the-seventh-way-to-call-a-javascript-function-without-parentheses)
