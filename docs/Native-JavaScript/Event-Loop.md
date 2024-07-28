# 事件循环 Event Loop

我们先来看一段来自 W3C 的[提案](https://www.w3.org/TR/requestidlecallback/)的内容：

> Web pages often want to execute computation tasks on the browser's event loop which are not time-critical, but might take a significant portion of time to perform. Examples of such background tasks include recording analytics data, long running data processing operations, client-side templating and pre-rendering of content likely to become visible in the near future. These tasks must share the event loop with other time-critical operations, such as reacting to input and performing script-based animations using `[requestAnimationFrame](https://html.spec.whatwg.org/multipage/imagebitmap-and-animations.html#dom-animationframeprovider-requestanimationframe)()`
> . These background tasks are typically performed by scheduling a callback using `[setTimeout](https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-settimeout)()`
>  and running the background task during that callback.

翻译成中文：

> 网页通常希望在浏览器的事件循环中执行计算任务，这些任务对时间要求不高，但可能会花费大量时间来执行。此类后台任务的示例包括记录分析数据、长时间运行的数据处理操作、客户端模板化和可能在不久的将来变得可见的内容预呈现。这些任务必须与其他时间关键操作共享事件循环，例如使用 requestAnimationFrame() 对输入做出反应和执行基于脚本的动画
> .这些后台任务通常通过使用 setTimeout() 安排回调来执行，并在该回调期间运行后台任务。

我们可以发现，`setTimeout()`可以用来执行一些消耗性能但不重要的工作，即使把延迟设置为 0，回调函数仍然不会阻塞渲染。为了搞清楚这个问题，我们可以做个实验（此处建议打开开发者工具运行一下代码）：

```jsx
const seconds = new Date().getTime() / 1000;

setTimeout(() => {
	console.log(`Ran after ${new Date().getTime() / 1000 - seconds} seconds`);
}, 1000);
```

执行这段代码我们可以发现，它几乎是完全按照预期执行的：确实延迟了 1 秒钟左右。但如果我们继续添加一段耗时 2 秒的任务：

```jsx
const seconds = new Date().getTime() / 1000;

setTimeout(() => {
	console.log(`Ran after ${new Date().getTime() / 1000 - seconds} seconds`);
}, 1000);

while (true) {
	if (new Date().getTime() / 1000 - seconds >= 2) {
		console.log("Good, looped for 2 seconds");
		break;
	}
}
```

我们会发现原来按时执行的函数也被延后了 2 秒。也就是说，作为解释型语言的 JavaScript 并没有真的自上而下“执行”。

为了搞清楚原因，就要研究 Javascript 的任务调度机制。而这种机制又根据环境分为[浏览器](../%E8%BD%AF%E7%B4%A0%E8%B4%A8%20b1c97dfa39634513827e372a3b422eaa/%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91%E5%B8%B8%E8%A7%81%E6%9C%AF%E8%AF%AD%E4%B8%AD%E8%8B%B1%E5%AF%B9%E7%85%A7%20212a07ad4e1e4e93808f988963889dcd.csv)和 node.js 环境。

不同于许多其它语言，JavaScript 是非阻塞的。但是**在浏览器中**，js 的执行会阻塞 DOM 渲染。如果某个脚本执行时间过长，就会导致页面卡顿，影响使用体验。

js 会不断执行任务队列（事实上，就是一个栈结构，最早添加的任务最先执行）直到被清空。

重点来了，js 还对任务进行了分类，在浏览器中，包括：

-   宏任务：一般的代码，包括通过`setTimeout`注册的回调函数。会通过一个栈结构维护。
-   微任务：通常是回调函数，包括传入`then/catch/finally`的函数。特别地，`queueMicrotask(func)`这个内置方法可以添加任意函数为微任务。

每个宏任务执行完成后，js 会立即执行微任务队列直至微任务清空。概括的讲，**只有在微任务队列为空时，宏任务才会被执行。**

> **冷知识**：在浏览器中，即使把`setTimeout`的延迟设置为 0，也会有大约 4ms 的执行延迟。（[via](https://javascript.info/event-loop)）、

此外，如果想在 event loop 之外执行一些消耗性能的工作，可以通过 Web Worker 开启一个新的线程，不阻塞渲染，也不阻塞事件循环。

## 用 setTimeout 来实现 setInterval

有了上面的知识，我们考虑这样一个需求：实现一个`setInterval`函数，它的功能和`setInterval`一样，但是不使用`setInterval`。

```js
function cusomizeInterval(fn, interval) {
	setTimeout(function () {
		fn();
		setTimeout(arguments.callee, interval);
	}, interval);
}
```

## 面试题

来看一道经典的事件循环面试题（题目来源于网络）：

```jsx
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

/*
promise1
2
then1
queueMicrotask1
then3
setTimeOut1
then2
then4
setTimeOut2
*/
```

你可能会疑问：第一个`setTimeout`被执行的时候，微任务不是空的吗？为什么不立刻执行`setTimeout`里面的内容呢？

文章开头已经提到，`settimeout`可以用于延迟某个函数的执行。即使设置的 delay 为 0，javascript 的解释器也会先执行完全部代码，然后根据形成的微任务队列，执行微任务，最后执行宏任务。

又由于`setTimeout`本身是宏任务，所以只有等待前面的三个微任务（then1, queueMicrotask1, then3）执行完毕后才会执行。

## 扩展阅读

[Event loop: microtasks and macrotasks](https://javascript.info/event-loop)

[js 事件循环详解\_卖菜的小白的博客-CSDN 博客\_js 事件循环](https://blog.csdn.net/weixin_47450807/article/details/123131474)
