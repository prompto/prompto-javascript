var OLexer = require("../../../generated/prompto/parser/OLexer").OLexer;
var Dialect = null;

exports.resolve = function() {
	Dialect = require("./Dialect").Dialect;
}

function ONamingLexer(input) {
	OLexer.call(this, input);
	this.dialect = Dialect.O;
	return this;
}

ONamingLexer.prototype = Object.create(OLexer.prototype);
ONamingLexer.prototype.constructor = ONamingLexer;

exports.ONamingLexer = ONamingLexer