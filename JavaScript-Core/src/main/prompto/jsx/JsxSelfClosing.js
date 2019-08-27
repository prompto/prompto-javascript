var JsxElementBase = require("./JsxElementBase").JsxElementBase;

function JsxSelfClosing(id, nameSuite, properties, openingSuite) {
    JsxElementBase.call(this, id, properties);
    this.nameSuite = nameSuite;
    this.openingSuite = openingSuite;
    return this;
}

JsxSelfClosing.prototype = Object.create(JsxElementBase.prototype);
JsxSelfClosing.prototype.constructor = JsxSelfClosing;

JsxSelfClosing.prototype.toDialect = function(writer) {
    writer.append("<").append(this.id.name);
    if(this.nameSuite!=null)
        writer.appendRaw(this.nameSuite);
    else if(this.properties.length > 0)
        writer.append(" ");
    this.properties.forEach(function(prop) {
        prop.toDialect(writer);
    });
    writer.append("/>");
    if(this.openingSuite!=null)
        writer.appendRaw(this.openingSuite);
};


exports.JsxSelfClosing = JsxSelfClosing;