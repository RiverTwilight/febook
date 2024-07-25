---
sidebar_position: 10
---

# 面试题集锦

## let var const 有什么区别

let 和 const 都是块级作用域，前者可修改，后者不可修改。

var 是函数级作用域

## OPTION 请求方法有什么用

用于客户端判断某接口可以使用什么方法请求。跨域请求时会预先发送检查是否允许这个客户端请求。

## https 与 http 有什么区别

-   https 更安全，但是稍微慢了一点
-   http 采用明文传输，内容可能被篡改；https 采用加密传输
-   http 走 80 端口，https 走 443 端口
