# 邮件渲染

我们知道电子邮件也是可以使用 html 特性的，但是与在浏览器中渲染 html 不同，电子邮件客户端会有一些特殊处理，本文将讨论这些差异，以及如何做出精美的电子邮件。

## 元素限制

电子邮件无法渲染以下标签，所以你需要使用 div 来代替他们：
```
-   <article\>
-   <aside\>
-   <details\>
-   <figcaption\>
-   <figure\>
-   <footer\>
-   <header\>
-   <main\>
-   <mark\>
-   <nav\>
-   <section\>
-   <summary\>
-   <time\>
```
## 样式

## 扩展阅读

-   [Modern Html Email](https://fullystacked.net/posts/modern-html-email/)
