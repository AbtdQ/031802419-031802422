function getTreeJSON(rawInput) {
    const rows = rawInput.split("\n");
    const groupNodes = [];
    for (let i = 1; i < rows.length; i++) {
        const names = rows[i].split(/[：、]/);
        const stuNodes = [];
        for (let j = 1; j < names.length; j++) {
            stuNodes.push({"text" : names[j]});
        }
        groupNodes.push({"text": names[0], "nodes": stuNodes});
    }
    const professor = rows[0].split("导师：")[1];
    const treeJSON = {"text": professor, "nodes": groupNodes};
    return treeJSON;
}

function getForestJSON(rawInput) {
    const treeRawInputs = rawInput.split("\n\n");
    const forestJSON = [];
    for (const input of treeRawInputs) {
        if (input === "") continue;
        forestJSON.push(getTreeJSON(input));
    }
    return forestJSON;
}