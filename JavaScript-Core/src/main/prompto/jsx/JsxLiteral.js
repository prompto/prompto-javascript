var TextType = require("../type/TextType").TextType;

function JsxLiteral(text) {
	this.text = text;
	return this;
}


JsxLiteral.prototype.check = function(context) {
	return TextType.instance;
};


JsxLiteral.prototype.toString = function() {
	return this.text;
};


JsxLiteral.prototype.isLiteral = function(context) {
	return true;
};


JsxLiteral.prototype.toDialect = function(writer) {
	writer.append(this.text);
};

JsxLiteral.prototype.declare = function(transpiler) {
    // nothing to do
};


JsxLiteral.prototype.transpile = function(transpiler) {
    transpiler.append(this.text);
};

exports.JsxLiteral = JsxLiteral;
