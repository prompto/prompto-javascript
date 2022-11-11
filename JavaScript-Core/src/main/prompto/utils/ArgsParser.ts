// Generated from ArgsParser.g4 by ANTLR 4.11.2-SNAPSHOT

import {
	ATN,
	ATNDeserializer, DFA, FailedPredicateException,
	NoViableAltException,
	Parser, ParserATNSimulator,
	ParserRuleContext,
	PredictionContextCache, RecognitionException, TerminalNode,
	Token,
	TokenStream
} from 'antlr4';
import ArgsParserListener from "./ArgsParserListener.js";
// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
type int = number;

export default class ArgsParser extends Parser {
	public static readonly STRING = 1;
	public static readonly EQUALS = 2;
	public static readonly DASH = 3;
	public static readonly WS = 4;
	public static readonly ELEMENT = 5;
	public static readonly EOF = Token.EOF;
	public static readonly RULE_parse = 0;
	public static readonly RULE_entry = 1;
	public static readonly RULE_key = 2;
	public static readonly RULE_value = 3;
	public static readonly literalNames = [ null, null, "'='", "'-'", "' '" ];
	public static readonly symbolicNames = [ null, "STRING", "EQUALS", "DASH", 
                                          "WS", "ELEMENT" ];
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"parse", "entry", "key", "value",
	];
	public get grammarFileName(): string { return "ArgsParser.g4"; }
	public get literalNames(): (string | null)[] { return ArgsParser.literalNames; }
	public get symbolicNames(): (string | null)[] { return ArgsParser.symbolicNames; }
	public get ruleNames(): string[] { return ArgsParser.ruleNames; }
	public get serializedATN(): number[] { return ArgsParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(this, ArgsParser._ATN, ArgsParser.DecisionsToDFA, new PredictionContextCache());
	}
	// @RuleVersion(0)
	public parse(): ParseContext {
		let localctx: ParseContext = new ParseContext(this, this._ctx, this.state);
		this.enterRule(localctx, 0, ArgsParser.RULE_parse);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 11;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la==3 || _la==5) {
				{
				{
				this.state = 8;
				localctx._e = this.entry();
				}
				}
				this.state = 13;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public entry(): EntryContext {
		let localctx: EntryContext = new EntryContext(this, this._ctx, this.state);
		this.enterRule(localctx, 2, ArgsParser.RULE_entry);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 15;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la==3) {
				{
				this.state = 14;
				this.match(ArgsParser.DASH);
				}
			}

			this.state = 17;
			localctx._k = this.key();
			this.state = 18;
			this.match(ArgsParser.EQUALS);
			this.state = 19;
			localctx._v = this.value();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public key(): KeyContext {
		let localctx: KeyContext = new KeyContext(this, this._ctx, this.state);
		this.enterRule(localctx, 4, ArgsParser.RULE_key);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 21;
			this.match(ArgsParser.ELEMENT);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public value(): ValueContext {
		let localctx: ValueContext = new ValueContext(this, this._ctx, this.state);
		this.enterRule(localctx, 6, ArgsParser.RULE_value);
		try {
			this.state = 25;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 5:
				localctx = new ELEMENTContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 23;
				this.match(ArgsParser.ELEMENT);
				}
				break;
			case 1:
				localctx = new STRINGContext(this, localctx);
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 24;
				this.match(ArgsParser.STRING);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}

	public static readonly _serializedATN: number[] = [4,1,5,28,2,0,7,0,2,1,
	7,1,2,2,7,2,2,3,7,3,1,0,5,0,10,8,0,10,0,12,0,13,9,0,1,1,3,1,16,8,1,1,1,
	1,1,1,1,1,1,1,2,1,2,1,3,1,3,3,3,26,8,3,1,3,0,0,4,0,2,4,6,0,0,26,0,11,1,
	0,0,0,2,15,1,0,0,0,4,21,1,0,0,0,6,25,1,0,0,0,8,10,3,2,1,0,9,8,1,0,0,0,10,
	13,1,0,0,0,11,9,1,0,0,0,11,12,1,0,0,0,12,1,1,0,0,0,13,11,1,0,0,0,14,16,
	5,3,0,0,15,14,1,0,0,0,15,16,1,0,0,0,16,17,1,0,0,0,17,18,3,4,2,0,18,19,5,
	2,0,0,19,20,3,6,3,0,20,3,1,0,0,0,21,22,5,5,0,0,22,5,1,0,0,0,23,26,5,5,0,
	0,24,26,5,1,0,0,25,23,1,0,0,0,25,24,1,0,0,0,26,7,1,0,0,0,3,11,15,25];

	private static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!ArgsParser.__ATN) {
			ArgsParser.__ATN = new ATNDeserializer().deserialize(ArgsParser._serializedATN);
		}

		return ArgsParser.__ATN;
	}


	static DecisionsToDFA = ArgsParser._ATN.decisionToState.map( (ds, index) => new DFA(ds, index) );

}

export class ParseContext extends ParserRuleContext {
	public _e!: EntryContext;
	constructor(parser?: ArgsParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public entry_list(): EntryContext[] {
		return this.getTypedRuleContexts(EntryContext) as EntryContext[];
	}
	public entry(i: number): EntryContext {
		return this.getTypedRuleContext(EntryContext, i) as EntryContext;
	}
    public get ruleIndex(): number {
    	return ArgsParser.RULE_parse;
	}
	public enterRule(listener: ArgsParserListener): void {
	    if(listener.enterParse) {
	 		listener.enterParse(this);
		}
	}
	public exitRule(listener: ArgsParserListener): void {
	    if(listener.exitParse) {
	 		listener.exitParse(this);
		}
	}
}


export class EntryContext extends ParserRuleContext {
	public _k!: KeyContext;
	public _v!: ValueContext;
	constructor(parser?: ArgsParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public EQUALS(): TerminalNode {
		return this.getToken(ArgsParser.EQUALS, 0);
	}
	public key(): KeyContext {
		return this.getTypedRuleContext(KeyContext, 0) as KeyContext;
	}
	public value(): ValueContext {
		return this.getTypedRuleContext(ValueContext, 0) as ValueContext;
	}
	public DASH(): TerminalNode {
		return this.getToken(ArgsParser.DASH, 0);
	}
    public get ruleIndex(): number {
    	return ArgsParser.RULE_entry;
	}
	public enterRule(listener: ArgsParserListener): void {
	    if(listener.enterEntry) {
	 		listener.enterEntry(this);
		}
	}
	public exitRule(listener: ArgsParserListener): void {
	    if(listener.exitEntry) {
	 		listener.exitEntry(this);
		}
	}
}


export class KeyContext extends ParserRuleContext {
	constructor(parser?: ArgsParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ELEMENT(): TerminalNode {
		return this.getToken(ArgsParser.ELEMENT, 0);
	}
    public get ruleIndex(): number {
    	return ArgsParser.RULE_key;
	}
	public enterRule(listener: ArgsParserListener): void {
	    if(listener.enterKey) {
	 		listener.enterKey(this);
		}
	}
	public exitRule(listener: ArgsParserListener): void {
	    if(listener.exitKey) {
	 		listener.exitKey(this);
		}
	}
}


export class ValueContext extends ParserRuleContext {
	constructor(parser?: ArgsParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return ArgsParser.RULE_value;
	}
	public copyFrom(ctx: ValueContext): void {
		super.copyFrom(ctx);
	}
}
export class ELEMENTContext extends ValueContext {
	constructor(parser: ArgsParser, ctx: ValueContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public ELEMENT(): TerminalNode {
		return this.getToken(ArgsParser.ELEMENT, 0);
	}
	public enterRule(listener: ArgsParserListener): void {
	    if(listener.enterELEMENT) {
	 		listener.enterELEMENT(this);
		}
	}
	public exitRule(listener: ArgsParserListener): void {
	    if(listener.exitELEMENT) {
	 		listener.exitELEMENT(this);
		}
	}
}
export class STRINGContext extends ValueContext {
	constructor(parser: ArgsParser, ctx: ValueContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public STRING(): TerminalNode {
		return this.getToken(ArgsParser.STRING, 0);
	}
	public enterRule(listener: ArgsParserListener): void {
	    if(listener.enterSTRING) {
	 		listener.enterSTRING(this);
		}
	}
	public exitRule(listener: ArgsParserListener): void {
	    if(listener.exitSTRING) {
	 		listener.exitSTRING(this);
		}
	}
}
