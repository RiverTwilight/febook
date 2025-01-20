---
description: 详细讲解 Promise 的用法，你将掌握 Promise 的基本概念和常用技巧，为更复杂的 JS 应用打下坚实基础。
keywords: [Promise, JS, 异步, 异步编程, 前端面试题, 编程能力提升]
---

# Promise

Promise 的三种状态：

-   pending ：进行中，表示 Promise 还在执行阶段，没有执行完成。
-   fulfilled：成功状态，表示 Promise 成功执行完成。
-   rejected：拒绝状态，表示 Promise 执行被拒绝，也就是失败。

Promise 的状态，只可能是其中一种状态，从进行中变为成功或失败状态之后，状态就固定了，**不会再发生改变**。

## Promise.race

`Promise.race(iterable)` 方法返回一个 promise，一旦迭代器中的某个 promise 解决或拒绝，返回的 promise 就会解决或拒绝。也就是说，哪个 promise 先解决，这个"race"就结束了。

```js
const promise1 = new Promise((resolve, reject) => {
	reject();
});
const promise2 = new Promise((resolve, reject) => {
	resolve();
});
const promise3 = new Promise((resolve, reject) => {
	reject();
});

const promiseRace = Promise.race([promise1, promise2, promise3])
	.then((res) => {
		console.log("race then");
	})
	.catch((error) => {
		console.log("race catch");
	});
```

## Promise.all

接受多个 promise，返回一个数组包含所有结果。
