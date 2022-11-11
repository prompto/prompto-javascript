import {ATN, Interval, IntervalSet, Lexer, ParseTree, RuleContext} from 'antlr4';
import { AnnotationProcessors } from "../processor";
import NodeLocator from "./NodeLocator";
import AbstractParser from "../parser/AbstractParser";
import Caret from "./Caret";
import {Context} from "../runtime";

export default abstract class BaseSuggester<T extends Lexer> {

    atn: ATN;
    tree: ParseTree;
    literalNames: string[];
    symbolicNames: string[];

    constructor(lexerClass: T, parser: AbstractParser,  tree: ParseTree) {
        this.atn = parser._interp.atn;
        this.tree = tree;
        this.literalNames = lexerClass["literalNames" as keyof typeof lexerClass] as string[];
        this.symbolicNames = lexerClass["symbolicNames" as keyof typeof lexerClass] as string[];
    }

    abstract getStartState(): number;
    abstract deduplicate_type(tokens: number[], context: Context): number[];

    suggestionsAt(caret: Caret, context: Context) {
        const node = this.locateNodeBefore(caret);
        const intervalSet = this.expectedTokenIntervalsAfter(node!);
        const tokens = this.flattenTokenIntervals(intervalSet.intervals);
        const deduped = this.deduplicate(tokens, context);
        const visible = deduped.filter(token => this.filterVisible(token), this);
        const stringified = visible.map(token => this.stringify(token), this);
        const enriched = this.enrich(stringified, context);
        enriched.sort((s1,s2) => this.caselessCompare(s1, s2));
        return enriched;
    }

    deduplicate(tokens: number[], context: Context) {
        return this.deduplicate_type(tokens, context);
    }

    enrich(names: string[], context: Context) {
        return this.enrichAnnotations(names);
    }

    caselessCompare(s1: string, s2: string) {
        const ls1 = s1.toLowerCase();
        const ls2 = s2.toLowerCase();
        return ls1 < ls2 ? -1 : (ls1 > ls2 ? 1 : (s1 < s2 ? -1 : (s1 > s2 ? 1 : 0)));
    }

    enrichAnnotations(names: string[]): string[] {
        const idx = names.indexOf("<arondbase>");
        if(idx < 0)
            return names;
        names.splice(idx, 1);
        return names.concat(AnnotationProcessors.names());
    }

    stringify(tokenType: number) {
        const name = this.literalNames[tokenType];
        if(name && name.startsWith("'"))
            return name.substring(1, name.length - 1);
        const symName = this.symbolicNames[tokenType];
        return "<" + symName.substring(0, symName.indexOf("_")).toLowerCase() + ">";
    }

    filterVisible(tokenType: number) {
        if(this.literalNames[tokenType])
            return true;
        const symName = this.symbolicNames[tokenType];
        return symName && (symName.endsWith("_LITERAL") || symName.endsWith("_IDENTIFIER"));
    }

    flattenTokenIntervals(intervals: Interval[]): number[] {
        return intervals.map(i => this.intervalToTokenArray(i))
                        .flatMap(n => n);
    }

    intervalToTokenArray(interval: Interval): number[] {
        const result = [];
        for(let t = interval.start; t < interval.stop; t++)
            result.push(t);
        return result;
    }

    expectedTokenIntervalsAfter(node: RuleContext): IntervalSet {
        let stateNumber = node.invokingState;
        if(stateNumber == -1)
            stateNumber = this.getStartState();
        const atnState = this.atn.states[stateNumber];
        return this.atn.nextTokens(atnState);
    }

    locateNodeBefore(caret: Caret) {
        const locator = new NodeLocator();
        return locator.locateNodeBefore(this.tree, caret);
    }

}

