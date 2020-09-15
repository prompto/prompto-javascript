import { OLexer } from './OLexer.js'

export default function ONamingLexer(input) {
	OLexer.call(this, input);
	this.dialect = Dialect.O;
	return this;
}

ONamingLexer.prototype = Object.create(OLexer.prototype);
ONamingLexer.prototype.constructor = ONamingLexer;
