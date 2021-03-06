import { default as ELexer } from './ELexer.js'
import { Dialect } from './index.js'

export default class EIndentingLexer extends ELexer {

	constructor(input) {
		super(input);
		this.tokens = [];
		this.indents = [0];
		this.wasLF = false;
		this.addLF = true;
		this.dialect = Dialect.BOA;
		this.nextLexerToken = this.nextToken;
		this.nextToken = this.indentedNextToken;
	}

	indentedNextToken() {
		const t = this.getNextToken();
		this.wasLF = t.type === ELexer.LF;
		return t;
	}

	getNextToken() {
		if (this.tokens.length > 0) {
			return this.tokens.shift();
		}
		this.interpret(this.nextLexerToken());
		return this.nextToken();
	}

	interpret(token) {
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

	interpretEOF(eof) {
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

	interpretLFTAB(lftab) {
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
			/*jshint noempty:false*/
			if (indentCount > this.indents[this.indents.length - 1]) {
				// TODO, fire an error through token
			}
			this.interpret(next);
			/*jshint noempty:true*/
		}
	}

	deriveToken(token, type) {
		const res = token.clone();
		res.type = type;
		if (token.type === ELexer.EOF)
			res._text = ""
		return res;
	}

	countIndents(text) {
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

	interpretAnyToken(token) {
		this.tokens.push(token);
	}

}