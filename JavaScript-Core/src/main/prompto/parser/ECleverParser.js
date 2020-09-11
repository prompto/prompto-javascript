const isNodeJs = typeof window === 'undefined' && typeof importScripts === 'undefined';
const fs = isNodeJs ? require("fs") : {}; // nodejs only
import antlr4 from "antlr4/index";
import { EParser } from "./EParser"

function createInput(input) {
	if(typeof(input)==='string' || input instanceof String) {
		if(isNodeJs && fs.existsSync(input)) {
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

export default function ECleverParser(input) {
	EParser.call(this,createInput(input));
	this.path = "";
	return this;
}

ECleverParser.prototype = Object.create(EParser.prototype);
ECleverParser.prototype.constructor = ECleverParser;

ECleverParser.prototype.parse = function() {
	return this.parse_declaration_list();
};

ECleverParser.prototype.parse_declaration_list = function() {
	return this.doParse(this.declaration_list, true);
};

ECleverParser.prototype.parse_repl_input = function() {
	return this.doParse(this.repl, true);
};

ECleverParser.prototype.parse_standalone_type = function() {
    return this.doParse(this.category_or_any_type, false);
};

ECleverParser.prototype.doParse = function(rule, addLF) {
    this.getTokenStream().tokenSource.addLF = addLF;
    const tree = rule.bind(this)();
    const builder = new EPromptoBuilder(this);
    const walker = new antlr4.tree.ParseTreeWalker();
    walker.walk(builder, tree);
    return builder.getNodeValue(tree);
};
