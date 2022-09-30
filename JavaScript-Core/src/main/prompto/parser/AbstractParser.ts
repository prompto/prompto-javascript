/* do NOT delete this file, it is NOT generated */
/* it has to be located in the generated folder */
/* to work around jest resolver issues */
import antlr4 from 'antlr4';
import { Token, TokenStream, CommonTokenStream, Parser } from 'antlr4';

export default class AbstractParser extends Parser {

	path: string;

	constructor(input: TokenStream) {
		super(input);
		this.path = "";
	}

	isText(token: Token, text: string): boolean {
		this.getTokenStream();
		return text == token.text;
	}

	was(type: number): boolean {
		return this.lastHiddenTokenType() == type;
	}

	wasNot(type: number): boolean {
		return this.lastHiddenTokenType() != type;
	}

	wasNotWhiteSpace(): boolean {
		return this.lastHiddenTokenType() != this.wsToken();
	}

	willBe(type: number): boolean {
		return this.getTokenStream().LA(1) == type;
	}

	willBeIn(...args: number[]): boolean {
		const next = this.getTokenStream().LA(1);
		for(let i=0;i<args.length;i++) {
			if(next == args[i])
				return true;
		}
		return false;
	}

	willNotBe(type: number): boolean {
		return this.getTokenStream().LA(1) != type;
	}

	nextHiddenTokenType(): number {
		const bts = this.getTokenStream();
		const hidden = bts.getHiddenTokensToRight(bts.index - 1);
		if (hidden == null || hidden.length == 0) {
			return 0;
		} else {
			return hidden[0].type;
		}
	}

	willBeAOrAn(): boolean {
		return this.willBeText("a") || this.willBeText("an");
	}

	willBeText(text: string): boolean {
		return text == this.getTokenStream().LT(1).text;
	}

	lastHiddenTokenType(): number {
		const bts = this.getTokenStream();
		const hidden = bts.getHiddenTokensToLeft(bts.index);
		if (hidden == null || hidden.length == 0) {
			return 0;
		} else {
			return hidden[hidden.length - 1].type;
		}
	}

	removeErrorListeners(): void {
		super.removeErrorListeners();
		const bts = this.getTokenStream() as CommonTokenStream;
		bts.tokenSource.removeErrorListeners(); // lexer
	}

	addErrorListener(listener: antlr4.error.ErrorListener<Token>): void {
		super.addErrorListener(listener);
		const bts = this.getTokenStream() as CommonTokenStream;
		bts.tokenSource.addErrorListener(listener as unknown as antlr4.error.ErrorListener<number>); // lexer
	}

	equalToken(): number {
		throw new Error("You must override equalToken!");
	}

	wsToken(): number {
		throw new Error("You must override wsToken!");
	}
}
