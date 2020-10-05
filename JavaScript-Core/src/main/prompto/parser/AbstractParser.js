/* do NOT delete this file, it is NOT generated */
/* it has to be located in the generated folder */
/* to work around jest resolver issues */
import antlr4 from 'antlr4';

export default class AbstractParser extends antlr4.Parser {

	constructor(input) {
		super(input);
	}

	isText(token, text) {
		return text === token.text;
	}

	was(type) {
		return this.lastHiddenTokenType() === type;
	}

	wasNot(type) {
		return this.lastHiddenTokenType() !== type;
	}

	wasNotWhiteSpace() {
		return this.lastHiddenTokenType() !== this["WS"];
	}

	willBe(type) {
		return this.getTokenStream().LA(1) === type;
	}

	willNotBe(type) {
		return this.getTokenStream().LA(1) !== type;
	}

	nextHiddenTokenType() {
		const bts = this.getTokenStream();
		const hidden = bts.getHiddenTokensToRight(bts.index - 1);
		if (hidden === null || hidden.length === 0) {
			return 0;
		} else {
			return hidden[0].type;
		}
	}

	willBeAOrAn() {
		return this.willBeText("a") || this.willBeText("an");
	}

	willBeText(text) {
		return text === this.getTokenStream().LT(1).text;
	}

	lastHiddenTokenType() {
		const bts = this.getTokenStream();
		const hidden = bts.getHiddenTokensToLeft(bts.index);
		if (hidden === null || hidden.length === 0) {
			return 0;
		} else {
			return hidden[hidden.length - 1].type;
		}
	}

	removeErrorListeners() {
		antlr4.Parser.prototype.removeErrorListeners.call(this);
		this._input.tokenSource.removeErrorListeners(); // lexer
	}

	addErrorListener(listener) {
		antlr4.Parser.prototype.addErrorListener.call(this, listener);
		this._input.tokenSource.addErrorListener(listener); // lexer
	}

}
