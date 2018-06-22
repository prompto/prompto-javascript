function JsxAttribute(id, value) {
	this.id = id;
	this.value = value;
	return this;
}


JsxAttribute.prototype.check = function(context) {
    if(this.value!=null)
        this.value.check(context);
};


JsxAttribute.prototype.toDialect = function(writer) {
    writer.append(" ").append(this.id.name);
    if(this.value!=null) {
        writer.append("=");
        this.value.toDialect(writer);
    }
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
