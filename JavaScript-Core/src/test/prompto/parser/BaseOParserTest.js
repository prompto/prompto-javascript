var prompto = require("../index"); // prompto
var antlr4 = require("antlr4");
var BaseParserTest = require("./BaseParserTest");
var getResource = BaseParserTest.getResource;
var checkSameOutput = BaseParserTest.checkSameOutput;
var execute = BaseParserTest.execute;
var interpret = BaseParserTest.interpret;

function parse(input) {
	var parser = new prompto.parser.OCleverParser(input);
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
	var decls = exports.parseResource(fileName);
	interpret(decls, methodName, args);
};

exports.executeResource = function(fileName, methodName, args) {
    var decls = exports.parseResource(fileName);
    execute(decls, methodName, args);
};

exports.checkInterpretedOutput = function(test, fileName) {
	exports.interpretResource(fileName);
	checkSameOutput(test, fileName);
	test.done();
};


exports.checkTranspiledOutput = function(test, fileName) {
    exports.executeResource(fileName);
    checkSameOutput(test, fileName);
    test.done();
};

exports.checkTranspiledOutput = exports.checkInterpretedOutput;
