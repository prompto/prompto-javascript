import OLexer from './OLexer'
import { Dialect } from "../parser";
import { CharStream } from 'antlr4';

export default class ONamingLexer extends OLexer {

	dialect = Dialect.O;

	constructor(input: CharStream) {
		super(input);
	}

}
