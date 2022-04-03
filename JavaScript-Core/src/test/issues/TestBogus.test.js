import antlr4 from "antlr4";
var prompto = require("../../main/prompto/index");
var execute = require("../prompto/parser/BaseParserTest").execute;

test('explore bogus.pec', () => {
    var path = __dirname + "/bogus.pec";
    var input = new antlr4.FileStream(path);
    var parser = new prompto.parser.ECleverParser(input);
    var decls = parser.parse();
    execute(decls, "main");
});

