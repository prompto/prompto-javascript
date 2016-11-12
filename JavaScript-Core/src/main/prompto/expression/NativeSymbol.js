var Symbol = require("./Symbol").Symbol;
var Dialect = require("../parser/Dialect").Dialect;

function NativeSymbol(id, expression) {
	Symbol.call(this, id);
	this.expression = expression;
	this.type = null;
	return this;
}

NativeSymbol.prototype = Object.create(Symbol.prototype);
NativeSymbol.prototype.constructor = NativeSymbol;

NativeSymbol.prototype.toString = function() {
	return this.name;
};

NativeSymbol.prototype.toDialect = function(writer) {
    writer.append(this.name);
    switch(writer.dialect) {
        case Dialect.E:
            writer.append(" with ");
            this.expression.toDialect(writer);
            writer.append(" as value");
            break;
        case Dialect.O:
            writer.append(" = ");
            this.expression.toDialect(writer);
            break;
        case Dialect.S:
            writer.append(" = ");
            this.expression.toDialect(writer);
            break;
    }
};

/*
@Override
public boolean equals(Object obj) {
	if(obj==this)
		return true;
	if(obj==null)
		return false;
	if(!(obj instanceof NativeSymbol))
		return false;
	NativeSymbol other = (NativeSymbol)obj;
	return this.getName().equals(other.getName())
			&& this.getExpression().equals(other.getExpression());
}
*/

NativeSymbol.prototype.check = function(context) {
	var actual = this.expression.check(context);
	if(!this.type.derivedFrom.isAssignableFrom(context, actual)) {
		throw new SyntaxError("Cannot assign " + actual.name + " to " + this.type.derivedFrom.name);
	}
	return this.type;
};

NativeSymbol.prototype.interpret = function(context) {
	return this.expression.interpret(context);
}

exports.NativeSymbol = NativeSymbol;