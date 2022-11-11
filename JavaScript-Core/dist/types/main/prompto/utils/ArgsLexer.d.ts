import { ATN, CharStream, DFA, Lexer } from 'antlr4';
export default class ArgsLexer extends Lexer {
    static readonly STRING = 1;
    static readonly EQUALS = 2;
    static readonly DASH = 3;
    static readonly WS = 4;
    static readonly ELEMENT = 5;
    static readonly EOF: number;
    static readonly channelNames: string[];
    static readonly literalNames: string[];
    static readonly symbolicNames: string[];
    static readonly modeNames: string[];
    static readonly ruleNames: string[];
    constructor(input: CharStream);
    get grammarFileName(): string;
    get literalNames(): (string | null)[];
    get symbolicNames(): (string | null)[];
    get ruleNames(): string[];
    get serializedATN(): number[];
    get channelNames(): string[];
    get modeNames(): string[];
    static readonly _serializedATN: number[];
    private static __ATN;
    static get _ATN(): ATN;
    static DecisionsToDFA: DFA[];
}
