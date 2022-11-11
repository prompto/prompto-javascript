// Generated from ArgsLexer.g4 by ANTLR 4.11.2-SNAPSHOT

import {
	ATN,
	ATNDeserializer,
	CharStream, DFA,
	Lexer,
	LexerATNSimulator,
	PredictionContextCache,
	Token
} from 'antlr4';

export default class ArgsLexer extends Lexer {
	public static readonly STRING = 1;
	public static readonly EQUALS = 2;
	public static readonly DASH = 3;
	public static readonly WS = 4;
	public static readonly ELEMENT = 5;
	public static readonly EOF = Token.EOF;

	// tslint:disable:no-trailing-whitespace
	public static readonly channelNames: string[] = [
    	"DEFAULT_TOKEN_CHANNEL", "HIDDEN"
	];
	public static readonly literalNames = [ null, null, "'='", "'-'", "' '" ];
	public static readonly symbolicNames = [ null, "STRING", "EQUALS", "DASH", 
                                          "WS", "ELEMENT" ];
	// tslint:disable:no-trailing-whitespace
	public static readonly modeNames: string[] = [
		"DEFAULT_MODE",
	];

	public static readonly ruleNames: string[] = [
		"STRING", "EscapeSequence", "EQUALS", "DASH", "WS", "ELEMENT",
	];


	constructor(input: CharStream) {
		super(input);
		this._interp = new LexerATNSimulator(this, ArgsLexer._ATN, ArgsLexer.DecisionsToDFA, new PredictionContextCache());
	}

	public get grammarFileName(): string { return "ArgsLexer.g4"; }

	public get literalNames(): (string | null)[] { return ArgsLexer.literalNames; }
	public get symbolicNames(): (string | null)[] { return ArgsLexer.symbolicNames; }
	public get ruleNames(): string[] { return ArgsLexer.ruleNames; }

	public get serializedATN(): number[] { return ArgsLexer._serializedATN; }

	public get channelNames(): string[] { return ArgsLexer.channelNames; }

	public get modeNames(): string[] { return ArgsLexer.modeNames; }

	public static readonly _serializedATN: number[] = [4,0,5,46,6,-1,2,0,7,
	0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,1,0,1,0,1,0,5,0,17,8,0,10,0,12,
	0,20,9,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,32,8,1,1,2,1,2,1,3,
	1,3,1,4,1,4,1,4,1,4,1,5,4,5,43,8,5,11,5,12,5,44,0,0,6,1,1,3,0,5,2,7,3,9,
	4,11,5,1,0,3,4,0,10,10,13,13,34,34,92,92,8,0,34,34,39,39,92,92,98,98,102,
	102,110,110,114,114,116,116,6,0,9,10,13,13,32,32,34,34,45,45,61,61,50,0,
	1,1,0,0,0,0,5,1,0,0,0,0,7,1,0,0,0,0,9,1,0,0,0,0,11,1,0,0,0,1,13,1,0,0,0,
	3,23,1,0,0,0,5,33,1,0,0,0,7,35,1,0,0,0,9,37,1,0,0,0,11,42,1,0,0,0,13,18,
	5,34,0,0,14,17,3,3,1,0,15,17,8,0,0,0,16,14,1,0,0,0,16,15,1,0,0,0,17,20,
	1,0,0,0,18,16,1,0,0,0,18,19,1,0,0,0,19,21,1,0,0,0,20,18,1,0,0,0,21,22,5,
	34,0,0,22,2,1,0,0,0,23,31,5,92,0,0,24,32,7,1,0,0,25,26,2,48,51,0,26,27,
	2,48,55,0,27,32,2,48,55,0,28,29,2,48,55,0,29,32,2,48,55,0,30,32,2,48,55,
	0,31,24,1,0,0,0,31,25,1,0,0,0,31,28,1,0,0,0,31,30,1,0,0,0,32,4,1,0,0,0,
	33,34,5,61,0,0,34,6,1,0,0,0,35,36,5,45,0,0,36,8,1,0,0,0,37,38,5,32,0,0,
	38,39,1,0,0,0,39,40,6,4,0,0,40,10,1,0,0,0,41,43,8,2,0,0,42,41,1,0,0,0,43,
	44,1,0,0,0,44,42,1,0,0,0,44,45,1,0,0,0,45,12,1,0,0,0,5,0,16,18,31,44,1,
	6,0,0];

	private static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!ArgsLexer.__ATN) {
			ArgsLexer.__ATN = new ATNDeserializer().deserialize(ArgsLexer._serializedATN);
		}

		return ArgsLexer.__ATN;
	}


	static DecisionsToDFA = ArgsLexer._ATN.decisionToState.map( (ds, index) => new DFA(ds, index) );
}
