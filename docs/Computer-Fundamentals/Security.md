---
description: 介绍前端开发中常见的安全概念、漏洞防范、Cookie管理、CSP策略、CORS配置、XSS与CSRF攻击防护等核心安全知识
keywords:
    [
        网络安全,
        前端安全,
        Cookie,
        CSP,
        CORS,
        XSS,
        CSRF,
        安全策略,
        漏洞防范,
        Web安全,
    ]
---

# 安全

我们先解释清楚一些名词：

-   Cookie：浏览器存储在用户计算机上的数据，用于保存用户的登录状态、购物车信息等。
-   CSP：协议名称，Content Security Policy，内容安全策略
-   CORS：协议名称，Cross-Origin Resource Sharing，跨域资源共享
-   CSRF：攻击方法，Cross-Site Request Forgery，跨站请求伪造
-   XSS：攻击方法，Cross-Site Scripting，跨站脚本攻击

:::tip[Good to know]

你可能觉得这些概念和平时开发没什么关系，其实不然。只有具备好的安全意识，才能在开发中避免踩坑，或者不慎引入安全问题。

:::

## Cookie

### 如何阻止 JS 访问 Cookie

可以通过设置 Cookie 的 **HttpOnly** 属性来阻止 JavaScript 访问 Cookie。这是一个重要的安全措施，特别是对于存储敏感信息（如身份验证令牌）的 Cookie。

设置 HttpOnly 的方法：

-   后端设置响应头：

    ```http
    Set-Cookie: sessionId=abc123; HttpOnly
    ```

-   前端 JavaScript 无法通过 `document.cookie` 读取设置了 HttpOnly 的 Cookie

除了 HttpOnly，还可以使用其他 Cookie 属性增强安全性：

-   `Secure`：只在 HTTPS 连接中传输 Cookie
-   `SameSite`：控制 Cookie 在跨站请求中的行为
-   `Domain`：限制 Cookie 可以被哪些域名访问
-   `Path`：限制 Cookie 在特定路径下可用

:::tip[注意]
HttpOnly Cookie 虽然无法被 JavaScript 访问，但仍会随着 HTTP 请求自动发送到服务器。这对于防御 XSS 攻击特别有效，因为即使攻击者注入了恶意脚本，也无法窃取这些 Cookie。
:::

## CSP

CSP 是 Content Security Policy 的缩写，是一种安全策略，用于防止跨站脚本攻击（XSS）和数据注入攻击。

CSP 通过设置 HTTP 头来告诉浏览器哪些内容是安全的，哪些是不安全的。

## CORS

CORS 是 Cross-Origin Resource Sharing 的缩写，是一种安全策略，用于防止跨站请求攻击（CSRF）。

具体实现则是服务端配置 Access-Control-Allow-Origin 等响应头，明确指定允许访问的源。

## XSS

XSS 是 Cross-Site Scripting 的缩写，是一种攻击方法，用于在网页中注入恶意脚本。

### 如何防范 XSS

-   使用 CSP 限制可执行的脚本
-   使用 HttpOnly 和 Secure 属性限制 cookie 的使用
-   对用户输入进行严格的验证和过滤

## CSRF（跨站请求伪造）

假设你正在登录银行网站 A，银行将你的登录凭证存储在 cookie 中。这时你访问了恶意网站 B，网站 B 向银行网站 A 发起一个转账请求。由于浏览器会自动携带 cookie，所以银行网站 A 会认为这是一个合法请求。

:::tip[Good to know]

解决 CSRF 的本质是：**验证请求的来源**。

:::

### 如何防范 CSRF

可以采用以下任意一种或几种方法结合使用：

-   验证 HTTP Referer 字段：检查请求是否来自合法的源，但 Referer 可以被伪造，不能完全依赖

-   添加 Token 验证

    -   服务器向客户端发送一个随机 Token
    -   客户端发送请求时必须携带这个 Token
    -   服务器验证 Token 是否匹配

-   SameSite Cookie 属性

    -   Strict: 完全禁止第三方网站发送 Cookie
    -   Lax: 允许部分第三方请求发送 Cookie
    -   None: 允许所有跨站请求发送 Cookie

-   使用 CORS 策略

    -   服务器通过 Access-Control-Allow-Origin 等响应头
    -   明确指定允许访问的源
    -   对于非简单请求，先发送预检请求(OPTIONS)验证

## 了解更多

-   在 [冷门技巧 & 疑难杂症](../Beyond-the-Browser/Triks-and-Tips.md#iframe-的安全用法) 一章中，介绍了 iframe 的安全用法。
