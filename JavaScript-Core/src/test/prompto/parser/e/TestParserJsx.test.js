var prompto = require("../../../../main/prompto");
var antlr4 = require("antlr4");
var parseResource = require("../../parser/BaseEParserTest").parseResource;
var getResourceAsString = require("../../parser/BaseParserTest").getResourceAsString;


test('canParseAndTranslateMultilineElements', () => {
	var jsx = "return <a>\n\t<b/>\n\t<b/>\n</a>";
	var parser = new prompto.parser.ECleverParser(jsx);
	var stmt = parser.doParse(parser.return_statement, true);
	expect(stmt.expression).toBeTruthy();
	var writer = new prompto.utils.CodeWriter(prompto.parser.Dialect.E, prompto.runtime.Context.newGlobalsContext());
	stmt.toDialect(writer);
	var out = writer.toString();
	expect(out).toEqual(jsx);
});

test('canParseAndTranslateMultilineAttributes', () => {
	var jsx = "return <a \n\tx=\"abc\"\n\ty=\"def\"\n\tz=\"stuff\" />";
    var parser = new prompto.parser.ECleverParser(jsx);
    var stmt = parser.doParse(parser.return_statement, true);
    expect(stmt.expression).toBeTruthy();
	var writer = new prompto.utils.CodeWriter(prompto.parser.Dialect.E, prompto.runtime.Context.newGlobalsContext());
	stmt.toDialect(writer);
    var out = writer.toString();
    expect(out).toEqual(jsx);
});


test('canParseWidget', () => {
	var decls = parseResource("issues/widget.pec");
	expect(decls.length).toEqual(1);
	var decl = decls[0];
    expect(decl.methods.length).toEqual(2);
});


test('canParseWidget2', () => {
    var decls = parseResource("issues/widget.pec");
    expect(decls.length).toEqual(1);
    var decl = decls[0];
    expect(decl.methods.length).toEqual(2);
});

/* var s = getResourceAsString("issues/widget2.pec");
    var parser = new prompto.parser.ECleverParser(s);
    var buffer = parser._input;
    buffer.fill();
    var tokens = buffer.tokens;
    var lexer = buffer.tokenSource;
    var ELexer = require("../../../../main/prompto/parser/ELexer").ELexer;
    for(var i=0;i<tokens.length;i++) {
        var t = tokens[i];
        switch(t.type) {
            case ELexer.WS:
                console.log("WS");
                break;
            case ELexer.LF:
                console.log("LF");
                break;
            case ELexer.INDENT:
                console.log("INDENT");
                break;
            case ELexer.DEDENT:
                console.log("DEDENT");
                break;
            default:
                console.log(t.text);
        }
    }
    test.done();
};
*/
