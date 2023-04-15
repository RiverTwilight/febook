# Vue

先来看看 Vue 2 仓库的结构

-   src：这是 Vue.js 的核心源码目录，包含了所有核心模块。

    -   compiler：编译器模块，负责将模板（template）编译成渲染函数。
    -   parser：解析器，将模板字符串解析成抽象语法树（AST）。
    -   optimizer：优化器，对 AST 进行优化，标记静态节点。
    -   codegen：代码生成器，将 AST 转换为渲染函数。
    -   core：Vue.js 的核心模块，包括响应式系统、虚拟 DOM、生命周期、指令等。
    -   instance：Vue 实例的创建、销毁以及生命周期相关逻辑。
    -   observer：响应式系统的实现，包括观察者（Observer）、依赖收集（Dep）和订阅器（Watcher）。
    -   vdom：虚拟 DOM 的实现，包括 VNode（虚拟节点）和相关操作函数。
    -   util：通用的工具函数。
    -   platforms：不同平台（web、weex）的实现，包括编译器、运行时、渲染器等。
    -   web：Web 平台的实现。
    -   compiler：Web 平台的编译器模块。
    -   runtime：Web 平台的运行时模块。
    -   server：用于服务器端渲染的模块。
    -   weex：Weex 平台的实现。
    -   server：服务端渲染相关的模块。
    -   sfc：用于解析单文件组件（.vue 文件）的模块。
    -   shared：一些共享的常量和工具函数。

*   dist：构建后的文件目录，包含不同版本的 Vue.js，如开发版（包含完整警告和调试模式）和生产版（精简、压缩后的代码）。

*   test：测试相关的文件和目录，包括单元测试、端到端测试等。

*   build：构建脚本和配置文件，用于将源码编译成可在浏览器中运行的文件。

*   examples：包含一些 Vue.js 示例项目，用于演示不同的功能和用法。

*   docs：Vue.js 的文档目录，包含开发者需要的所有指南和参考资料。

*   types：TypeScript 类型声明文件。

.gitignore, .babelrc, .eslintrc, package.json 等：这些是项目相关的配置文件，用于管理 Git、Babel、ESLint 和 npm

[Vue 3](https://github.com/vuejs/core) 源码结构

-   packages：Vue.js 3 源码采用了多包（monorepo）管理，主要的核心功能分散在不同的子包中。

    -   runtime-core：运行时的核心代码，包含响应式系统、组件生命周期、虚拟 DOM 等。
    -   runtime-dom：针对 DOM 平台的运行时代码，包括 DOM 操作、事件处理等。
    -   runtime-test：运行时测试工具包。
    -   server-renderer：服务器端渲染相关代码。
    -   compiler-core：编译器核心代码，处理模板的编译。
    -   compiler-dom：针对 DOM 平台的编译器代码。
    -   compiler-sfc：单文件组件（.vue 文件）的编译器。
    -   compiler-ssr：服务器端渲染的编译器。
    -   reactivity：响应式系统，负责处理数据的响应式更新。
    -   shared：共享的工具函数和常量。
    -   template-explorer：模板探查器，用于调试模板编译。

-   scripts：构建和开发相关的脚本，例如构建、测试等。

*   tests：测试用例，包括单元测试和端到端测试。

types：TypeScript 类型声明文件。

.gitignore, .eslintrc, .prettierrc, package.json 等：这些是项目相关的配置文件，用于管理 Git、ESLint、Prettier 和 npm。

Vue 3 将核心功能拆分成了多个包，这使得框架更加模块化，易于维护和扩展。希望这次的回答能满足您的需求。
