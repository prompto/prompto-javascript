import ELexer from './ELexer'
import { CharStream, Token } from 'antlr4';

export default class EIndentingLexer extends ELexer {

	tokens: Token[];
	indents: number[];
	wasLF: boolean;
	addLF: boolean;

	constructor(input: CharStream) {
		super(input);
		this.tokens = [];
		this.indents = [0];
		this.wasLF = false;
		this.addLF = true;
	}

	nextToken(): Token {
		return this.indentedNextToken();
	}

	nextLexerToken(): Token {
		return super.nextToken();
	}

	indentedNextToken(): Token {
		const t = this.getNextToken();
		this.wasLF = t.type === ELexer.LF;
		return t;
	}

	getNextToken(): Token {
		if (this.tokens.length > 0) {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			return this.tokens.shift()!;
		}
		this.interpret(this.nextLexerToken());
		return this.nextToken();
	}

	interpret(token: Token) {
		switch (token.type) {
			case ELexer.EOF:
				this.interpretEOF(token);
				break;
			case ELexer.LF_TAB:
				this.interpretLFTAB(token);
				break;
			default:
				this.interpretAnyToken(token);
		}
	}

	interpretEOF(eof: Token) {
		// gracefully handle missing dedents
		while (this.indents.length > 1) {
			this.tokens.push(this.deriveToken(eof, ELexer.DEDENT));
			this.tokens.push(this.deriveToken(eof, ELexer.LF));
			this.wasLF = true;
			this.indents.pop();
		}
		// gracefully handle missing lf
		if (!this.wasLF && this.addLF) {
			this.tokens.push(this.deriveToken(eof, ELexer.LF));
		}
		this.tokens.push(eof);
	}

	interpretLFTAB(lftab: Token) {
		// count TABs following LF
		const indentCount = this.countIndents(lftab.text);
		const next = this.nextLexerToken();
		// if this was an empty line, simply skip it
		if (next.type === ELexer.EOF || next.type === ELexer.LF_TAB) {
			this.tokens.push(this.deriveToken(lftab, ELexer.LF));
			this.interpret(next);
		} else if (indentCount === this.indents[this.indents.length - 1]) {
			this.tokens.push(this.deriveToken(lftab, ELexer.LF));
			this.interpret(next);
		} else if (indentCount > this.indents[this.indents.length - 1]) {
			this.tokens.push(this.deriveToken(lftab, ELexer.LF));
			this.tokens.push(this.deriveToken(lftab, ELexer.INDENT));
			this.indents.push(indentCount);
			this.interpret(next);
		} else {
			while (this.indents.length > 1 && indentCount < this.indents[this.indents.length - 1]) {
				this.tokens.push(this.deriveToken(lftab, ELexer.DEDENT));
				this.tokens.push(this.deriveToken(lftab, ELexer.LF));
				this.indents.pop();
			}
			if (indentCount > this.indents[this.indents.length - 1]) {
				// TODO, fire an error through token
			}
			this.interpret(next);
		}
	}

	deriveToken(token: Token, type: number): Token {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-return
		return token.cloneWithType(type);
	}

	countIndents(text: string): number {
		let count = 0;
		for (let i = 0; i < text.length; i++) {
			switch (text[i]) {
				case ' ':
					count += 1;
					break;
				case '\t':
					count += 4;
					break;
			}
		}
		return Math.floor(count / 4);
	}

	interpretAnyToken(token: Token): void {
		this.tokens.push(token);
	}

}
