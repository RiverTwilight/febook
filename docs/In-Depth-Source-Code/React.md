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

## 扩展阅读
