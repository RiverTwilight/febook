# 跨域

一定要记住，CROS 是浏览器环境才有的特性。两个 URL 满足以下条件视为同源，否则涉及跨域：

-   协议相同
-   域名相同
-   端口相同

## JSONP 实现跨域

首先要在客户端准备一个函数用来等待调用：

```js
function jsonPCallback(data) {
	// Handle incoming data
}
```

服务端动态生成一个 js 脚本，例如:

```js
jsonPCallback({ name: "ByteDance" });
```

客户端将这个脚本执行到页面中

```js
var script = document.createElement("script");
script.src = "https://example.com/data?callback=myCallback";
document.body.appendChild(script);
```

## iframe 实现跨域

iframe + location.hash 或者 iframe + window.name，在父文档中设置 iframe 的 url 变化或者 iframe.contentWindow.name，在子文档中读取对应的值来实现跨域。

## 服务端实现跨域

响应头添加如下属性即可：
