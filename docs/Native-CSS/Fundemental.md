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

## BFC

BFC：Block Formatting Context（块级格式化上下文），是一个独立的渲染区域，让处于 BFC 内部的元素与外部的元素相互隔离，使内外元素的定位不会相互影响。

存在以下几种方案可创建 BFC：

-   浮动元素， float 值不为 none
-   绝对定位元素，position 属性为 absolute ，fixed
-   非块级盒子的块级容器（ display 值为 inline-blocks , table-cells , table-captions 等）
-   overflow 的值不为 visible （ visiable 是默认值。内容不会被修剪，会呈现在元素框之外）
-   除此之外，根元素， HTML 元素本身就是 BFC（ 最大的一个 BFC ）

### BFC 的作用：

-   自适应两栏布局：阻止元素被浮动的元素覆盖，自适应成两栏布局
-   清除内部浮动：解决浮动元素不占高度的问题（浮动元素未被包裹在父容器）
-   解决 margin 重叠：为了防止 margin 重叠， 可以使多个 box 分属于不同的 BFC 时
-   阻止元素被浮动元素覆盖

### BFC 如何解决外边距重叠：

内部的盒子会在垂直方向，一个一个地放置；
盒子垂直方向的距离由 margin 决定，属于同一个 BFC 的两个相邻 Box 的上下 margin 会发生重叠；
每个元素的左边，与包含的盒子的左边相接触，即使存在浮动也是如此；
BFC 的区域不会与 float 重叠；
BFC 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之也是如此；
计算 BFC 的高度时，浮动元素也参与计算。
