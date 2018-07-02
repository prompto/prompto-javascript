var IJsxExpression = require("./IJsxExpression").IJsxExpression;

function JsxText(text) {
    IJsxExpression.call(this);
	this.text = text;
	return this;
}

JsxText.prototype = Object.create(IJsxExpression.prototype);
JsxText.prototype.constructor = JsxText;


JsxText.prototype.check = function(context) {
    return TextType.instance;
};

JsxText.prototype.toDialect = function(writer) {
    writer.append(this.text);
};


JsxText.prototype.declare = function(transpiler) {
    // nothing to do
};


JsxText.prototype.transpile = function(transpiler) {
    transpiler.append(JSON.stringify(this.text));
};

exports.JsxText = JsxText;
