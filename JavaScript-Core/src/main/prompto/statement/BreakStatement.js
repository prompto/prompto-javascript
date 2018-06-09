var SimpleStatement = require("./SimpleStatement").SimpleStatement;
var BreakResult = require("../runtime/BreakResult").BreakResult;
var VoidType = require("../type/VoidType").VoidType;

function BreakStatement() {
	SimpleStatement.call(this);
	return this;
}

BreakStatement.prototype = Object.create(SimpleStatement.prototype);
BreakStatement.prototype.constructor = BreakStatement;

BreakStatement.prototype.toString = function() {
	return "break"
}

BreakStatement.prototype.toDialect = function(writer) {
    writer.append("break");
};


BreakStatement.prototype.equals = function(obj) {
	return (obj instanceof BreakStatement);
};

BreakStatement.prototype.check = function(context) {
	return VoidType.instance;
};

BreakStatement.prototype.interpret = function(context) {
    return BreakResult.instance;
};

BreakStatement.prototype.declare = function(transpiler) {
    // nothing to do
};

BreakStatement.prototype.transpile = function(transpiler) {
    transpiler.append("break");
};


BreakStatement.prototype.canReturn = function() {
    return true;
};

exports.BreakStatement = BreakStatement;
