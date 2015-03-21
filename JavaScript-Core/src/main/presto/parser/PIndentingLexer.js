var antlr4 = require("antlr4");
var PLexer = require("./PLexer").PLexer;
var Dialect = require("./Dialect").Dialect;

function PIndentingLexer(input) {
    PLexer.call(this, input);
	this.tokens = [];
	this.indents = [0];
	this.wasLF = false;
	this.addLF = true;
	this.dialect = Dialect.BOA;
	this.nextLexerToken = this.nextToken;
	this.nextToken = this.indentedNextToken;
	return this;
}

PIndentingLexer.prototype = Object.create(PLexer.prototype);
PIndentingLexer.prototype.constructor = PIndentingLexer;

PIndentingLexer.prototype.indentedNextToken = function() {
	var t = this.getNextToken();
	this.wasLF = t.type===PLexer.LF;
	return t;
};

PIndentingLexer.prototype.getNextToken = function() {
	if(this.tokens.length>0) {
		return this.tokens.shift();
	}
	this.interpret(this.nextLexerToken());
	return this.nextToken();
};

PIndentingLexer.prototype.interpret = function(token) {
	switch(token.type) {
	case PLexer.EOF:
		this.interpretEOF(token);
		break;
	case PLexer.LF_TAB:
		this.interpretLFTAB(token);
		break;			
	default:
		this.interpretAnyToken(token);
	}
};

PIndentingLexer.prototype.interpretEOF = function(eof) {
	// gracefully handle missing dedents
	while(this.indents.length>1) {
		this.tokens.push(this.deriveToken(eof, PLexer.DEDENT));
		this.tokens.push(this.deriveToken(eof, PLexer.LF));
		this.wasLF = true;
		this.indents.pop();
	}
	// gracefully handle missing lf
	if(!this.wasLF && this.addLF) {
		this.tokens.push(this.deriveToken(eof, PLexer.LF));
	}
	this.tokens.push(eof);
};
  
PIndentingLexer.prototype.interpretLFTAB = function(lftab) {
	// count TABs following LF
	var indentCount = this.countIndents(lftab.text);
	var next = this.nextLexerToken();
	// if this was an empty line, simply skip it
	if(next.type===PLexer.EOF || next.type===PLexer.LF_TAB) {
		this.tokens.push(this.deriveToken(lftab, PLexer.LF));
		this.interpret(next);
	} else if(indentCount===this.indents[this.indents.length-1]) {
		this.tokens.push(this.deriveToken(lftab, PLexer.LF));
		this.interpret(next);
	} else if(indentCount>this.indents[this.indents.length-1]) {
		this.tokens.push(this.deriveToken(lftab, PLexer.LF));
		this.tokens.push(this.deriveToken(lftab, PLexer.INDENT));
		this.indents.push(indentCount);
		this.interpret(next);
	} else {
		while(this.indents.length>1 && indentCount<this.indents[this.indents.length-1]) {
			this.tokens.push(this.deriveToken(lftab, PLexer.DEDENT));
			this.tokens.push(this.deriveToken(lftab, PLexer.LF));
			this.indents.pop();
		}
		/*jshint noempty:false*/
		if(indentCount>this.indents[this.indents.length-1]) {
			// TODO, fire an error through token
		}
		this.interpret(next);
		/*jshint noempty:true*/
	}
};

PIndentingLexer.prototype.deriveToken = function(token, type) {
	var res = token.clone();
	res.type = type;
	return res;
};

PIndentingLexer.prototype.countIndents = function(text) {
	var count = 0;
	for(var i=0;i<text.length;i++) {
		switch(text[i]) {
		case ' ':
			count += 1;
			break;
		case '\t':
			count += 4;
			break;
		}
	}
	return count/4;
};

PIndentingLexer.prototype.interpretAnyToken = function(token) {
	this.tokens.push(token);
};

exports.PIndentingLexer = PIndentingLexer;

