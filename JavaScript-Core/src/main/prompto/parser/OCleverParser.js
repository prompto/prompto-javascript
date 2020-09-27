import antlr4 from 'antlr4';
import { OParser } from './OParser.js'
import { ONamingLexer, OPromptoBuilder } from "./index.js"
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
		input = new ONamingLexer(input);
	}
	if(input instanceof antlr4.Lexer) {
		input = new antlr4.CommonTokenStream(input);
	}
	return input;
}

export default function OCleverParser(input) {
	OParser.call(this,createInput(input));
	this.path = "";
	return this;
}

OCleverParser.prototype = Object.create(OParser.prototype);
OCleverParser.prototype.constructor = OCleverParser;

OCleverParser.prototype.parse = function() {
	return this.parse_declaration_list();
};

OCleverParser.prototype.parse_declaration_list = function() {
	return this.doParse(this.declaration_list);
};

OCleverParser.prototype.parse_repl_input = function() {
	return this.doParse(this.repl, true);
};

OCleverParser.prototype.parse_document_literal = function() {
	return this.doParse(this.document_literal);
};

OCleverParser.prototype.equalToken = () => OParser.EQUAL;

OCleverParser.prototype.doParse = function(rule) {
    const tree = rule.bind(this)();
    const builder = new OPromptoBuilder(this);
    const walker = new antlr4.tree.ParseTreeWalker();
    walker.walk(builder, tree);
    return builder.getNodeValue(tree);
};
