var IJsxExpression = require("./IJsxExpression").IJsxExpression;
var TextType = require("../type/TextType").TextType;
var Entities = require('html-entities').XmlEntities;

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
    // convert html entities
    var text = (new Entities()).decode(this.text);
    transpiler.append(JSON.stringify(text));
};

exports.JsxText = JsxText;
