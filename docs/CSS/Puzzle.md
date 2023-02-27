# 疑难业务场景实现

## 1. 微信聊天气泡

最难的部分在于角标。通过分析一些案例，我们可以发现大部分都是由一个 svg 图片 + 伪类实现的。

我们自己来实现一下：

首先创建一个大的容器，每个消息都有一个不可见的大容器。

## 2. 水印技术

Web 水印的实现方式有很多种，还有盲水印的高级设计，具体可参考这篇[文章](https://mp.weixin.qq.com/s/bXpDxN2tTS9FvVQMqLGB2w)。

## 3. 可活动手柄

这种需求可以比作手写一个 slider。

对于可活动手柄，我们可以使用 HTML5 中的 canvas 元素和 JavaScript 来实现。通过监听用户的鼠标或者触摸事件，实时更新手柄的位置，并将用户操作的结果传递给后台。

对于不规则图形，我们可以使用 CSS3 的 clip-path 属性或者 SVG 图形来实现。通过定义不同的形状和路径，可以实现各种复杂的不规则图形，例如不规则按钮等。

## 4. 不规则图形

### 三角形:

可以创建一个 0x0 尺寸的元素，使用 border 属性设置元素的边框，然后将其中两个边框设置为透明，另一个边框设置为非透明，即可实现三角形的效果。

```css
.triangle {
	width: 0;
	height: 0;
	border-top: 50px solid skyblue;
	border-right: 50px solid transparent;
	border-left: 50px solid transparent;
}
```

### 圆形

可以使用 border-radius 属性实现圆角，将四个角的半径设置为元素宽度或高度的一半即可。

### 梯形

可以使用 rotate 和 skew 变换来实现。首先将一个矩形元素旋转 45 度，然后再水平或垂直方向上拉伸（或压缩）即可。也可以使用`transform`的 3D 变换。
