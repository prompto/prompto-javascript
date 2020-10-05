import antlr4 from 'antlr4';
import EParser from './EParser.js'
import { EIndentingLexer, EPromptoBuilder } from './index.js'
import { importFsIfNode } from '../utils/index.js'
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
		input = new EIndentingLexer(input);
	}
	if(input instanceof antlr4.Lexer) {
		input = new antlr4.CommonTokenStream(input);
	}
	return input;
}

export default class ECleverParser extends EParser {

	constructor(input) {
		super(createInput(input));
		this.path = "";
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

	parse_standalone_type() {
		return this.doParse(this.category_or_any_type, false);
	}

	doParse(rule, addLF) {
		this.getTokenStream().tokenSource.addLF = addLF;
		const tree = rule.bind(this)();
		const builder = new EPromptoBuilder(this);
		const walker = new antlr4.tree.ParseTreeWalker();
		walker.walk(builder, tree);
		return builder.getNodeValue(tree);
	}

}
