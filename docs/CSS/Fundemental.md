---
sidebar_position: 0
---

# 基础巩固

长期使用 css-in-js 和各种打包器开发，往往容易忘记基础知识。除了阅读本文，读者也可以完整阅读[MDN 的文档](https://developer.mozilla.org/en-US/docs/Web/CSS)，相信一定会有所收获。

## CSS 关键字

-   inherit: 继承父元素的值，部分属性不支持继承，例如`border`
-   initial: 恢复标签本身的浏览器默认值，例如`color: initial`将把文字颜色设置为黑色。

上面两个都比较好理解，下面两个需要对比来看：

-   revert: 撤销样式影响。
-   unset: 将属性值重设为**继承的或者默认的**值。

二者有相似之处，也有不同之处。我们来看 MDN 的比较的例子：

```html
<h3 style="font-weight: revert; color: revert;">
	变成h3默认的值，即`font-weight: bold; color: black;`
</h3>
<p>Just some text</p>

<h3 style="font-weight: unset; color: unset;">
	`font-weight`将会继承`<body>`的值，即`normal`; `color` 会变回默认的黑色。
</h3>
<p>Just some text</p>
```

```css
h3 {
	font-weight: normal;
	color: blue;
}
```

## 盒模型

标准盒模型如下，使用`box-sizing: content`规定：

![Untitled](%E5%9F%BA%E7%A1%80%E5%B7%A9%E5%9B%BA%2043ba708be2de493b9269462f06b4eecd/Untitled.png)

宽度和高度属性包括内容、padding 和 border，但不包括边距。

IE 盒模型，使用`box-sizing: border-box` 规定：

![Untitled](%E5%9F%BA%E7%A1%80%E5%B7%A9%E5%9B%BA%2043ba708be2de493b9269462f06b4eecd/Untitled%201.png)

## 隐藏元素的三种方法

这也是经典面试题。

1. display: none; 会完全移除元素，包括占位。在元素隐藏的同时，会将元素从文档流中移除，不会占据空间。
2. visibility: hidden; 元素会被隐藏，但是不会移除。在元素隐藏的同时，元素仍将占用空间。
3. opacity: 0; 元素会被隐藏，但是不会移除。在元素隐藏的同时，元素仍将占用空间，但不会被看到。

对于 2 和 3，乍一看似乎没有区别，但是二者还是有区别的。当一个元素使用 opacity 属性隐藏时，虽然它不可见，但它依然会捕获鼠标事件和其他交互事件。而使用 visibility 属性则不会。所以如果要隐藏一个元素但又希望它仍能与用户交互，可以使用 opacity 属性，否则使用 visibility 属性。
