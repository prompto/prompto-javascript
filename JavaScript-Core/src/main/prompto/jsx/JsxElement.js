var JsxElementBase = require("./JsxElementBase").JsxElementBase
var JsxType = require("../type/JsxType").JsxType;


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

JsxElement.prototype.check = function(context) {
    JsxElementBase.prototype.check.call(this, context);
    if(!this.closing)
        context.problemListener.reportMissingClosingTag(this.id);
    else
        this.closing.check(context, this);
    if(this.children != null)
        this.children.forEach(function (child) {
            child.check(context);
        }, this);
    return JsxType.instance;
};

JsxElement.prototype.toDialect = function(writer) {
	writer.append("<").append(this.id.name);
    if(this.nameSuite!=null)
        writer.appendRaw(this.nameSuite);
    else if(this.properties.length > 0)
        writer.append(" ");
	this.properties.forEach(function(attr) { attr.toDialect(writer); });
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