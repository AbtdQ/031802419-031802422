# 模块设计

## ui.js

- addForest(elemID)
  - 从指定元素获取输入并向页面添加新树

- clearInput(InputElemID)
  - 清空输入框

- clearForest()
  - 清空所有树

## dataProc.js

- getTreeJSON(rawInput)
  - 给定单颗树的输入，返回 JSON 字符串

- getForestJSON(rawInput)
  - 给定原始输入，返回包含所有树 JSON 的字符串数组

## tree.js

- insertTree(treeJSON, parentElemID)
  - 根据给定的 JSON 字符串 treeJSON ，在文档指定父元素下绘制相应的树
  - 插入的树的 id 会被加入 treeIDs[]
  - 返回插入的树的 id

- removeAllTrees()
  - 删除所有树

- newTreeID()
  - 创建新的 tree ID ，存入 treeIDs 并返回之

- treeIDs[]
  - 储存所有树的 id