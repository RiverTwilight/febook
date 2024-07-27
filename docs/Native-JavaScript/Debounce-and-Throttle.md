# 防抖和节流

为了降低某操作的执行频率而设计的逻辑，叫做节流。所有的操作都会被记录，并且逐个执行。

为了提高某项反应的触发门槛（例如滚动的距离），叫做防抖。防抖生效期间的操作会被忽略。

二者的实现都涉及了闭包的知识。

## 防抖

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

## 节流

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
