// 储存所有树的 id
const treeIDs = new Set();

// 返回树在 DOM 中的元素 id
function treeIDinDOM(treeID) {
    return "tree_" + treeID;
}

// 创建新的 tree ID ，存入 treeIDs 并返回之
function newTreeID() {
    let id = Math.floor(Math.random() * 1000);
    while (treeIDs.has(id)) {
        id++;
    }
    treeIDs.add(id);
    return id;
}

// 根据给定的 treeJSON ，在文档指定父元素下绘制相应的树
// 调用 newTreeID() 为新树生成一 tree ID 并加入 treeIDs[]
// 新树在 DOM 中的 id 为 treeIDinDOM(treeID)
// 返回插入的树的 tree ID
function insertTree(treeJSON, parentElemID) {
    const id = newTreeID();
    const idInDOM = treeIDinDOM(id);
    $(`<div id="${idInDOM}"></div>`).appendTo("#" + parentElemID);
    $('<div></div>').appendTo("#" + idInDOM);
    $(`#${idInDOM} > div`).treeview(
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

// 删除特定树
function removeTree(treeID)
{
    const treeElem = document.getElementById(treeIDinDOM(treeID));
    treeElem.remove();
    treeIDs.delete(treeID);
}

// 删除所有树
function removeAllTrees() {
    for (const id of treeIDs) {
        removeTree(id);
    }
}