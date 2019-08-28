var Value = require("../value/Value").Value;

function ValueExpression(type, value) {
	Value.call(this, type);
	this.value = value;
    // make this sliceable
    this.sliceable = value.slice ? value : null;
	return this;
}

ValueExpression.prototype = Object.create(Value.prototype);
ValueExpression.prototype.constructor = ValueExpression;

ValueExpression.prototype.check = function(context) {
	return this.type;
};

ValueExpression.prototype.interpret = function(context) {
	if(this.value.interpret) {
		return this.value.interpret(context);
	} else {
		return this.value;
	}
};

ValueExpression.prototype.declare = function(transpiler) {
    if(this.value.declare) {
        return this.value.declare(transpiler);
    }
};

ValueExpression.prototype.transpile = function(transpiler) {
    if (this.value.transpile) {
        return this.value.transpile(transpiler);
    }
};


ValueExpression.prototype.toString = function() {
	return this.value.toString();
};

ValueExpression.prototype.toDialect = function(dialect) {
	return this.value.toDialect(dialect);
};

exports.ValueExpression = ValueExpression;
