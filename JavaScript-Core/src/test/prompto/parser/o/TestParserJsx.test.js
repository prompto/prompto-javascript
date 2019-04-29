var prompto = require("../../../../main/prompto/index");
var antlr4 = require("antlr4");

test('canParseAndTranslateMultilineElements', () => {
	var jsx = "return <a>\n\t<b/>\n\t<b/>\n</a>;";
	var parser = new prompto.parser.OCleverParser(jsx);
	var stmt = parser.doParse(parser.return_statement);
	expect(stmt.expression).toBeTruthy();
	var writer = new prompto.utils.CodeWriter(prompto.parser.Dialect.O, prompto.runtime.Context.newGlobalContext());
	stmt.toDialect(writer);
	writer.append(";");
	var out = writer.toString();
	expect(out).toEqual(jsx);
});

test('canParseAndTranslateMultilineAttributes', () => {
	var jsx = "return <a \n\tx=\"abc\"\n\ty=\"def\"\n\tz=\"stuff\" />;";
    var parser = new prompto.parser.OCleverParser(jsx);
    var stmt = parser.doParse(parser.return_statement);
    expect(stmt.expression).toBeTruthy();
	var writer = new prompto.utils.CodeWriter(prompto.parser.Dialect.O, prompto.runtime.Context.newGlobalContext());
	stmt.toDialect(writer);
    writer.append(";");
    var out = writer.toString();
	expect(out).toEqual(jsx);
});

