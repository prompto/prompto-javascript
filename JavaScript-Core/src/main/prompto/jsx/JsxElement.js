var JsxElementBase = require("./JsxElementBase").JsxElementBase


function JsxElement(id, nameSuite, attributes, openingSuite) {
    JsxElementBase.call(this, id, attributes);
    this.nameSuite = nameSuite;
    this.openingSuite = openingSuite;
    this.closing = null;
    return this;
}

JsxElement.prototype = Object.create(JsxElementBase.prototype);
JsxElement.prototype.constructor = JsxElement;

JsxElement.prototype.setChildren = function(children) {
	this.children = children;
	return this;
};

JsxElement.prototype.setClosing = function(closing) {
    this.closing = closing;
    return this;
};

JsxElement.prototype.toDialect = function(writer) {
	writer.append("<").append(this.id.name);
    if(this.nameSuite!=null)
        writer.appendRaw(this.nameSuite);
    else if(this.attributes.length > 0)
        writer.append(" ");
	this.attributes.forEach(function(attr) { attr.toDialect(writer); });
	writer.append(">");
    if(this.openingSuite!=null)
        writer.appendRaw(this.openingSuite);
	if(this.children!=null)
        this.children.forEach(function(child) { child.toDialect(writer); });
	this.closing.toDialect(writer);
};


JsxElement.prototype.declareChildren = function(transpiler) {
    if (this.children != null)
        this.children.forEach(function (child) {
            child.declare(transpiler);
        }, this);
};


JsxElement.prototype.transpileChildren = function(transpiler) {
    if (this.children != null)
        this.children.forEach(function (child) {
            transpiler.append(", ");
            child.transpile(transpiler);
        }, this);
};

exports.JsxElement = JsxElement;