# 排序算法

## 快速排序

快速排序的核心思想是哨兵的划分。本质上是把一个数组的排序分成了两个数组的排序。

```js
function quickSort(arr) {
	if (arr.length <= 1) {
		return arr;
	}

	let pivot = arr[Math.floor(arr.length / 2)];

	let left = [],
		right = [],
		equal = [];

	for (item of arr) {
		if (item < pivot) {
			left.push(item);
		} else if (item > pivot) {
			right.push(item);
		} else {
			equal.push(item);
		}
	}

	return [...quickSort(left), ...equal, ...quickSort(right)];
}
```

## 冒泡排序

冒泡排序的实现比较简单。把每一个元素想象为大小不同的气泡，值越大，气泡越大。

我们从左边开始，比较相邻的两个杯子(j 和 j+1)，如果左边的气泡比右边的大，就交换它们的位置。

```js
function babbleSort(arr) {
	const len = arr.length;

	for (let i = 0; i < len; i++) {
		for (let j = 0; j < len - 1 - i; j++) {
			if (arr[j] > arr[j + 1]) {
				[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
			}
		}
	}

	return arr;
}
```

## 插入排序

插入排序可以比喻为整理一手扑克牌：

1. 你从左手拿起一张牌，这是你已排序的部分。
2. 然后，你右手拿起下一张牌。
3. 你将这张牌与左手中的牌从右到左比较，找到它应该插入的正确位置。
4. 重复步骤 2-3，直到右手中的牌全部插入到左手的正确位置。

平均时间复杂度为 O(n^2)。

```js
function insertionSort(arr) {
	const len = arr.length;
	for (let i = 1; i < len; i++) {
		let currentElement = arr[i]; // 拿到右手的新牌
		let j = i - 1; // 左手已经排好的牌

		while (j > 0 && arr[j] > currentElement) {
			arr[j + 1] = arr[j]; // 插入
			j--;
		}

		arr[j + 1] = currentElement; // 放到右边
	}

	return arr;
}
```
