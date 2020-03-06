var Section = require("../parser/Section").Section;
var IntegerValue = require("../value/IntegerValue").IntegerValue;
var DecimalValue = require("../value/DecimalValue").DecimalValue;
var IntegerType = require("../type/IntegerType").IntegerType;
var DecimalType = require("../type/DecimalType").DecimalType;

function Parameter(id) {
    Section.call(this);
	this.id = id;
    this.mutable = false;
    this.defaultExpression = null;
	return this;
}

Parameter.prototype = Object.create(Section.prototype);
Parameter.prototype.constructor = Parameter;

Object.defineProperty(Parameter.prototype, "name", {
    get : function() {
        return this.id.name;
    }
});


Parameter.prototype.setMutable =  function(mutable) {
    this.mutable = mutable;
};


Parameter.prototype.checkValue = function(context, expression) {
    var value = expression.interpret(context);
    if (value instanceof IntegerValue && this.getType(context)==DecimalType.instance) {
        return new DecimalValue(value.DecimalValue());
    } else if (value instanceof DecimalValue && this.getType(context)==IntegerType.instance) {
        return new IntegerValue(value.IntegerValue());
    } else {
        return value;
    }
};

Parameter.prototype.toDialect = function(writer) {
    if(this.mutable)
        writer.append("mutable ");
    writer.toDialect(this);
    if(this.defaultExpression!=null) {
        writer.append(" = ");
        this.defaultExpression.toDialect(writer);
    }
};

Parameter.prototype.transpile = function(transpiler, expression) {
    transpiler.append(this.name);
};


Parameter.prototype.transpileCall = function(transpiler, expression) {
    var expType = expression.check(transpiler.context);
    if (this.type === IntegerType.instance && expType === DecimalType.instance) {
        transpiler.append("Math.round(");
        expression.transpile(transpiler);
        transpiler.append(")");
    } else
        expression.transpile(transpiler);
};

exports.Parameter = Parameter;
