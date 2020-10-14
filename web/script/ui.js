// 从指定元素获取输入并向页面添加新树
function addForest(inputElemID, outputElemID) {
    const rawInput = document.getElementById(inputElemID).value.trim();
    const forestJSON = getForestJSON(rawInput);
    for (const treeJSON of forestJSON) {
        const treeID = insertTree(treeJSON, outputElemID);
        const treeElem = document.getElementById(treeIDinDOM(treeID));
        treeElem.insertAdjacentHTML(
            "afterbegin",
            `<button type="button" class="button" onclick="buttonRemoveTree(${treeID})">删除</button>`
        );
    }
}

// 清空输入框
function clearInput(inputElemID) {
    const inputElem = document.getElementById(inputElemID);
    inputElem.value = "";
}

// 清空所有树
function clearForest() {
    removeAllTrees();
}

// 删除特定树
function buttonRemoveTree(treeID) {
    removeTree(treeID);
}