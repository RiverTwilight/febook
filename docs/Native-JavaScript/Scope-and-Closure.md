# 作用域与闭包

相信读者已经看过很多相关文章，我们这里主要讲一下实战使用。

## 闭包

几个点理解闭包：

-   JS 中是存在变量作用域的
-   变量只在作用域内生效
-   闭包允许作用域之外的程序读取变量

闭包以一种较为可控的形式，将变量共享。

## 你真的理解了吗？

思考这样一道题（[via](https://juejin.cn/post/6844903474212143117#heading-0)）：

```js
for (var i = 0; i < 5; i++) {
	setTimeout(function () {
		console.log(new Date(), i);
	}, 1000);
}

console.log(new Date(), i);
```

输出结果：

```js
Wed Dec 14 2022 16:00:36 GMT+0800 (中国标准时间) 5
Wed Dec 14 2022 16:00:37 GMT+0800 (中国标准时间) 5
Wed Dec 14 2022 16:00:37 GMT+0800 (中国标准时间) 5
Wed Dec 14 2022 16:00:37 GMT+0800 (中国标准时间) 5
Wed Dec 14 2022 16:00:37 GMT+0800 (中国标准时间) 5
```

结合事件循环的知识，我们可以知道，`setTimeout` 是异步的，所以会在循环结束后执行五次，而此时 `i` 已经变成了 `5`。同时，由于宏任务**先进后出**的结构，会先执行最后一行的输出，接着循环中的四次输出会一起执行。

第三行中的 i 并非“复制”了一份，而是**引用**了外部的 `i` ——这就是闭包的作用。

## 实际运用

看一个真实的业务代码

````tsx
	const [history, setHistory] = useState([]);
	const [input, setInput] = useInput("");

	const handleSend = () => {

		setHistory((prevHistory) => [
			...prevHistory,
			{
				type: "human",
				text: input,
				date: new Date(),
			},
		]);

		axios
			.post("/api/apps/openai", /**... */)
			.then((res) => {
				setHistory((prevHistory) => [
					...prevHistory,
					{
						type: "bot",
						text: res.data.choices[0].text,
						date: new Date(),
					},
				]);
				setHistory(history); // 注意这一行
			});
	};
	```
````
