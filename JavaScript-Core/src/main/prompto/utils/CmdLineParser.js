const antlr4 = require("antlr4/index");
const al = require("./ArgsLexer");
const ap = require("./ArgsParser");
const ArgsParserListener = require("./ArgsParserListener").ArgsParserListener;

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
        const key = this.values[ctx.k];
        const value = this.values[ctx.v];
        this.args[key] = value;
    }

    exitKey(ctx) {
        this.values[ctx] = ctx.getText();
    }

    exitSTRING(ctx) {
        const s = ctx.getText();
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
        const stream = new antlr4.InputStream(input);
        const lexer = new al.ArgsLexer(stream);
        const tokens = new antlr4.CommonTokenStream(lexer);
        const parser = new ap.ArgsParser(tokens);
        const tree = parser.parse();
        const builder = new CmdLineBuilder();
        const walker = new antlr4.tree.ParseTreeWalker();
        walker.walk(builder, tree);
        return builder.getCmdLineArgs();
    }
}

exports.CmdLineParser = CmdLineParser;