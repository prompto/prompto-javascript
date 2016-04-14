function Argument(id) {
	this.id = id;
    this.mutable = false;
    this.defaultExpression = null;
	return this;
}

Object.defineProperty(Argument.prototype, "name", {
    get : function() {
        return this.id.name;
    }
});

Argument.prototype.checkValue = function(context, expression) {
	return expression.interpret(context);
};

Argument.prototype.toDialect = function(writer) {
    if(this.mutable)
        writer.append("mutable ");
    writer.toDialect(this);
    if(this.defaultExpression!=null) {
        writer.append(" = ");
        this.defaultExpression.toDialect(writer);
    }
};

exports.Argument = Argument;
