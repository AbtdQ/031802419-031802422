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

function getForestJSON(rawInput) {
    const treeRawInputs = rawInput.split("\n\n");
    const forestJSON = [];
    const skillsJSON = [];
    for (const input of treeRawInputs) {
        if (input === "") {
            continue;
        }
        else if (isTree(input)) {
            forestJSON.push(getTreeJSON(input.trim()));
        }
        else {
            skillsJSON.push(getSkillJSON(input));
        }
    }
    for (const tree of forestJSON) {
        AddSkillsToTree(tree, skillsJSON);
    }
    return forestJSON;
}

function getSkillJSON(rawInput) {
    const names = rawInput.split(/[：、]/);
    const skillNodes = [];
    for (let i = 1; i < names.length; i++) {
        skillNodes.push({ "text": names[i] });
    }
    const skillJSON = { "text": names[0], "nodes": skillNodes };
    return skillJSON;
}

function isTree(rawInput) {
    return rawInput.includes("导师：");
}

function AddSkillsToTree(treeJSON, skillsJSON) {
    for (const skill of skillsJSON) {
        for (const grp of treeJSON["nodes"]) {
            for (const stu of grp["nodes"]) {
                if (stu["text"] == skill["text"]) {
                    stu["nodes"] = skill["nodes"];
                }
            }
        }
    }
}