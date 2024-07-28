# 树

## DFS（深度优先搜索）

```js
var maxDepth = function (root) {
	function dfs(node) {
		if (node === null) return 0;

		const leftHeight = dfs(node.left);
		const rightHeight = dfs(node.right);

		return Math.max(leftHeight, rightHeight) + 1;
	}

	return dfs(root);
};
```
