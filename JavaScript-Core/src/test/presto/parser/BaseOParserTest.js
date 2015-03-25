var presto = require("../index"); // presto
var antlr4 = require("antlr4");
var getResource = require("./BaseParserTest").getResource;
var checkSameOutput = require("./BaseParserTest").checkSameOutput;

function parse(input) {
	var parser = new presto.parser.OCleverParser(input);
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
	var context = presto.runtime.Context.newGlobalContext();
	decls.register(context);
	decls.check(context);
    if(context.hasTests())
        presto.runtime.Interpreter.interpretTests(context);
    else {
        methodName = methodName || "main";
        args = args || "";
        presto.runtime.Interpreter.interpret(context, methodName, args);
    }
};

exports.checkOutput = function(test, fileName) {
	exports.runResource(fileName);
	checkSameOutput(test, fileName);
	test.done();
};

