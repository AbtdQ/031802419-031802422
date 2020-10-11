function addForest(inputElemID, outputElemID) {
    const rawInput = document.getElementById(inputElemID).value.trim();
    const forestJSON = getForestJSON(rawInput);
    for (const treeJSON of forestJSON) {
        insertTree(treeJSON, outputElemID);
    }
}

function clearInput(inputElemID) {
    const inputElem = document.getElementById(inputElemID);
    inputElem.value = "";
}

function clearForest() {
    removeAllTrees();
}