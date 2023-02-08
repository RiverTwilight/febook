# Typescript 进阶

## 装饰器 Decorator

装饰器是一种强大的功能，可以帮助我们拓展类和方法，使其可以更好地适应应用程序的需求。它们是一种在编译时执行的函数，可以修改类的行为和结构。装饰器是一种灵活的工具，可以用来处理应用程序中的复杂性，并且可以简化代码，使其更易读。

目前装饰器还是实验功能，需要配置才能开启，具体方法如下：在 `tsconfig.json` 文件中将 "experimentalDecorators" 属性设置为 true，即可启用装饰器功能。使用装饰器的时候，需要注意它的执行顺序，比如属性装饰器总是优先于方法装饰器，类装饰器总是最后执行。此外，装饰器也可以用于修改类的行为，比如把类变成单例模式，或者拦截实例化，等等。

我们来看一个 Typescript 中装饰器的例子：

```tsx
@log
class MyClass {
	/* ... */
}

@logParams
class MyClass2 {
	/* ... */
}
```

上面的代码使用了两个装饰器，`@log` 和 `@logParams`。前者会在控制台中输出一条信息，每当调用 MyClass 类的方法时；而 `@logParams` 则会在控制台中输出每个方法的参数。这样，我们就可以更加精确地调试程序，从而提高代码的健壮性和可靠性。此外，装饰器还可以用于修饰属性，以及拦截类的实例化，等等。

### 自定义装饰器

除了可以使用内置的装饰器之外，我们也可以自定义装饰器，来满足自己的需求。自定义装饰器的语法要求比较严格，需要使用特定的方式来定义，比如装饰器必须是一个函数，而不能是一个类，方法装饰器必须传入两个参数，等等。另外，装饰器也可以使用混入来实现，混入也是一种类似装饰器的技术，可以让我们把多个类的代码合并到一个类中，从而更加方便地复用代码。

来看一个例子：

```tsx
function log(target: any, key: string, descriptor: PropertyDescriptor) {
	let original = descriptor.value;
	descriptor.value = function (...args: any[]) {
		console.log(`Calling ${key} with args: ${args}`);
		return original.apply(this, args);
	};
	return descriptor;
}
```

上面的代码定义了一个装饰器函数 `log`，它可以拦截被装饰的方法，并在控制台中输出它的参数，从而便于调试和维护。使用这个自定义的装饰器，只需要在方法定义的前面加上 `@log` 即可，比如：

```tsx
class MyClass {
	@log
	myMethod() {
		// ...
	}
}
```

这样，每次调用 `myMethod` 方法时，就会在控制台中输出参数，从而更加方便地调试程序。

从上面的例子中我们可以窥见装饰器的实现原理：

通过在编译时执行装饰器函数来修改类的行为和结构。装饰器函数会接收三个参数：target，key，descriptor，其中 target 表示被装饰的对象，key 表示被装饰的属性或方法名，descriptor 表示被装饰属性或方法的描述对象。装饰器函数会在编译时针对 target 对象中的 key 属性或方法进行修改，从而改变类的行为和结构。
