# 版本控制

版本控制是软件开发中非常重要的一部分，它可以帮助我们更好地管理项目，提高开发效率。

本文主要介绍 Git 的使用。

## 基本概念

## 实用技巧

-   可以直接使用 `git commit --amend --no-edit --no-verify` 将更改追加到上一次 commit 中。你可能需要 `git push --force` 来更新远程仓库。

### 如果 MR 出现非预期的 Commit 怎么办？

这通常是本地新建分支时错误操作导致的。可以遵循以下步骤解决：

1. 运行 `git checkout -b xxx-backup` 为当前工作分支创建一个备份
2. 运行 `git pull origin <base-branch>` 拉取 MR 中的基准分支
3. 运行 `git checkout -D <working-branch>` 删除出问题的分支（已经创建备份了可以放心删除）
4. 运行 `git checkout -b <base-branch>` 创建一个和基准分支一样的工作分支
5. 运行 `git cherry-pick <commit-hash>` 选取 commit 合入
6. 运行 `git push --set-upstream <working-branch> --force` 来强制推送

其中，cherry-pick 是个很实用的方法，可以把任意分支的任意一个 commit 提交到当前分支。
