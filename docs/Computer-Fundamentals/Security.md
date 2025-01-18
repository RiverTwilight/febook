---
description: 介绍常见的安全概念、问题及解决方案
---

# 安全

我们先解释清楚一些概念：

-   CSP：协议名称，Content Security Policy，内容安全策略
-   CORS：协议名称，Cross-Origin Resource Sharing，跨域资源共享
-   CSRF：攻击方法，Cross-Site Request Forgery，跨站请求伪造

:::tip[Good to know]

你可能觉得这些概念和平时开发没什么关系，其实不然。只有具备好的安全意识，才能在开发中避免踩坑，或者不慎引入安全问题。

:::

## CSP

CSP 是 Content Security Policy 的缩写，是一种安全策略，用于防止跨站脚本攻击（XSS）和数据注入攻击。

CSP 通过设置 HTTP 头来告诉浏览器哪些内容是安全的，哪些是不安全的。

## CORS

CORS 是 Cross-Origin Resource Sharing 的缩写，是一种安全策略，用于防止跨站请求攻击（CSRF）。

具体实现则是服务端配置 Access-Control-Allow-Origin 等响应头，明确指定允许访问的源。

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
