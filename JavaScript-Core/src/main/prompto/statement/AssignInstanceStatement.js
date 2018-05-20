var SimpleStatement = require("./SimpleStatement").SimpleStatement;
var CodeType = require("../type/CodeType").CodeType;
var VoidType = require("../type/VoidType").VoidType;

function AssignInstanceStatement(instance, expression) {
	SimpleStatement.call(this);
	this.instance = instance;
	this.expression = expression;
	return this;
}

AssignInstanceStatement.prototype = Object.create(SimpleStatement.prototype);
AssignInstanceStatement.prototype.constructor = AssignInstanceStatement;

AssignInstanceStatement.prototype.toDialect = function(writer) {
    this.instance.toDialect(writer, this.expression);
    writer.append(" = ");
    this.expression.toDialect(writer);
};

AssignInstanceStatement.prototype.toString = function() {
	return this.instance.toString() + " = " + this.expression.toString();
};

AssignInstanceStatement.prototype.check = function(context) {
    var valueType = this.expression.check(context);
	this.instance.checkAssignValue(context, valueType);
    // Code expressions need to be interpreted as part of full check
    if (valueType === CodeType.instance) {
        this.instance.assign(context, this.expression);
    }
	return VoidType.instance;
};

AssignInstanceStatement.prototype.interpret = function(context) {
	this.instance.assign(context, this.expression);
	return null;
};


AssignInstanceStatement.prototype.declare = function(transpiler) {
    this.instance.declareAssign(transpiler, this.expression);
};

AssignInstanceStatement.prototype.transpile = function(transpiler) {
    this.instance.transpileAssign(transpiler, this.expression);
};

exports.AssignInstanceStatement = AssignInstanceStatement;