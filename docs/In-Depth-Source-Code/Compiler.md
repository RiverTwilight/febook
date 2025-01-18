# 打包器

本章介绍一下常见的打包器，以及它们的工作原理。最后我们会实现一个简单的打包器。

## Webpack

Webpack 5 相比 Webpack 4 做了很多改进，比如：

-   使用 ESM 作为默认的模块系统
-   使用新的缓存机制
-   使用新的模块联邦机制：即可以实现多个项目共享同一个依赖
-   使用新的打包机制

## Vite

Vite 是一个现代化的前端构建工具，它使用 ESM 作为默认的模块系统，并且使用原生的 ES 模块来打包。

## Rollup

Rollup 是一个专注于 ES 模块打包的工具，特别适合打包库和框架。它的特点包括：

-   支持 Tree-shaking，可以有效减小打包体积
-   输出格式灵活，支持 ESM、CommonJS、UMD 等
-   插件系统强大且易于扩展

:::tip

Tree-shaking 是一种优化技术，用于移除未使用的代码，从而减小打包体积。

:::

## Rspack

Rspack 是字节跳动开源的打包工具。是目前最快的打包工具。

## 实现一个打包器

```javascript
// simple-bundler.js
const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const babel = require('@babel/core');
// 分析单个模块
function analyzeModule(filename) {
    const content = fs.readFileSync(filename, 'utf-8');
    const ast = parser.parse(content, {
        sourceType: 'module'
    });
    const dependencies = [];
    traverse(ast, {
        ImportDeclaration: ({ node }) => {
            dependencies.push(node.source.value);
        }
    });

    const { code } = babel.transformFromAstSync(ast, null, {
        presets: ['@babel/preset-env']
    });

    return {
        filename,
        dependencies,
        code
    };
}
// 生成依赖图谱
function generateDependencyGraph(entry) {
    const entryModule = analyzeModule(entry);
    const graph = [entryModule];
    for (const module of graph) {
        module.dependencies.forEach(relativePath => {
        const absolutePath = path.join(path.dirname(module.filename), relativePath);
        const dependency = analyzeModule(absolutePath);
        graph.push(dependency);
        });
    }
    return graph;
}
// 打包生成代码
function bundle(graph) {
const modules = graph.reduce((str, module) => {
return str + '${module.filename}': function(require, module, exports) { ${module.code} },;
}, '');
return (function(modules) { function require(filename) { const module = { exports: {} }; modules[filename](require, module, module.exports); return module.exports; } require('${graph[0].filename}'); })({${modules}}) ;
}
// 使用示例
const graph = generateDependencyGraph('./src/index.js');
const output = bundle(graph);
fs.writeFileSync('./dist/bundle.js', output);
```

这个简单的打包器实现了以下功能：

1. 解析入口文件
2. 分析依赖关系
3. 递归处理所有依赖
4. 将所有模块打包成一个可执行的文件

虽然这个实现比较简单，但它展示了打包器的基本工作原理。实际的打包器还需要处理：

-   循环依赖
-   不同类型的模块系统（CommonJS、AMD、ESM）
-   代码分割
-   静态资源处理
-   源码映射
-   热模块替换
-   等等

选择合适的打包器需要考虑项目的具体需求，比如：

-   项目规模和复杂度
-   开发体验要求
-   构建性能要求
-   团队熟悉度
-   生态系统支持
