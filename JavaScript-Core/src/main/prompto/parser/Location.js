function Location(token, isEnd) {
	this.tokenIndex = token.tokenIndex;
	this.line = token.line;
	this.column = token.column;
	this.start = token.start;
	if(isEnd && token.text!==null) {
		this.start += token.text.length;
		this.column += token.text.length;
	}
}

exports.Location = Location;