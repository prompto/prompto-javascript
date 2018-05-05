var prompto = require("../index"); // prompto
var antlr4 = require("antlr4");
var getResource = require("./BaseParserTest").getResource;
var checkSameOutput = require("./BaseParserTest").checkSameOutput;

function parse(input) {
	var parser = new prompto.parser.MCleverParser(input);
	return parser.parse();
}

exports.parseString = function(code) {
	return parse(code);
};

exports.parseResource = function(fileName) {
	var input = getResource(fileName);
	return parse(input);
};

exports.interpretResource = function(fileName, methodName, args) {
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

exports.checkInterpretedOutput = function(test, fileName) {
	exports.interpretResource(fileName);
	checkSameOutput(test, fileName);
	test.done();
};


exports.checkTranspiledOutput = exports.checkInterpretedOutput;
