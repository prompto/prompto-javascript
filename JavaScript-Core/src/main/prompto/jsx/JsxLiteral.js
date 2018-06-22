function JsxLiteral(text) {
	this.text = text;
	return this;
}


JsxLiteral.prototype.check = function(context) {
	return TextType.instance;
};

JsxLiteral.prototype.toDialect = function(writer) {
	writer.append(this.text);
};


exports.JsxLiteral = JsxLiteral;
