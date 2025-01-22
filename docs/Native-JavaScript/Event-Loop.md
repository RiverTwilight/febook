---
description: 事件循环是 JavaScript 的执行模型，它决定了 JavaScript 如何处理任务。
keywords: [Event Loop, JavaScript, 事件循环, 异步编程, 宏任务, 微任务]
---

# 事件循环 Event Loop

:::tip[为什么要理解事件循环？]

理解事件循环不仅仅是为了应付面试。它是理解 JavaScript 如何工作的基础。如果你想写出高性能的 JavaScript 代码，就必须理解事件循环的原理。

:::

## 从一个简单的问题说起

几乎所有编程入门教程都会告诉你，代码是自上而下执行的。但实际情况要复杂得多。让我们看一个例子：

```js
console.log("开始");

setTimeout(() => {
	console.log("一秒后");
}, 1000);

console.log("结束");
```

这段代码的输出顺序是显而易见的：先打印"开始"，一秒后打印"一秒后"，最后打印"结束"。对吗？

实际上不是。真实的输出是：

1. 开始
2. 结束
3. 一秒后

这个现象暴露了 JavaScript 一个重要的特性：它是非阻塞的。这意味着 JavaScript 不会等待某个操作完成才继续执行下一行代码。即 JS **不是严格从上到下**执行的。

## 为什么需要事件循环？

设想一下，如果 JavaScript 是严格按照代码顺序执行的，会发生什么？当你发起一个网络请求，整个程序就会卡在那里等待响应。用户界面会完全卡死，无法响应任何操作。这显然是不可接受的。

事件循环就是为了解决这个问题而设计的。它让 JavaScript 能够一边执行代码，一边等待异步操作的结果。

## 事件循环的核心概念

事件循环可以被想象成一个永不停止的循环，它在处理三种不同的任务：

1. **同步任务**：直接在主线程上排队执行的任务
2. **宏任务（MacroTask）**：setTimeout、setInterval、I/O、UI 渲染等
3. **微任务（MicroTask）**：Promise 回调、queueMicrotask、MutationObserver 等

它们的执行顺序是这样的：

1. 执行同步任务，直到调用栈清空
2. 执行所有微任务
3. 执行一个宏任务
4. 重复步骤 2 和 3

让我们通过一个更复杂的例子来理解这个过程：

```js
console.log("1"); // 同步任务

setTimeout(() => {
	console.log("2"); // 宏任务
}, 0);

Promise.resolve().then(() => {
	console.log("3"); // 微任务
});

console.log("4"); // 同步任务
```

输出顺序是：1、4、3、2

为什么是这个顺序？让我们一步步分析：

1. 首先执行同步任务，打印 1 和 4
2. setTimeout 的回调被放入宏任务队列
3. Promise 的回调被放入微任务队列
4. 同步任务执行完毕，检查微任务队列，执行 Promise 回调，打印 3
5. 微任务队列清空后，执行一个宏任务，打印 2

## 浏览器和 Node.js 的区别

虽然事件循环的基本概念在浏览器和 Node.js 中是相同的，但实现细节有所不同。

浏览器的事件循环主要关注：

-   DOM 事件
-   用户交互
-   脚本执行
-   UI 渲染
-   网络请求

而 Node.js 的事件循环分为 6 个阶段：

1. timers：执行 setTimeout 和 setInterval 的回调
2. pending callbacks：执行系统操作的回调（如 TCP 错误）
3. idle, prepare：仅供内部使用
4. poll：获取新的 I/O 事件
5. check：执行 setImmediate 的回调
6. close callbacks：执行关闭事件的回调

## 实践应用

理解事件循环后，我们就能更好地控制代码的执行顺序。例如，如果我们需要在下一个微任务中执行某些操作：

```js
function nextTick(fn) {
	Promise.resolve().then(fn);
}

// 或者使用内置API
queueMicrotask(() => {
	// 这里的代码会在当前同步任务执行完后立即执行
});
```

再来看一个更复杂的例子：

```js
setTimeout(function () {
	console.log("setTimeOut1"); //六
	new Promise(function (resolve) {
		resolve();
	}).then(function () {
		new Promise(function (resolve) {
			resolve();
		}).then(function () {
			console.log("then4"); //八
		});
		console.log("then2"); //七
	});
});

new Promise(function (resolve) {
	console.log("promise1"); //一
	resolve();
}).then(function () {
	console.log("then1"); //三
});

setTimeout(function () {
	console.log("setTimeOut2"); //九
});

console.log(2); //二

queueMicrotask(() => {
	console.log("queueMicrotask1"); //四
});

new Promise(function (resolve) {
	resolve();
}).then(function () {
	console.log("then3"); //五
});
```

打印顺序是：

1. promise1
2. 2
3. then1
4. queueMicrotask1
5. then3
6. setTimeOut1
7. then2
8. then4
9. setTimeOut2

## 性能优化

理解事件循环对性能优化至关重要。以下是一些实践建议：

1. **避免长时间运行的同步任务**：它们会阻塞主线程
2. **合理使用微任务和宏任务**：微任务执行更快，但过多的微任务会延迟 UI 渲染
3. **使用 requestAnimationFrame 进行动画**：它会在最合适的时机执行
4. **考虑使用 Web Worker**：将耗时操作放在单独的线程中执行

## 总结

事件循环不仅是一个技术概念，更是 JavaScript 异步编程的核心机制。理解它可以帮助我们：

-   写出更高效的代码
-   避免常见的异步编程陷阱
-   更好地处理复杂的异步操作

记住：JavaScript 不是真的"多线程"，而是通过事件循环这种巧妙的机制，让单线程的语言也能高效地处理异步操作。

## 扩展阅读

-   [深入理解事件循环](https://javascript.info/event-loop)
-   [Node.js 事件循环文档](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/)
-   [Jake Archibald 关于事件循环的演讲](https://www.youtube.com/watch?v=cCOL7MC4Pl0)
