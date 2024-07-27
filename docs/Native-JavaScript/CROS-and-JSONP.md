# 跨域

一定要记住，CROS 是浏览器环境才有的特性。

## JSONP 解决跨域

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
var script = document.createElement('script');
script.src = 'https://example.com/data?callback=myCallback';
document.body.appendChild(script);
```

## 服务端解决跨域

响应头添加如下属性即可：


