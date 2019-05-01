var antlr4 = require("antlr4");
var prompto = require("../../main/prompto/index");

test('explore bogus.pec', () => {
    var path = __dirname + "/bogus.pec";
    var input = new antlr4.FileStream(path);
    var parser = new prompto.parser.ECleverParser(input);
    var decls = parser.parse();
    var context = prompto.runtime.Context.newGlobalContext();
    decls.register(context);
    decls.check(context);
    decls[decls.length-1].interpret(context);
});
