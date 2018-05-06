var Symbol = require("./Symbol").Symbol;
var Dialect = require("../parser/Dialect").Dialect;
var TextValue = require("../value/TextValue").TextValue;

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
        case Dialect.M:
            writer.append(" = ");
            this.expression.toDialect(writer);
            break;
    }
};



NativeSymbol.prototype.check = function(context) {
	var actual = this.expression.check(context);
	if(!this.type.derivedFrom.isAssignableFrom(context, actual)) {
		throw new SyntaxError("Cannot assign " + actual.name + " to " + this.type.derivedFrom.name);
	}
	return this.type;
};

NativeSymbol.prototype.interpret = function(context) {
	return this;
}


NativeSymbol.prototype.getMemberValue = function(context, name, autoCreate) {
    if("name" === name)
        return new TextValue(this.name);
    else if("value" === name)
        return this.expression.interpret(context);
    else
        return Symbol.prototype.getMemberValue.call(context, name, autoCreate);
}


exports.NativeSymbol = NativeSymbol;