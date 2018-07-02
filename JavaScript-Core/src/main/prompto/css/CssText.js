function CssText(text) {
    this.text = text;
    return this;
};

CssText.prototype.toDialect = function(writer) {
    writer.append(this.text);
};

CssText.prototype.declare = function(transpiler) {
    // nothing to do
};

CssText.prototype.transpile = function(transpiler) {
    transpiler.append(JSON.stringify(this.text));
}

exports.CssText = CssText;