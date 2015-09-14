require("../../../../exploded");
var checkProblems = require("../../parser/BaseEParserTest").checkProblems;

exports.testNoError = function(test) {
    var code = "define name as: Text attribute\n";
    checkProblems(test, code);
};

exports.testSyntaxError = function(test) {
    var code = "define id as: Text attribute\n" +
               "define name as";
    checkProblems(test, code, "no viable alternative at input 'define name as<EOF>'");
};

exports.testDuplicateAttribute = function(test) {
    var code = "define name as: Text attribute\n" +
        "define name as: Text attribute\n";
    checkProblems(test, code, "Duplicate name: name");
};

exports.testDuplicateCategory = function(test) {
    var code = "define name as: Text attribute\n" +
        "define Person as: category with attribute: name\n" +
        "define Person as: category with attribute: name\n";
    checkProblems(test, code, "Duplicate name: Person");
};


exports.testDuplicateTest = function(test) {
    var code = "define \"find id\" as: test method doing:\n" +
                "\ta = 0\n" +
                "and expecting:\n" +
                "\ta = 0\n" +
                "define \"find id\" as: test method doing:\n" +
                "\ta = 0\n" +
                "and expecting:\n" +
                "\ta = 0\n";
    checkProblems(test, code, "Duplicate name: \"find id\"");
};


exports.testDuplicateMethod = function(test) {
    var code = "define print as: method doing:\n" +
            "\treturn 0\n" +
            "define print as: method doing:\n" +
            "\treturn 0\n";
    checkProblems(test, code, "Duplicate name: print");
};

exports.testNonDuplicateMethod = function(test) {
    var code = "define print as: method doing:\n" +
        "\treturn 0\n" +
        "define print as: method receiving: Text t doing:\n" +
        "\treturn 0\n";
    checkProblems(test, code);
};
