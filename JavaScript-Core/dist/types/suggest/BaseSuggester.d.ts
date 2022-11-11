import { ATN, Interval, IntervalSet, Lexer, ParseTree, RuleContext } from 'antlr4';
import AbstractParser from "../parser/AbstractParser";
import Caret from "./Caret";
import { Context } from "../runtime";
export default abstract class BaseSuggester<T extends Lexer> {
    atn: ATN;
    tree: ParseTree;
    literalNames: string[];
    symbolicNames: string[];
    constructor(lexerClass: T, parser: AbstractParser, tree: ParseTree);
    abstract getStartState(): number;
    abstract deduplicate_type(tokens: number[], context: Context): number[];
    suggestionsAt(caret: Caret, context: Context): string[];
    deduplicate(tokens: number[], context: Context): number[];
    enrich(names: string[], context: Context): string[];
    caselessCompare(s1: string, s2: string): 1 | 0 | -1;
    enrichAnnotations(names: string[]): string[];
    stringify(tokenType: number): string;
    filterVisible(tokenType: number): boolean;
    flattenTokenIntervals(intervals: Interval[]): number[];
    intervalToTokenArray(interval: Interval): number[];
    expectedTokenIntervalsAfter(node: RuleContext): IntervalSet;
    locateNodeBefore(caret: Caret): import("antlr4").ParserRuleContext;
}
