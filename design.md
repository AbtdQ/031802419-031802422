# 模块设计

## ui.js

- showForest(elemID)
  - 从指定元素获取输入并开始处理过程
  - 绑定 创建树 按钮

- removeForest()
  - 删除所有树

## dataProc.js

- getTreeJSON(rawInput)
  - 给定单颗树的输入，返回 JSON 字符串

- getForestJSON(rawInput)
  - 给定原始输入，返回包含所有树 JSON 的字符串数组

## tree.js

- insertTree(root, id, parentElemID)
  - 根据给定的 JSON 字符串 root，在文档指定父元素下绘制相应的树

- removeTree(id)
  - 删除指定树

- treeIDs[]
  - 储存所有树的 id