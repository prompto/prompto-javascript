import antlr4 from 'antlr4';
import ProblemListener from './ProblemListener'
import ISuggestion from "./ISuggestion";
import {integerRange} from "../utils/Utils";
import AbstractParser from "../parser/AbstractParser";

export default class CodeCompleter extends ProblemListener {

    suggestions: ISuggestion[];

    syntaxError(recognizer: AbstractParser, offendingSymbol: antlr4.Token, line: number, column: number, msg: string, e: antlr4.error.RecognitionException) {
        if (e instanceof antlr4.error.NoViableAltException) {
            this.noViableAltError(recognizer, offendingSymbol, line, column, msg, e);
        } else
            super.syntaxError(recognizer, offendingSymbol, line, column, msg, e);
    }

    noViableAltError(recognizer: AbstractParser, offendingSymbol: antlr4.Token, line: number, column: number, msg: string, e: antlr4.error.NoViableAltException) {
        const literalNames: string[] = recognizer["literalNames" as keyof typeof recognizer] as string[];
        const symbolicNames: string[] = recognizer["symbolicNames" as keyof typeof recognizer] as string[];
        this.suggestions = e.deadEndConfigs.configs
            .map(cfg => cfg.state.atn.getExpectedTokens(cfg.state.stateNumber, e.ctx))
            .map(intervalSet => intervalSet.intervals)
            .flatMap(interval => interval)
            .map(interval => integerRange(interval.start, interval.stop))
            .flatMap(typ => typ)
            .map(typ => {
                    let literal = literalNames[typ];
                    if(literal)
                        literal = literal.substring(1, literal.length-1);
                    return { type : typ, symbol: symbolicNames[typ], literal: literal };
                });
    }

    hasSuggestion(s: string) {
        return this.suggestions.map(s => s.literal).indexOf(s)>=0;
    }
}
