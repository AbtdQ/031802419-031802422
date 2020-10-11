let treeIDs = [];
const idPrefix = "tree_";

function newTreeID() {
    let id = treeIDs.length;
    treeIDs.push(id);
    return idPrefix + id;
}

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
            expandIcon: 'glyphicon glyphicon-hand-right',
            collapseIcon: 'glyphicon glyphicon-hand-down',
            emptyIcon: 'glyphicon glyphicon-user',
            showBorder: true,
            data: [treeJSON]
        }
    );
    return id;
}

function removeAllTrees() {
}