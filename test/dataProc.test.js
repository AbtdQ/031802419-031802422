QUnit.module("dataProc.js");
{
    const inputs = [
        "导师：张三\n2016级博士生：天一、王二、吴五\n2015级硕士生：李四、王五、许六\n2016级硕士生：刘一、李二、李三\n2017级本科生：刘六、琪七、司四",
        "刘六：JAVA、数学建模",
        "李二：字节跳动、京东云"
    ];

    const results = [
        {
            "text": "张三",
            "nodes": [
                {
                    "text": "2016级博士生",
                    "nodes": [
                        { "text": "天一" },
                        { "text": "王二" },
                        { "text": "吴五" }
                    ]
                },
                {
                    "text": "2015级硕士生",
                    "nodes": [
                        { "text": "李四" },
                        { "text": "王五" },
                        { "text": "许六" }
                    ]
                },
                {
                    "text": "2016级硕士生",
                    "nodes": [
                        { "text": "刘一" },
                        { "text": "李二" },
                        { "text": "李三" }
                    ]
                },
                {
                    "text": "2017级本科生",
                    "nodes": [
                        { "text": "刘六" },
                        { "text": "琪七" },
                        { "text": "司四" }
                    ]
                }
            ]
        },
        {
            "text": "刘六",
            "nodes": [
                { "text": "JAVA" },
                { "text": "数学建模" }
            ]
        },
        {
            "text": "李二",
            "nodes": [
                { "text": "字节跳动" },
                { "text": "京东云" }
            ]
        },
        {
            "text": "张三",
            "nodes": [
                {
                    "text": "2016级博士生",
                    "nodes": [
                        { "text": "天一" },
                        { "text": "王二" },
                        { "text": "吴五" }
                    ]
                },
                {
                    "text": "2015级硕士生",
                    "nodes": [
                        { "text": "李四" },
                        { "text": "王五" },
                        { "text": "许六" }
                    ]
                },
                {
                    "text": "2016级硕士生",
                    "nodes": [
                        { "text": "刘一" },
                        {
                            "text": "李二",
                            "nodes": [
                                { "text": "字节跳动" },
                                { "text": "京东云" }
                            ]
                        },
                        { "text": "李三" }
                    ]
                },
                {
                    "text": "2017级本科生",
                    "nodes": [
                        {
                            "text": "刘六",
                            "nodes": [
                                { "text": "JAVA" },
                                { "text": "数学建模" }
                            ]
                        },
                        { "text": "琪七" },
                        { "text": "司四" }
                    ]
                }
            ]
        }
    ];

    QUnit.test(
        "isTree()",
        a => {
            a.true(isTree(inputs[0]), inputs[0]);
            a.false(isTree(inputs[1]), inputs[1]);
            a.false(isTree(inputs[2]), inputs[2]);
        }
    );

    QUnit.test(
        "getTreeJSON()",
        a => {
            a.deepEqual(getTreeJSON(inputs[0]), results[0], inputs[0]);
        }
    );

    QUnit.test(
        "getSkillJSON()",
        a => {
            a.deepEqual(getSkillJSON(inputs[1]), results[1], inputs[1]);
            a.deepEqual(getSkillJSON(inputs[2]), results[2], inputs[2]);
        }
    );

    QUnit.test(
        "getForestJSON()",
        a => {
            a.deepEqual(
                getForestJSON(inputs[0] + "\n\n" + inputs[0]),
                [results[0], results[0]],
                "Muti tree test"
            );
            a.deepEqual(
                getForestJSON(inputs[0] + "\n\n" + inputs[1] + "\n\n" + inputs[2]),
                [results[3]],
                "Tree + Skill test"
            );
        }
    )
}