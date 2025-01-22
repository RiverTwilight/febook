---
description: 详细讲解 JS 原型链和继承，你将掌握 JS 原型链和继承的基本概念和常用技巧，为更复杂的 JS 应用打下坚实基础。
keywords: [JS原型链, JS, 原型链, 继承, 前端面试题, 编程能力提升]
---

# 原型链和继承

搞清楚这个问题很简单，你只要记住一点：**实例的 `__proto__` 指向对象的 `prototype`**。

换句话说，只要对象原型有的属性，那么他的实例就可以通过 `__proto__` 访问。例如：

```js
Object.prototype.ygeeker = "Hello YGeeker";

function foo() {
	return this.ygeeker;
}

console.log(foo.__proto__.ygeeker); // "Hello YGeeker"
console.log(foo.ygeeker); // "Hello YGeeker"
console.log(foo()); // "Hello YGeeker"
```

## 对象属性的访问顺序

首先记住一点：原型链的尽头（root）是 `Object.prototype`。所有对象均从 `Object.prototype` 继承属性。

## 思考

有了原型链的知识，我们可以推出很多判断数组的方法：

-   `instanceof`
-   `[].constructor === Array`
-   `Object.prototype.toString.call([]) === "[object Array]"`

那么，请思考：如何在 JS 中判断变量类型？有多少种方法？

```js
// Method 1
function getType(value) {
	return Object.prototype.toString.call(value).slice(8, -1);
}

// Method 2
function getType2(value) {
	if (value === null) return "Null";
	if (value === undefined) return "Undefined";
	return value.constructor.name;
}

// Method 3
function getType3(value) {
	return typeof value;
}

// Method 4
function getType4(value) {
	if (Array.isArray(value)) return "Array";
	if (value instanceof Date) return "Date";
	if (value instanceof RegExp) return "RegExp";
	return typeof value;
}
```

:::tip

Date、RegExp 不属于基本类型，而是对象类型。

:::

## 扩展阅读

-   https://github.com/creeperyang/blog/issues/9
