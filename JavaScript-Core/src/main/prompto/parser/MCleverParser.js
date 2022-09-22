import antlr4 from 'antlr4';
import MParser from './MParser.js'
import MIndentingLexer from './MIndentingLexer.js'
import MPromptoBuilder from './MPromptoBuilder.js'
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
		input = new MIndentingLexer(input);
	}
	if(input instanceof antlr4.Lexer) {
		input = new antlr4.CommonTokenStream(input);
	}
	return input;
}

export default class MCleverParser extends MParser {

	constructor(input, debug?: boolean) {
		super(createInput(input));
		if(debug)
			this._interp.debug = true;
	}

	parse() {
		return this.parse_declaration_list();
	}

	parse_declaration_list() {
		return this.doParse(this.declaration_list, true);
	}

	parse_repl_input() {
		return this.doParse(this.repl, true);
	}

	equalToken() {
		return MParser.EQUAL;
	}

	doParse(rule, addLF) {
		this.getTokenStream().tokenSource.addLF = addLF;
		const tree = rule.bind(this)();
		const builder = new MPromptoBuilder(this);
		const walker = new antlr4.tree.ParseTreeWalker();
		walker.walk(builder, tree);
		return builder.getNodeValue(tree);
	}

}
