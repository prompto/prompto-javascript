import { MLexer } from "./MLexer"

export default function MIndentingLexer(input) {
    MLexer.call(this, input);
	this.tokens = [];
	this.indents = [0];
	this.wasLF = false;
	this.addLF = true;
	this.dialect = Dialect.BOA;
	this.nextLexerToken = this.nextToken;
	this.nextToken = this.indentedNextToken;
	return this;
}

MIndentingLexer.prototype = Object.create(MLexer.prototype);
MIndentingLexer.prototype.constructor = MIndentingLexer;

MIndentingLexer.prototype.indentedNextToken = function() {
	const t = this.getNextToken();
	this.wasLF = t.type===MLexer.LF;
	return t;
};

MIndentingLexer.prototype.getNextToken = function() {
	if(this.tokens.length>0) {
		return this.tokens.shift();
	}
	this.interpret(this.nextLexerToken());
	return this.nextToken();
};

MIndentingLexer.prototype.interpret = function(token) {
	switch(token.type) {
	case MLexer.EOF:
		this.interpretEOF(token);
		break;
	case MLexer.LF_TAB:
		this.interpretLFTAB(token);
		break;			
	default:
		this.interpretAnyToken(token);
	}
};

MIndentingLexer.prototype.interpretEOF = function(eof) {
	// gracefully handle missing dedents
	while(this.indents.length>1) {
		this.tokens.push(this.deriveToken(eof, MLexer.DEDENT));
		this.tokens.push(this.deriveToken(eof, MLexer.LF));
		this.wasLF = true;
		this.indents.pop();
	}
	// gracefully handle missing lf
	if(!this.wasLF && this.addLF) {
		this.tokens.push(this.deriveToken(eof, MLexer.LF));
	}
	this.tokens.push(eof);
};

MIndentingLexer.prototype.interpretLFTAB = function(lftab) {
	// count TABs following LF
	const indentCount = this.countIndents(lftab.text);
	const next = this.nextLexerToken();
	// if this was an empty line, simply skip it
	if(next.type===MLexer.EOF || next.type===MLexer.LF_TAB) {
		this.tokens.push(this.deriveToken(lftab, MLexer.LF));
		this.interpret(next);
	} else if(indentCount===this.indents[this.indents.length-1]) {
		this.tokens.push(this.deriveToken(lftab, MLexer.LF));
		this.interpret(next);
	} else if(indentCount>this.indents[this.indents.length-1]) {
		this.tokens.push(this.deriveToken(lftab, MLexer.LF));
		this.tokens.push(this.deriveToken(lftab, MLexer.INDENT));
		this.indents.push(indentCount);
		this.interpret(next);
	} else {
		while(this.indents.length>1 && indentCount<this.indents[this.indents.length-1]) {
			this.tokens.push(this.deriveToken(lftab, MLexer.DEDENT));
			this.tokens.push(this.deriveToken(lftab, MLexer.LF));
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

MIndentingLexer.prototype.deriveToken = (token, type) => {
	const res = token.clone();
	res.type = type;
    if(token.type === MLexer.EOF)
        res._text = ""
	return res;
};

MIndentingLexer.prototype.countIndents = text => {
	let count = 0;
	for(let i=0;i<text.length;i++) {
		switch(text[i]) {
		case ' ':
			count += 1;
			break;
		case '\t':
			count += 4;
			break;
		}
	}
	return Math.floor(count/4);
};

MIndentingLexer.prototype.interpretAnyToken = function(token) {
	this.tokens.push(token);
};


