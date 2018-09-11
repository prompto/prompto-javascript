function JsxAttribute(id, value, suite) {
	this.id = id;
	this.value = value;
	this.suite = suite;
	return this;
}


JsxAttribute.prototype.check = function(context) {
    if(this.value!=null)
        this.value.check(context);
};


JsxAttribute.prototype.toDialect = function(writer) {
    writer.append(this.id.name);
    if(this.value!=null) {
        writer.append("=");
        this.value.toDialect(writer);
    }
    if(this.suite)
        writer.appendRaw(this.suite);
    else
        writer.append(" ");
};

JsxAttribute.prototype.declare = function(transpiler) {
    if(this.value!=null)
        this.value.declare(transpiler);
};

JsxAttribute.prototype.transpile = function(transpiler) {
    transpiler.append(this.id.name);
    transpiler.append(": ");
    if(this.value!=null)
        this.value.transpile(transpiler);
    else
        transpiler.append("true");
};

exports.JsxAttribute = JsxAttribute;
