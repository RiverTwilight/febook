---
sidebar_position: 3
---

# 数据结构

数据结构分为两种，**抽象结构**和**物理结构**。

在计算机中，

## 物理结构

物理结构是指数据的逻辑结构在计算机中的存储形式。

## 抽象结构

抽象结构是指数据对象中数据元素之间的关系。

### 链表

链表是一种物理存储单元上非连续、非顺序的存储结构，数据元素的逻辑顺序是通过链表中的指针链接次序实现的。

```javascript
function ListNode(val) {
  this.val = val;
  this.next = null;
}

```

### 栈

栈是一种先进后出的数据结构。

### 队列

### 树

与前面三种不同，树是一种非线性的数据结构。

扩展阅读：

* [史上最全遍历二叉树详解](https://leetcode.cn/problems/binary-tree-preorder-traversal/solutions/87526/leetcodesuan-fa-xiu-lian-dong-hua-yan-shi-xbian-2/?orderBy=most_votes)
