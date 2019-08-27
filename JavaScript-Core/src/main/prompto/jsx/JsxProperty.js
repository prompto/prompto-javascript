function JsxProperty(id, value, suite) {
	this.id = id;
	this.value = value;
	this.suite = suite;
	return this;
}


JsxProperty.prototype.check = function(context) {
    if(this.value!=null)
        this.value.check(context);
};


JsxProperty.prototype.toDialect = function(writer) {
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

JsxProperty.prototype.declare = function(transpiler) {
    if(this.value!=null)
        this.value.declare(transpiler);
};

JsxProperty.prototype.transpile = function(transpiler) {
    var name = this.id.name;
    if(name.indexOf('-')>=0)
        name = '"' + name + '"';
    transpiler.append(name);
    transpiler.append(": ");
    if(this.value!=null)
        this.value.transpile(transpiler);
    else
        transpiler.append("null");
};

exports.JsxProperty = JsxProperty;
