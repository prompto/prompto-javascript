require("../../../../exploded");

var prompto = require("../../../../main/prompto/index");
var antlr4 = require("antlr4");

exports.canParseAndTranslateMultilineElements = function(test) {
	var jsx = "return <a>\n\t<b/>\n\t<b/>\n</a>";
	var parser = new prompto.parser.MCleverParser(jsx);
	var stmt = parser.doParse(parser.return_statement, true);
	test.ok(stmt.expression);
	var writer = new prompto.utils.CodeWriter(prompto.parser.Dialect.M, prompto.runtime.Context.newGlobalContext());
	stmt.toDialect(writer);
	var out = writer.toString();
	test.equals(out, jsx);
	test.done();
};

exports.canParseAndTranslateMultilineAttributes = function(test) {
	var jsx = "return <a \n\tx=\"abc\"\n\ty=\"def\"\n\tz=\"stuff\" />";
    var parser = new prompto.parser.MCleverParser(jsx);
    var stmt = parser.doParse(parser.return_statement, true);
    test.ok(stmt.expression);
	var writer = new prompto.utils.CodeWriter(prompto.parser.Dialect.M, prompto.runtime.Context.newGlobalContext());
	stmt.toDialect(writer);
    var out = writer.toString();
    test.equals(out, jsx);
    test.done();
};

