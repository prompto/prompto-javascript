import OLexer from './OLexer.js'
import { Dialect } from "./index.js";

export default class ONamingLexer extends OLexer {

	constructor(input) {
		super(input);
		this.dialect = Dialect.O;
	}

}