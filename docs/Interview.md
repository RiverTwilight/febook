---
sidebar_position: 10
---

# 面试题集锦

## 讲讲 JavaScript 的垃圾回收

JavaScript 使用自动垃圾收集机制，这意味着开发者不需要手动释放内存。垃圾收集器会自动找出那些不再继续使用的变量，并在运行时释放其内存。

主要有两种算法：

-   引用计数: 计算每个对象的引用次数，次数变为 0 即可被安全移除。但是当出现循环引用的时候，会导致内存泄露，所以引用计数法后来被淘汰
-   标记-清除: 从"根"(全局对象)开始，标记所有可以到达的对象。其余的被视为可清除。这是现代浏览器主要采用的方法

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
-   http2 采用了头部压缩（HPACK），http1 传输纯文本

优势：更快、网络利用率更低，更适合移动端用户。

## http3 相较 http2 有什么变化？

-   使用 QUIC (快速 UDP 互联网连接)，这是基于 UDP 的协议
-   通常只需一次往返就可以建立加密连接，大大减少了延迟
-   加密是强制的，安全性更高（http2 TLS 可选）
-   使用 QPACK，这是专为 QUIC 设计的头部压缩算法
-   HTTP/3 支持连接迁移，允许客户端在网络切换时保持连接

## JWT 鉴权如何工作？

首先，一个 JWT 含有三个部分: Header, Payload, Signature

1. 客户端发起登录请求
2. 服务端验证账号密码，将用户信息用 Secret 加密
3. 客户端保存服务端发来的 JWT
4. 每次请求都带上 JWT 去校验，服务端会检查内容（例如过期时间）

## type 和 interface 的区别？

-   type 可以表示原始类型，例如 `type Address = string`
-   type 可以表示联合类型，例如 `type Transport = 'Bus' | 'Car' | 'Bike' | 'Walk';`
-   interface 可以自动进行声明合并

## Tailwind 的好处

-   易于维护，易于理解，不需要查看样式表
-   DX 很好，快速获得样式效果

## 目测打印结果类

```js
function ClassA() {
	this.x = "hello";
}

ClassA.prototype.x = "world";

const a = new ClassA();
a.x = "what";
console.log(a.x); // what
delete a.x;
console.log(a.x); // world
a.x = undefined;
console.log(a.x); // undefined
```

```javascript
function someFunction() {
	let a = 0;
	return function () {
		return a++;
	};
}

const f1 = someFunction();
const f2 = someFunction();

console.log(f1()); // 0
console.log(f2()); // 0

const f = someFunction();
console.log(f()); // 0
console.log(f()); // 1
```

## JS 是一个单线程的语言，它这个特点有什么好处吗，为什么要设计成单线程的？

-   避免 DOM 操作冲突
-   与浏览器的单线程渲染引擎保持一致
-   使得错误追踪和调试变得更加容易

值得一提的是，单线程模型下，为了不阻塞主线程，JavaScript 发展出了回调、Promise、async/await 等异步编程模式。

## addEventListener 方法的第三个参数了解过吗？

默认为 false，是否开启事件捕获。

事件监听的顺序为先捕获后冒泡，从外层到内层。

```js
let outer = document.getElementById("outer");
let inner = document.getElementById("inner");

outer.addEventListener(
	"click",
	function () {
		console.log("外层元素被点击");
	},
	true
); // 使用捕获

inner.addEventListener(
	"click",
	function () {
		console.log("内层元素被点击");
	},
	false
); // 使用冒泡（默认）
```

## 面经集锦

-   [字节 AILab](https://www.nowcoder.com/feed/main/detail/0794dc3ac487485e8c80cb4dc8e249b5?sourceSSR=search)
-   [字节懂车帝](https://juejin.cn/post/7351726029324042267)
