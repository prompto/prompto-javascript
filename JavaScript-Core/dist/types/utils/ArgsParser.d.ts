import { ATN, DFA, FailedPredicateException, Parser, ParserRuleContext, TerminalNode, TokenStream } from 'antlr4';
import ArgsParserListener from "./ArgsParserListener.js";
export default class ArgsParser extends Parser {
    static readonly STRING = 1;
    static readonly EQUALS = 2;
    static readonly DASH = 3;
    static readonly WS = 4;
    static readonly ELEMENT = 5;
    static readonly EOF: number;
    static readonly RULE_parse = 0;
    static readonly RULE_entry = 1;
    static readonly RULE_key = 2;
    static readonly RULE_value = 3;
    static readonly literalNames: string[];
    static readonly symbolicNames: string[];
    static readonly ruleNames: string[];
    get grammarFileName(): string;
    get literalNames(): (string | null)[];
    get symbolicNames(): (string | null)[];
    get ruleNames(): string[];
    get serializedATN(): number[];
    protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException;
    constructor(input: TokenStream);
    parse(): ParseContext;
    entry(): EntryContext;
    key(): KeyContext;
    value(): ValueContext;
    static readonly _serializedATN: number[];
    private static __ATN;
    static get _ATN(): ATN;
    static DecisionsToDFA: DFA[];
}
export declare class ParseContext extends ParserRuleContext {
    _e: EntryContext;
    constructor(parser?: ArgsParser, parent?: ParserRuleContext, invokingState?: number);
    entry_list(): EntryContext[];
    entry(i: number): EntryContext;
    get ruleIndex(): number;
    enterRule(listener: ArgsParserListener): void;
    exitRule(listener: ArgsParserListener): void;
}
export declare class EntryContext extends ParserRuleContext {
    _k: KeyContext;
    _v: ValueContext;
    constructor(parser?: ArgsParser, parent?: ParserRuleContext, invokingState?: number);
    EQUALS(): TerminalNode;
    key(): KeyContext;
    value(): ValueContext;
    DASH(): TerminalNode;
    get ruleIndex(): number;
    enterRule(listener: ArgsParserListener): void;
    exitRule(listener: ArgsParserListener): void;
}
export declare class KeyContext extends ParserRuleContext {
    constructor(parser?: ArgsParser, parent?: ParserRuleContext, invokingState?: number);
    ELEMENT(): TerminalNode;
    get ruleIndex(): number;
    enterRule(listener: ArgsParserListener): void;
    exitRule(listener: ArgsParserListener): void;
}
export declare class ValueContext extends ParserRuleContext {
    constructor(parser?: ArgsParser, parent?: ParserRuleContext, invokingState?: number);
    get ruleIndex(): number;
    copyFrom(ctx: ValueContext): void;
}
export declare class ELEMENTContext extends ValueContext {
    constructor(parser: ArgsParser, ctx: ValueContext);
    ELEMENT(): TerminalNode;
    enterRule(listener: ArgsParserListener): void;
    exitRule(listener: ArgsParserListener): void;
}
export declare class STRINGContext extends ValueContext {
    constructor(parser: ArgsParser, ctx: ValueContext);
    STRING(): TerminalNode;
    enterRule(listener: ArgsParserListener): void;
    exitRule(listener: ArgsParserListener): void;
}
