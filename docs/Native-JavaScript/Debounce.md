# 防抖和节流

为了降低某操作的执行频率而设计的逻辑，叫做节流。

为了提高某项反应的触发门槛（例如滚动的距离），叫做防抖。

## JS实现

这是经典的面试题目。

```jsx
function debounce(func, delay){
    let inDebounce;
    return function(){
        let context = this;
        let args = arguments;
        clearTimeout(inDebounce);
        inDebounce = setTimeout(() => func.apply(context, args), delay);
    }
}
```