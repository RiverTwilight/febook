---
description: 详细讲解CSS回流与重绘的概念、触发条件、性能开销，以及优化方法。通过本文的学习，你将了解如何通过减少回流与重绘来提升页面性能，为前端开发提供实用的性能优化技巧。
keywords:
    [
        CSS回流,
        CSS重绘,
        性能优化,
        前端开发,
        页面性能,
        性能开销,
        优化方法,
        前端面试题,
        编程能力提升,
    ]
---

# 回流与重绘

几个核心要点

-   性能开销：回流 > 重绘

## 回流

回流也叫重排，是浏览器为了重新计算元素的布局而进行的操作。这是性能开销最大的操作。

以下情况会触发回流：

1. 页面首次渲染
2. 浏览器窗口大小发生改变
3. 元素尺寸或位置发生改变
4. 元素内容变化（文字数量或图片大小等）
5. 元素字体大小变化
6. 添加或删除可见的 DOM 元素
7. 激活 CSS 伪类（例如：:hover）
8. 查询某些属性或调用某些方法：
    - clientWidth、clientHeight、clientTop、clientLeft
    - offsetWidth、offsetHeight、offsetTop、offsetLeft
    - scrollWidth、scrollHeight、scrollTop、scrollLeft
    - getComputedStyle()
    - getBoundingClientRect()

## 重绘

重绘是浏览器为了重新绘制元素而进行的操作。以下情况会触发重绘：

1. 元素外观改变，但不影响布局的属性改变，例如：
    - color（颜色）
    - background-color（背景色）
    - visibility（可见性）
    - outline（轮廓）
    - border-radius（圆角）
    - box-shadow（阴影）
    - text-decoration（文本装饰）
    - background-image（背景图片）
    - background-position（背景位置）
    - opacity（透明度）

## 性能优化建议

为了减少回流和重绘，提高页面性能，可以采取以下措施：

1. 批量修改 DOM

    ```javascript
    // 使用文档片段
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < 10; i++) {
    	const li = document.createElement("li");
    	li.innerHTML = `Item ${i}`;
    	fragment.appendChild(li);
    }
    document.getElementById("list").appendChild(fragment);
    ```

2. 使用 CSS 类统一修改样式

    ```javascript
    // 避免逐条修改样式
    element.classList.add("new-styles");
    ```

3. 避免频繁操作样式

    ```javascript
    // 不推荐
    const element = document.getElementById("myElement");
    element.style.width = "100px";
    element.style.height = "100px";
    element.style.margin = "10px";

    // 推荐
    element.style.cssText = "width: 100px; height: 100px; margin: 10px;";
    ```

4. 对于复杂动画，使用绝对定位使其脱离文档流

    ```css
    .animated-element {
    	position: absolute;
    	/* 或者使用 fixed */
    }
    ```

5. 使用 transform 替代 top/left 做位置移动

    ```css
    /* 不推荐 */
    .element {
    	top: 10px;
    	left: 10px;
    }

    /* 推荐 */
    .element {
    	transform: translate(10px, 10px);
    }
    ```

6. 缓存布局信息

    ```javascript
    // 不推荐
    for (let i = 0; i < 100; i++) {
    	element.style.left = element.offsetLeft + 1 + "px";
    }

    // 推荐
    let left = element.offsetLeft;
    for (let i = 0; i < 100; i++) {
    	left++;
    	element.style.left = left + "px";
    }
    ```

7. 对于频繁重排的元素，使用 will-change 属性
    ```css
    .frequent-animation {
    	will-change: transform;
    }
    ```

:::tip

will-change 属性是 CSS 的一个实验性属性，用于告诉浏览器某些属性可能会发生变化，从而提前进行优化。

:::

通过合理运用这些优化技巧，可以显著减少页面的回流和重绘次数，提升页面性能和用户体验。
