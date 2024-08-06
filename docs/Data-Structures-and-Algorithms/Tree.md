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

## BFS（广度优先搜索）

例如，给你一个二叉树的根节点 root ， 检查它是否轴对称。

```js
function isSymmertic(root) {
	function bfs(left, right) {
		if (left === null && right === null) {
			return true;
		}

		if (left === null || right === null || left.val !== right.val) {
			return false;
		}

		return bfs(left.left, right.right) && bfs(left.right);
	}

	if (root === null) return true;

	return bfs();
}
```
