var PythonExpression = require("./PythonExpression").PythonExpression;

function PythonSelfExpression() {
    PythonExpression.call(this);
	return this;
}

PythonSelfExpression.prototype = Object.create(PythonExpression.prototype);
PythonSelfExpression.prototype.constructor = PythonSelfExpression;

PythonSelfExpression.prototype.toString = function() {
	return "self";
};

PythonSelfExpression.prototype.toDialect = function(writer) {
    writer.append("self");
};

exports.PythonSelfExpression = PythonSelfExpression;