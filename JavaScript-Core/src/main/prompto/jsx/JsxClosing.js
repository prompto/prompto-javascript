function JsxClosing(id, suite) {
    this.id = id;
    this.suite = suite;
    return this;
}

JsxClosing.prototype.check = function(context, opening) {
    if(this.id.name!=opening.id.name)
        context.problemListener.reportInvalidClosingTag(this.id, opening.id.name);
};

JsxClosing.prototype.toDialect = function(writer) {
    writer.append("</").append(this.id.name).append(">");
    if(this.suite!=null)
        writer.appendRaw(this.suite);
};

exports.JsxClosing = JsxClosing;