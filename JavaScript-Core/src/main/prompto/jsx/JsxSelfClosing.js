var JsxElementBase = require("./JsxElementBase").JsxElementBase;

function JsxSelfClosing(id, attributes) {
    JsxElementBase.call(this, id, attributes);
    return this;
}

JsxSelfClosing.prototype = Object.create(JsxElementBase.prototype);
JsxSelfClosing.prototype.constructor = JsxSelfClosing;

JsxSelfClosing.prototype.toDialect = function(writer) {
    writer.append("<").append(this.id.name);
    this.attributes.forEach(function(attr) { attr.toDialect(writer); });
    writer.append("/>");
};

exports.JsxSelfClosing = JsxSelfClosing;