import antlr4 from 'antlr4';
import OParser from './OParser.js'
import { ONamingLexer, OPromptoBuilder } from "../parser"
import { importFsIfNode } from '../utils'
const fs = importFsIfNode();

function createInput(input) {
	if(typeof(input)==='string' || input instanceof String) {
		if(fs && fs.existsSync && fs.existsSync(input)) {
			input = new antlr4.FileStream(input);
		} else {
			input = new antlr4.InputStream(input);
		}
	}
	if(input instanceof antlr4.InputStream) {
		input = new ONamingLexer(input);
	}
	if(input instanceof antlr4.Lexer) {
		input = new antlr4.CommonTokenStream(input);
	}
	return input;
}

export default class OCleverParser extends OParser {

	constructor(input, debug) {
		super(createInput(input));
		if(debug)
			this._interp.debug = true;
	}

	parse() {
		return this.parse_declaration_list();
	}

	parse_declaration_list() {
		return this.doParse(this.declaration_list);
	}

	parse_repl_input() {
		return this.doParse(this.repl, true);
	}

	parse_document_literal() {
		return this.doParse(this.document_literal);
	}

	equalToken() {
		return OParser.EQUAL;
	}

	doParse(rule) {
		const tree = rule.bind(this)();
		const builder = new OPromptoBuilder(this);
		const walker = new antlr4.tree.ParseTreeWalker();
		walker.walk(builder, tree);
		return builder.getNodeValue(tree);
	}

}
