import {CharStream, CommonTokenStream, ParseTreeWalker, RuleContext} from 'antlr4';
import ArgsLexer from './ArgsLexer';
import ArgsParser, {ELEMENTContext, EntryContext, KeyContext, STRINGContext} from './ArgsParser';
import ArgsParserListener from './ArgsParserListener';

class CmdLineBuilder extends ArgsParserListener {

    args = new Map<string, string>();
    values = new Map<RuleContext, string>();

    getCmdLineArgs() {
        return this.args;
    }

    exitEntry = (ctx: EntryContext) => {
        const key = this.values.get(ctx._k) as string;
        const value = this.values.get(ctx._v) as string;
        this.args.set(key, value);
    }

    exitKey = (ctx: KeyContext) => {
        this.values.set(ctx, ctx.getText());
    }

    exitSTRING = (ctx: STRINGContext) => {
        const s = ctx.getText();
        this.values.set(ctx, s.substring(1, s.length - 1));
    }

    exitELEMENT = (ctx: ELEMENTContext) => {
        this.values.set(ctx, ctx.getText());
    }
}

export default class CmdLineParser {

    static parse(input: string | null) {
        if (!input) {
            input = "";
        }
        const stream = new CharStream(input);
        const lexer = new ArgsLexer(stream);
        const tokens = new CommonTokenStream(lexer);
        const parser = new ArgsParser(tokens);
        const tree = parser.parse();
        const builder = new CmdLineBuilder();
        const walker = new ParseTreeWalker();
        walker.walk(builder, tree);
        return builder.getCmdLineArgs();
    }
}
