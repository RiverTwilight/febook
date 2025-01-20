---
description: 详细讲解 JS 基础知识，你将掌握 JS 的基本概念和常用技巧，为更复杂的 JS 应用打下坚实基础。
keywords: [JS基础, JS关键字, JS进阶, 前端面试题, 编程能力提升]
sidebar_position: 0
---

# 基础巩固

:::tip[Good to know]

在一些 C 端项目中，尤其是电商类项目，对 JS 基础知识的要求很高。

:::

## 数据类型

JS 数据类型分为两大类：

-   基本数据类型：String, Number, Boolean, Null, Undefined, Symbol
-   引用数据类型：Object

## 事件委托

事件代理（也叫事件委托）是 JavaScript 中一种利用事件冒泡机制的技术。简单来说，就是把本来要添加到多个子元素的事件监听器，添加到它们的父元素上。当子元素的事件被触发时，事件会冒泡到父元素，父元素上的事件监听器就可以捕获这个事件并做出相应的处理。

例如，有一个无序列表 ul，里面有很多 li 元素。如果要给每个 li 元素添加一个点击事件监听器，正常情况下需要遍历所有 li 元素并逐个添加。而使用事件代理，只需要给 ul 添加一个点击事件监听器就可以处理所有 li 元素的点击事件。

```javascript
// 给 ul 添加点击事件监听器
ul.addEventListener("click", function (event) {
	// 获取点击的 li 元素
	const li = event.target.closest("li");
	// 处理点击事件
	console.log(li);
});
```

### 事件冒泡

比如，当你点击一个 li 元素时，首先会触发 li 元素本身的点击事件，然后这个事件会冒泡到 ul 元素，接着会继续冒泡到更高层的元素。在事件代理中，我们在 ul 元素上设置的事件监听器就可以在事件冒泡到 ul 时捕获这个事件。

## 了解更多

你可以阅读 [手写函数](./Handwriting-Functions.md) 章节检测自己的 JS 基础知识。
