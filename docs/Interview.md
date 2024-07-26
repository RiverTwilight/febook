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

## http2 和 http1 的区别和好处，http2 的头部压缩的原理?

-   http2 允许一个 TCP 连接内并行多个请求，http1.1 只允许一个
-   http2 允许服务器主动向客户端推送资源
-   http2 采用了头部压缩，http1 传输纯文本

优势：更快、网络利用率更低，更适合移动端用户。

## JWT 鉴权如何工作？

首先，一个 JWT 含有三个部分: Header, Payload, Signature

1. 客户端发起登录请求
2. 服务端验证账号密码，将用户信息用 Secret 加密
3. 客户端保存服务端发来的 JWT
4. 每次请求都带上 JWT 去校验，服务端会检查内容（例如过期时间）

## type 和 interface 的区别？

* type 可以表示原始类型，例如 `type Address = string`
* type 可以表示联合类型，例如 `type Transport = 'Bus' | 'Car' | 'Bike' | 'Walk';`
* interface 可以自动进行声明合并
