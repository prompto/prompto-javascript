import { NoViableAltException, RecognitionException, Token } from 'antlr4';
import ProblemListener from './ProblemListener';
import ISuggestion from "./ISuggestion";
import AbstractParser from "../parser/AbstractParser";
export default class CodeCompleter extends ProblemListener {
    suggestions: ISuggestion[];
    syntaxError(recognizer: AbstractParser, offendingSymbol: Token, line: number, column: number, msg: string, e: RecognitionException): void;
    noViableAltError(recognizer: AbstractParser, offendingSymbol: Token, line: number, column: number, msg: string, e: NoViableAltException): void;
    hasSuggestion(s: string): boolean;
}
