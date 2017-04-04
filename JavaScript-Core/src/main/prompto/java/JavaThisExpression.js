var JavaExpression = require("./JavaExpression").JavaExpression;

function JavaThisExpression() {
    JavaExpression.call(this);
	return this;
}

JavaThisExpression.prototype = Object.create(JavaExpression.prototype);
JavaThisExpression.prototype.constructor = JavaThisExpression;

JavaThisExpression.prototype.toString = function() {
	return "this";
};

JavaThisExpression.prototype.toDialect = function(writer) {
    writer.append("this");
};

exports.JavaThisExpression = JavaThisExpression;