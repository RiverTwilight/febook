# 原型链和继承

搞清楚这个问题很简单，你只要记住一点：**实例的 `__proto__` 指向对象的 `prototype`**。

换句话说，只要对象原型有的属性，那么他的实例就可以通过 `__proto__` 访问。例如：

```js
Object.prototype.ygeeker = "Hello YGeeker"

function foo() {
    return this.ygeeker
}

console.log(foo.__proto__.ygeeker) // "Hello YGeeker"
console.log(foo.ygeeker) // "Hello YGeeker"
console.log(foo()) // "Hello YGeeker"
```

## 对象属性的访问顺序

首先记住一点：原型链的尽头（root）是 `Object.prototype`。所有对象均从 `Object.prototype` 继承属性。

## 扩展阅读

* https://github.com/creeperyang/blog/issues/9

