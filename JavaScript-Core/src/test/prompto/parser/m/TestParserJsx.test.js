var prompto = require("../../../../main/prompto/index");
var antlr4 = require("antlr4");

test('parses and translates multi-line elements', () => {
	var jsx = "return <a>\n\t<b/>\n\t<b/>\n</a>";
	var parser = new prompto.parser.MCleverParser(jsx);
	var stmt = parser.doParse(parser.return_statement, true);
	expect(stmt.expression).toBeTruthy();
	var writer = new prompto.utils.CodeWriter(prompto.parser.Dialect.M, prompto.runtime.Context.newGlobalContext());
	stmt.toDialect(writer);
	var out = writer.toString();
	expect(out).toEqual(jsx);
});

test('parses and translates multi-line attributes', () => {
	var jsx = "return <a \n\tx=\"abc\"\n\ty=\"def\"\n\tz=\"stuff\" />";
    var parser = new prompto.parser.MCleverParser(jsx);
    var stmt = parser.doParse(parser.return_statement, true);
    expect(stmt.expression).toBeTruthy();
	var writer = new prompto.utils.CodeWriter(prompto.parser.Dialect.M, prompto.runtime.Context.newGlobalContext());
	stmt.toDialect(writer);
    var out = writer.toString();
    expect(out).toEqual(jsx);
});

