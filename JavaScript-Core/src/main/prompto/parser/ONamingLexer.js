import { OLexer } from './OLexer.js'
import { Dialect } from "./index.js";

export default function ONamingLexer(input) {
	OLexer.call(this, input);
	this.dialect = Dialect.O;
	return this;
}

ONamingLexer.prototype = Object.create(OLexer.prototype);
ONamingLexer.prototype.constructor = ONamingLexer;
