const isNodeJs = typeof window === 'undefined' && typeof importScripts === 'undefined';
const fs = isNodeJs ? import("fs") : {}; // nodejs only
import antlr4 from 'antlr4';
import { MParser } from './MParser.js'

function createInput(input) {
	if(typeof(input)==='string' || input instanceof String) {
		if(isNodeJs && fs.existsSync(input)) {
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

export default function MCleverParser(input) {
	MParser.call(this,createInput(input));
	this.path = "";
	return this;
}

MCleverParser.prototype = Object.create(MParser.prototype);
MCleverParser.prototype.constructor = MCleverParser;

MCleverParser.prototype.parse = function() {
	return this.parse_declaration_list();
};

MCleverParser.prototype.parse_declaration_list = function() {
	return this.doParse(this.declaration_list, true);
};

MCleverParser.prototype.parse_repl_input = function() {
	return this.doParse(this.repl, true);
};

MCleverParser.prototype.equalToken = () => MParser.EQUAL;

MCleverParser.prototype.doParse = function(rule, addLF) {
    this.getTokenStream().tokenSource.addLF = addLF;
    const tree = rule.bind(this)();
    const builder = new MPromptoBuilder(this);
    const walker = new antlr4.tree.ParseTreeWalker();
    walker.walk(builder, tree);
    return builder.getNodeValue(tree);
};
