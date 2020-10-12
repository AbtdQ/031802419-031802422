| 这个作业属于哪个课程 | https://edu.cnblogs.com/campus/fzu/SE2020 |
| - | - |
| 这个作业要求在哪里 | https://edu.cnblogs.com/campus/fzu/SE2020/homework/11277 |
| 这个作业的目标 | 用 HTML+CSS+JS 实现师门树生成页面 |
| 学号 | 031802422 031802419 |

# GitHub 仓库地址

https://github.com/Fiyvv/031802419-031802422

# 分工

031802419：负责 HTML+CSS 的编写设计

031802422：负责用 JS 实现业务逻辑

# PSP

| 阶段 | 预估时间（分钟） | 实际时间（分钟）|
| :-: | :-: | :-: |
| **计划：明确需求和其他因素，估计以下的各个任务需要多少时间** | **60** | **60** |
| **开发** | **620** | **760** |
| 需求分析（包括学习新技术、新工具的时间） | 180 | 240 |
| 生成设计文档（整体框架的设计、各模块的接口、用时序图、快速原型等方法） | 120 | 120 |
| 设计复审（和同事审核设计文档，或者自己复审） | 10 | 30 |
| 代码规范（为目前的开发制定或选择合适的规范） | 10 | 10 |
| 具体设计（用伪代码、流程图等方法设计具体模块） | 60 | 90 |
| 具体编码 | 180 | 240 |
| 代码复审 | 30 | 10 |
| 测试（自我测试，修改代码，提交修改） | 30 | 20 |
| **报告** | **50** | **75** |
| 测试报告（发现了多少 Bug ，修复了多少） | 10 | 10 |
| 计算工作量（多少行代码，多少次签入，多少测试用例，其他工作量） | 10 | 5 |
| 事后总结，并提出改进计划（包括写文档、写博客的时间） | 30 | 60 |
| **总耗时** | **730** | **895** |

# 思路描述与设计实现

## 思路

首先问题可以分解为两个部分：

- 数据解析
- 图形绘制

查阅资料可知，图形绘制主要采用框架实现（自己造轮子……流下了没技术的泪水）。参考数据可视化的样例，发现 d3 框架较为流行，遂研究之，发现中文网络资料较少且过时，官方文档篇幅极长且晦涩难懂，还需要学习 svg 等前置知识，时间成本过高，考虑到并不宽裕的 Deadline ，我们转而选择了“即插即用”的 bootstrap-treeview 框架。

数据解析部分主要负责将原始输入数据转化为框架可接受的 JSON 对象格式，算法上并无门槛，技术难点在于 JS 的编写。

Javascript 是一门极富特色的语言，~~与 Java 的关系好比雷锋和雷峰塔一般亲密。~~ 又因其解释执行、弱类型、原型、闭包等与 C、C++、Java 完全不同的概念，初学时往往会遇到不少疑惑。但本次实践中，我们也感受到了其使用方便快捷，即插即用，语法灵活的优点，作为当今 Web 应用的支柱，Javascript 的确有其独到之处。

## 模块设计

### ui.js

包含用于直接绑定界面控件的函数

- addForest(inputElemID, outputElemID)
  - 从指定元素获取输入并向页面添加新树

- clearInput(InputElemID)
  - 清空输入框

- clearForest()
  - 清空所有树

### dataProc.js

数据解析、处理

- getTreeJSON(rawInput)
  - 给定单颗树的输入，返回 JSON 对象

- getForestJSON(rawInput)
  - 给定原始输入，返回包含所有树 JSON 的数组

- getSkillJSON(rawInput)
  - 给定单个技能树的输入，返回技能树 JSON 对象

- isTree(rawInput)
  - 判断输入是否是师门树

- AddSkillsToTree(treeJSON, skillsJSON)
  - 将技能树数组中的技能作为子节点添加到树中

### tree.js

树的绘制与管理

- insertTree(treeJSON, parentElemID)
  - 根据给定的 treeJSON ，在文档指定父元素下绘制相应的树
  - 插入的树的 id 会被加入 treeIDs[]
  - 返回插入的树的 id

- removeAllTrees()
  - 删除所有树

- newTreeID()
  - 创建新的 tree ID ，存入 treeIDs 并返回之

- treeIDs[]
  - 储存所有树的 id

## 数据流图

第 0 层

![](https://img2020.cnblogs.com/blog/2146427/202010/2146427-20201012000736266-501489753.jpg)

第 1 层

![](https://img2020.cnblogs.com/blog/2146427/202010/2146427-20201012000747897-1218881483.jpg)

## 重要代码

```javascript
// dataProc.js
// 给定单颗树的输入，返回 JSON 对象
function getTreeJSON(rawInput) {
    const rows = rawInput.split("\n");
    const groupNodes = [];
    for (let i = 1; i < rows.length; i++) {
        const names = rows[i].split(/[：、]/);
        const stuNodes = [];
        for (let j = 1; j < names.length; j++) {
            stuNodes.push({ "text": names[j] });
        }
        groupNodes.push({ "text": names[0], "nodes": stuNodes });
    }
    const professor = rows[0].split("导师：")[1];
    const treeJSON = { "text": professor, "nodes": groupNodes };
    return treeJSON;
}
```

# 附加特点展示

支持不刷新页面持续添加树

支持一键清空输入框、一键清空所有已添加的树

~~简易易用优美令人心旷神怡的 UI~~

![演示](https://img2020.cnblogs.com/blog/2146427/202010/2146427-20201012000256778-120337732.gif)

## 意义

我们发现部分同学的页面是“一次性”使用的，树状图生成后必须刷新页面才能添加新的树，使用有些不便。为此，我们在设计阶段就考虑了树的动态管理，并实现了不刷新情况下删除、添加树。代码上也预留了对具体树进行动态操作的能力。

## 实现思路

使用 tree id 机制管理页面中树的元素信息，tree id 基于数字生成，与 DOM 中的 id 关联。

## 重要代码

```javascript
// tree.js
// 储存所有树的 id
let treeIDs = [];

// 树作为 DOM 中的 id 时附加的前缀
const idPrefix = "tree_";

// 创建新的 tree ID ，存入 treeIDs 并返回之
function newTreeID() {
    let id = treeIDs.length;
    treeIDs.push(id);
    return idPrefix + id;
}

// 删除所有树
function removeAllTrees() {
    for (const id of treeIDs) {
        const treeElem = document.getElementById(idPrefix + id);
        treeElem.remove();
    }
    treeIDs.length = 0;
}
```

# 目录与使用说明

## 目录

```
├─docs                文档
├─test                测试用目录
│  └─qunit            测试框架
└─web                 页面根目录
    ├─css             CSS
    ├─fonts           字体
    ├─img             图片
    └─script          Javascript 脚本
        └─bootstrap   轮子
```

## 使用说明

下载项目并解压，浏览器打开 web 目录下的 index.html

# 单元测试

## 测试工具

测试工具采用 QUnit ，一个极为轻量化的测试框架。无需安装，无需运行环境，只需要一个 HTML 页面、一份 CSS，加上框架本体的 JS 就能欢快地跑，非常适合我们这种 Deadline 紧张的情况。

## 测试代码示例

```javascript
QUnit.test(
    "isTree()",
    a => {
        a.true(isTree(inputs[0]), inputs[0]);
        a.false(isTree(inputs[1]), inputs[1]);
        a.false(isTree(inputs[2]), inputs[2]);
    }
);
```

## 结果示例

![](https://img2020.cnblogs.com/blog/2146427/202010/2146427-20201012134617553-2019993625.png)

# Github 签入记录

![](https://img2020.cnblogs.com/blog/2146427/202010/2146427-20201012000559914-2071832976.png)

# 异常、困难，及其解决办法

- 生成多棵树时 CSS 无法匹配所有树
  - 尝试：修改选择器的通配符，失败
  - 解决办法：使用 `!important` 覆盖框架内的子类
  - 收获：进一步了解 CSS 的技巧

## 队友互评

- 031802422 对 031802419
  - 时间管理大师
  - 手改 16 进制 RGB 的狠人
  - Github 苦手
    - ~~没 commit 就切分支还来回切~~
    - ~~直接下载项目 zip 解压了就往里写~~
  - 收集资料能力特别强，感谢他提供的 HTML+CSS+JS 教材
  - ~~你才审美异常呢那叫已有轮子吗那是抄~~
- 031802419 对 031802422
  - 同样的时间管理大师
    - 两天精通HTML+CSS+JS
    - 三天开始JS写脚本
  - 编码能力特强，实现功能时甚至没有出现过bug
  - Github老司机，喷了我很多次T^T
  - 过于直男
    - 已有轮子偏偏不用，要自己造（牛逼）
    - 审美异常，透明输入框和大蓝色是什么鬼？