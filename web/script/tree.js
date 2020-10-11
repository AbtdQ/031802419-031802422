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

// 根据给定的 treeJSON ，在文档指定父元素下绘制相应的树
// 插入的树的 id 会被加入 treeIDs[]
// 返回插入的树的 id
function insertTree(treeJSON, parentElemID) {
    const id = newTreeID();
    const parentElem = document.getElementById(parentElemID);
    const treeDiv = document.createElement("div");
    treeDiv.id = id;
    parentElem.appendChild(treeDiv);
    $("#" + id).treeview(
        {
            color: "#ffffff",
            backColor: "#366bb6",
            selectedBackColor: "#418bca",
            searchResultColor: "#ffe747",
            onhoverColor: "#2c61ac",
            //expandIcon: 'glyphicon glyphicon-hand-right',
            //collapseIcon: 'glyphicon glyphicon-hand-down',
            //emptyIcon: 'glyphicon glyphicon-user',
            showBorder: true,
            data: [treeJSON]
        }
    );
    return id;
}

// 删除所有树
function removeAllTrees() {
    for (const id of treeIDs) {
        const treeElem = document.getElementById(idPrefix + id);
        treeElem.remove();
    }
    treeIDs.length = 0;
}