# Next

> 建议先阅读 CRA 的源码分析后再阅读本文。

## 总览

Next.js 是一个流行的开源 React 框架，用于构建服务器渲染 (SSR)、静态生成 (SSG) 和客户端渲染 (CSR) 的应用程序。以下是 Next.js 的主要源码结构：

-   packages/: Next.js 是一个由多个子包组成的单一存储库。主要包有：

    -   next: 核心 Next.js 框架
    -   next-server: 实现服务器端渲染的部分
    -   babel-plugin-nextjs: 包含为 Next.js 项目配置 Babel 的插件
    -   eslint-plugin-next: 包含为 Next.js 项目配置 ESLint 的插件
    -   next-env: Next.js 的环境变量加载和配置
    -   next-plugin-loader: 用于构建过程中加载插件的工具

-   docs/: Next.js 官方文档的源码

-   examples/: 包含多个 Next.js 示例项目，用于学习和演示如何使用不同的功能

-   test/: Next.js 的测试代码，使用 Jest 和其他测试工具进行单元测试、集成测试和端到端测试

-   scripts/: 项目开发过程中用到的一些实用脚本，例如构建、发布和开发者工具

其中 next 核心包又包括了：

-   packages/next/build: Next.js 的构建系统，处理应用程序的编译、打包和优化

-   packages/next/client: Next.js 客户端渲染的核心部分，包含与页面切换、预取、代码分割等相关的逻辑

-   packages/next/server: Next.js 服务器端渲染的核心部分，包含 SSR、SSG、API 路由等功能的实现

-   packages/next/lib: Next.js 的通用库，包含一些公共方法和工具

## 寻找入口

假定一个不使用 next 提供的 react 组件的程序，那么我们与 next 唯一交互的位置就是：

```bash
next serve
```

这个命令会启动一个服务，我们可以通过访问 localhost:3000 来访问我们的页面。那么我们就可以从这个命令开始寻找入口。

## Client 客户端

Next 提供了一些组件，例如 Link, Image 等。

## 总结
