function showForest(InputElemID, OutputElemID) {
    const rawInput = document.getElementById(InputElemID).value.trim();
    const forestJSON = getForestJSON(rawInput);
    for (const treeJSON of forestJSON) {
        insertTree(treeJSON, OutputElemID);
    }
}