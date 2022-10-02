import antlr4, {CharStream, CommonTokenStream, FileStream, Lexer} from 'antlr4';
import {fileExists} from "../utils";
import EIndentingLexer from "./EIndentingLexer";

export function getFullText(ctx: antlr4.context.ParserRuleContext): string {
    const start = ctx.start;
    const stop = ctx.stop;
    if(start && start.start >= 0 && stop && stop.stop >= 0)
        return start.getInputStream().getText(start.start, stop.stop);
    else
        return ctx.getText();
}

export function createParserInput(data?: string, stream?: CharStream, lexer?: Lexer, newLexer?: (stream: CharStream) => Lexer): CommonTokenStream {

    let tokenStream: CommonTokenStream | null = null;

    if(data) {
        if(fileExists(data)) {
            stream = new FileStream(data);
        } else {
            stream = new CharStream(data);
        }
    }
    if(stream instanceof CharStream) {
        lexer = new EIndentingLexer(stream);
    }
    if(lexer instanceof Lexer) {
        tokenStream = new CommonTokenStream(lexer);
    }

    if(tokenStream)
        return tokenStream;
    else
        throw new Error("Invalid source!");
}
