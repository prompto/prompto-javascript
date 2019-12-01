var Section = require("../parser/Section").Section;

function JsxClosing(id, suite) {
    this.id = id;
    this.suite = suite;
    return this;
}

JsxClosing.prototype = Object.create(Section.prototype);
JsxClosing.prototype.constructor = JsxClosing;

JsxClosing.prototype.check = function(context, opening) {
    if(this.id.name!=opening.id.name)
        context.problemListener.reportInvalidClosingTag(this.id, opening.id);
};

JsxClosing.prototype.toDialect = function(writer) {
    writer.append("</").append(this.id.name).append(">");
    if(this.suite!=null)
        writer.appendRaw(this.suite);
};

exports.JsxClosing = JsxClosing;