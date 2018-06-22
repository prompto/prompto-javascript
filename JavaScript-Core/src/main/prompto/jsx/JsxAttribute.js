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

exports.JsxAttribute = JsxAttribute;
