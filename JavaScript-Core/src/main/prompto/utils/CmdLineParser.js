var antlr4 = require("antlr4/index");
var al = require("./ArgsLexer");
var ap = require("./ArgsParser");
var ArgsParserListener = require("./ArgsParserListener").ArgsParserListener;

class CmdLineBuilder extends ArgsParserListener {
    constructor() {
        super();
        this.args = {};
        this.values = {};
        return this;
    }

    getCmdLineArgs() {
        return this.args;
    }

    exitEntry(ctx) {
        var key = this.values[ctx.k];
        var value = this.values[ctx.v];
        this.args[key] = value;
    }

    exitKey(ctx) {
        this.values[ctx] = ctx.getText();
    }

    exitSTRING(ctx) {
        var s = ctx.getText();
        this.values[ctx] = s.substring(1, s.length - 1);
    }

    exitELEMENT(ctx) {
        this.values[ctx] = ctx.getText();
    }
}

class CmdLineParser {
    constructor() {
        return this;
    }

    static parse(input) {
        if (input === null) {
            input = "";
        }
        var stream = new antlr4.InputStream(input);
        var lexer = new al.ArgsLexer(stream);
        var tokens = new antlr4.CommonTokenStream(lexer);
        var parser = new ap.ArgsParser(tokens);
        var tree = parser.parse();
        var builder = new CmdLineBuilder();
        var walker = new antlr4.tree.ParseTreeWalker();
        walker.walk(builder, tree);
        return builder.getCmdLineArgs();
    }
}

exports.CmdLineParser = CmdLineParser;