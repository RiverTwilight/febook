# 计算机网络

> There is no cloud. It’s just another computer.

## 分层模型

## http

注意，HTTP 协议从未规定 GET/POST 的请求长度限制是多少。对 get 请求参数的限制是来源与浏览器或 web 服务器，浏览器或 web 服务器限制了 url 的长度。为了明确这个概念，我们必须再次强调下面几点:

-   HTTP 协议 未规定 GET 和 POST 的长度限制
-   HGET 的最大长度显示是因为 浏览器和 web 服务器限制了 URI 的长度
-   H 不同的浏览器和 WEB 服务器，限制的最大长度不一样
-   要支持 IE，则最大长度为 2083byte，若只支持 Chrome，则最大长度 8182byte
