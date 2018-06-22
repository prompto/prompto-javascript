var JsxElementBase = require("./JsxElementBase").JsxElementBase


function JsxElement(id, attributes) {
    JsxElementBase.call(this, id, attributes);
    return this;
}

JsxElement.prototype = Object.create(JsxElementBase.prototype);
JsxElement.prototype.constructor = JsxElement;

JsxElement.prototype.setChildren = function(children) {
	this.children = children;
	return this;
};

JsxElement.prototype.toDialect = function(writer) {
	writer.append("<").append(this.id.name);
	this.attributes.forEach(function(attr) { attr.toDialect(writer); });
	writer.append(">");
	if(this.children!=null)
        this.children.forEach(function(child) { child.toDialect(writer); });
	writer.append("</").append(this.id.name).append(">");
};


exports.JsxElement = JsxElement;