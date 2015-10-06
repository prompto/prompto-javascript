require("../../../../exploded");
var checkCompletion = require("../../parser/BaseEParserTest").checkCompletion;
var checkCompletionAt = require("../../parser/BaseEParserTest").checkCompletionAt;

exports.testNoError = function(test) {
    var code = "define name as Text attribute\n";
    checkCompletion(test, code);
};

exports.testMissingType = function(test) {
    var code = "define name as attribute";
    checkCompletion(test, code, ["Text", "Integer", "Date"]);
};


exports.testOverride1 = function(test) {
    var code = "define name as Text attribute\ndefine name as Text attribute";
    checkCompletionAt(test, code, 2, 16, ["Text"]);
};

exports.testOverride2 = function(test) {
    var code = "define name as Text attribute\ndefine name as Text attribute";
    checkCompletionAt(test, code, 2, 2, ["define"]);
};


exports.testOverride3 = function(test) {
    var code = "define name as Text attribute\ndefine name as Text attribute";
    checkCompletionAt(test, code, 2, 22, ["attribute"]);
};

exports.testOverride4 = function(test) {
    var code = "define name as ";
    checkCompletionAt(test, code, 1, code.length - 1, ["Text", "Integer", "Date"]);
};
