require("../../../../exploded");

var prompto = require("../../../../main/prompto/index");
var antlr4 = require("antlr4");

exports.canParseAndTranslateMultilineElements = function(test) {
	var jsx = "return <a>\n\t<b/>\n\t<b/>\n</a>;";
	var parser = new prompto.parser.OCleverParser(jsx);
	var stmt = parser.doParse(parser.return_statement);
	test.ok(stmt.expression);
	var writer = new prompto.utils.CodeWriter(prompto.parser.Dialect.O, prompto.runtime.Context.newGlobalContext());
	stmt.toDialect(writer);
	writer.append(";");
	var out = writer.toString();
	test.equals(out, jsx);
	test.done();
};

exports.canParseAndTranslateMultilineAttributes = function(test) {
	var jsx = "return <a \n\tx=\"abc\"\n\ty=\"def\"\n\tz=\"stuff\" />;";
    var parser = new prompto.parser.OCleverParser(jsx);
    var stmt = parser.doParse(parser.return_statement);
    test.ok(stmt.expression);
	var writer = new prompto.utils.CodeWriter(prompto.parser.Dialect.O, prompto.runtime.Context.newGlobalContext());
	stmt.toDialect(writer);
    writer.append(";");
    var out = writer.toString();
    test.equals(out, jsx);
    test.done();
};

