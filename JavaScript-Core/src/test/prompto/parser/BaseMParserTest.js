var antlr4 = require("antlr4");
var prompto = require("../../../main/prompto");
var BaseParserTest = require("./BaseParserTest");
var getResource = BaseParserTest.getResource;
var checkSameOutput = BaseParserTest.checkSameOutput;
var execute = BaseParserTest.execute;
var interpret = BaseParserTest.interpret;
var checkSameSuggestions = BaseParserTest.checkSameSuggestions;

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
	var decls = exports.parseResource(fileName);
    interpret(decls, methodName, args);
};

exports.executeResource = function(fileName, methodName, args) {
    var decls = exports.parseResource(fileName);
    execute(decls, methodName, args);
};


exports.checkInterpretedOutput = function(fileName) {
    var MemStoreModule = require("../../../main/prompto/memstore/MemStore");
    MemStoreModule.Cursor = require("../../../main/prompto/intrinsic/Cursor").Cursor;
    prompto.store.$DataStore.instance = new MemStoreModule.MemStore();
	exports.interpretResource(fileName);
	checkSameOutput(fileName);
};


exports.checkTranspiledOutput = function(fileName) {
    exports.executeResource(fileName);
    checkSameOutput(fileName);
};


exports.checkSuggestions = function(fileName) {
    checkSameSuggestions(fileName, prompto.parser.MIndentingLexer, prompto.parser.MCleverParser, prompto.parser.MPromptoBuilder, prompto.suggest.MSuggester);
};
