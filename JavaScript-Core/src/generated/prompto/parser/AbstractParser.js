/* do NOT delete this file, it is NOT generated */
/* it has to be located in the generated folder */
/* to work around jest resolver issues */
var Parser = require("antlr4/index").Parser;

function AbstractParser(input) {
	Parser.call(this, input);
	return this;
}

AbstractParser.prototype = Object.create(Parser.prototype);
AbstractParser.prototype.constructor = AbstractParser;

AbstractParser.prototype.isText = function(token, text) {
	return text === token.text;
};

AbstractParser.prototype.was = function(type) {
	return this.lastHiddenTokenType()===type;
};

AbstractParser.prototype.wasNot = function(type) {
	return this.lastHiddenTokenType()!==type;
};

AbstractParser.prototype.wasNotWhiteSpace = function() {
    return this.lastHiddenTokenType()!==this["WS"];
};

AbstractParser.prototype.willBe = function(type) {
	return this.getTokenStream().LA(1)===type;
};

AbstractParser.prototype.willNotBe = function(type) {
	return this.getTokenStream().LA(1)!==type;
};

AbstractParser.prototype.nextHiddenTokenType = function() {
	var bts = this.getTokenStream();
	var hidden = bts.getHiddenTokensToRight(bts.index-1);
	if(hidden===null || hidden.length===0) {
		return 0;
	} else {
		return hidden[0].type;
	}
};

AbstractParser.prototype.willBeAOrAn = function() {
    return this.willBeText("a") || this.willBeText("an");
};

AbstractParser.prototype.willBeText = function(text) {
    return text===this.getTokenStream().LT(1).text;
};

AbstractParser.prototype.lastHiddenTokenType = function() {
	var bts = this.getTokenStream();
	var hidden = bts.getHiddenTokensToLeft(bts.index);
	if(hidden===null || hidden.length===0) {
		return 0;
	} else {
		return hidden[hidden.length-1].type;
	}
};

AbstractParser.prototype.removeErrorListeners = function() {
    Parser.prototype.removeErrorListeners.call(this);
    this._input.tokenSource.removeErrorListeners(); // lexer
};

AbstractParser.prototype.addErrorListener = function(listener) {
    Parser.prototype.addErrorListener.call(this, listener);
    this._input.tokenSource.addErrorListener(listener); // lexer
};

exports.AbstractParser = AbstractParser;