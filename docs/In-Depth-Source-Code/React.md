---
sidebar_position: 0
---

# React

在深入源码之前，我们先澄清几个点：

-   React 本身是一种设计思想，可以用于任何图形界面
-   React-dom 赋予了 React 在浏览器大展身手的机会
-   React 本身不认识 JSX 写法

## 我们说的 React 包含了哪些子模块？

React 的官方仓库是一个 monorepo，里面包含了很多子模块。

先从最基本的结构入手，我们会一步步扩展这个图片。

![](./images//react_0.png)

## Fiber

Fiber 是 React 的重新实现，它将组件的渲染拆分成可变更的阶段，使得 React 可以有更多的控制权，更好地支持动画和更复杂的 UI 组件，以及更好地支持异步渲染。Fiber 还可以把 React 应用的渲染过程拆分成更小的单元，从而改善性能。

## Diff

React 中最值得称道的部分莫过于 Virtual DOM 与 diff 的完美结合，特别是其高效的 diff 算法，让用户可以无需顾忌性能问题而”任性自由”的刷新页面，让开发者也可以无需关心 Virtual DOM 背后的运作原理，因为 React diff 会帮助我们计算出 Virtual DOM 中真正变化的部分，并只针对该部分进行实际 DOM 操作，而非重新渲染整个页面，从而保证了每次操作更新后页面的高效渲染，因此 Virtual DOM 与 diff 是保证 React 性能口碑的幕后推手。

## FAQ

理解了源码概念后，我们可以探讨一些深入的问题。

### 为什么不能在 IF 语句中使用 Hooks？

由于函数组件没有 this，为了能够处理组件内部的状态以及副作用，提供了 Hooks 的方式

### useEffect 和 useLayoutEffect

与 useEffect 用法类似，但是内部的执行函数为同步执行，会阻塞浏览器渲染。

## 扩展阅读
