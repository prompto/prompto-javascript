import OLexer from './OLexer.js'
import { Dialect } from "../parser";

export default class ONamingLexer extends OLexer {

	constructor(input) {
		super(input);
		this.dialect = Dialect.O;
	}

}
