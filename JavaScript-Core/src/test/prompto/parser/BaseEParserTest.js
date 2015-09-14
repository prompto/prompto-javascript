var prompto = require("../index"); // prompto
var antlr4 = require("antlr4");
var getResource = require("./BaseParserTest").getResource;
var checkSameOutput = require("./BaseParserTest").checkSameOutput;

function parse(input) {
    var parser = new prompto.parser.ECleverParser(input);
    return parser.parse();
}

exports.parseString = function(code) {
    return parse(code);
};

exports.parseResource = function(fileName) {
	var input = getResource(fileName);
    return parse(input);
};

exports.runResource = function(fileName, methodName, args) {
    var input = getResource(fileName);
    var decls = parse(input);
    var context = prompto.runtime.Context.newGlobalContext();
    decls.register(context);
    decls.check(context);
    if(context.hasTests())
        prompto.runtime.Interpreter.interpretTests(context);
    else {
        methodName = methodName || "main";
        args = args || "";
        prompto.runtime.Interpreter.interpret(context, methodName, args);
    }
};

exports.checkProblems = function(test, code, expected) {
    var listener = new prompto.parser.ProblemCollector();
    var parser = new prompto.parser.ECleverParser(code);
    parser.removeErrorListeners();
    parser.addErrorListener(listener);
    var decls = parser.parse();
    var context = prompto.runtime.Context.newGlobalContext();
    context.problemListener = listener;
    decls.register(context);
    decls.check(context);
    test.equal(listener.problems.length, 1 - (expected==undefined));
    if(expected!=undefined)
        test.equal(listener.problems[0].message, expected);
    test.done();
};

exports.checkOutput = function(test, fileName) {
    exports.runResource(fileName);
    checkSameOutput(test, fileName);
    test.done();
};


