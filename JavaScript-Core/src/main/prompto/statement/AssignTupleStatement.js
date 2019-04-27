var SimpleStatement = require("./SimpleStatement").SimpleStatement;
var TupleType = require("../type/TupleType").TupleType;
var AnyType = require("../type/AnyType").AnyType;
var VoidType = require("../type/VoidType").VoidType;
var Variable = require("../runtime/Variable").Variable;
var TupleValue = require("../value/TupleValue").TupleValue;
var IntegerValue = require("../value/IntegerValue").IntegerValue;
var ValueExpression = require("../expression/ValueExpression").ValueExpression;

function AssignTupleStatement(names, expression) {
	SimpleStatement.call(this);
	this.names = names;
	this.expression = expression;
	return this;
}

AssignTupleStatement.prototype = Object.create(SimpleStatement.prototype);
AssignTupleStatement.prototype.constructor = AssignTupleStatement;


AssignTupleStatement.prototype.check = function(context) {
	var type = this.expression.check(context);
	if(type!=TupleType.instance) {
		throw new SyntaxError("Expecting a tuple expression, got " + type.getName());
	}
	this.names.forEach(function(name) {
		var actual = context.getRegistered(name);
		if(actual==null) {
			context.registerValue(new Variable(name, AnyType.instance));
		} else {
			// need to check type compatibility
			var actualType = actual.getType(context);
            actualType.checkAssignableFrom(context, AnyType.instance);
		}
	}, this);
	return VoidType.instance;
};

AssignTupleStatement.prototype.declare = function(transpiler) {
    this.expression.declare(transpiler);
    this.names.forEach(function(name) {
        var actual = transpiler.context.getRegistered(name);
        if(actual==null)
            transpiler.context.registerValue(new Variable(name, AnyType.instance));
     }, this);
};


AssignTupleStatement.prototype.transpile = function(transpiler) {
    transpiler.append("var [");
    this.names.forEach(function(name) {
        transpiler.append(name).append(", ");
        var actual = transpiler.context.getRegistered(name);
        if(actual==null)
            transpiler.context.registerValue(new Variable(name, AnyType.instance));
    });
    transpiler.trimLast(2);
    transpiler.append("] = ");
    this.expression.transpile(transpiler);
};


AssignTupleStatement.prototype.interpret = function(context) {
	var object = this.expression.interpret(context);
	if(!(object instanceof TupleValue)) {
		throw new SyntaxError("Expecting a tuple expression, got " + typeof(object));
	}
	for(var i=0;i<this.names.length;i++) {
		var name = this.names[i];
		var value = object.getItemInContext(context, new IntegerValue(i+1)); // since getItemInContext is 1 based
		if(context.getRegisteredValue(name)==null) {
			context.registerValue(new Variable(name, AnyType.instance));
		}
		context.setValue(name, value);
	}
	return null;
};

AssignTupleStatement.prototype.toDialect = function(writer) {
    this.names.toDialect(writer, false);
    writer.append(" = ");
    this.expression.toDialect(writer);
};


exports.AssignTupleStatement = AssignTupleStatement;