var ArrowExpression = require("../expression/ArrowExpression").ArrowExpression;
var IJsxExpression = require("./IJsxExpression").IJsxExpression;
var Literal = require("../literal/Literal").Literal;

function JsxExpression(expression) {
    IJsxExpression.call(this);
    this.expression = expression;
	return this;
}


JsxExpression.prototype = Object.create(IJsxExpression.prototype);
JsxExpression.prototype.constructor = JsxExpression;


JsxExpression.prototype.check = function(context) {
	return this.expression.check(context);
};

JsxExpression.prototype.checkProto = function(context, proto) {
    if(this.expression instanceof ArrowExpression)
        return proto.checkArrowExpression(context, this.expression);
    else
        return this.expression.check(context);
};

JsxExpression.prototype.isLiteral = function() {
    return this.expression instanceof Literal;
};


JsxExpression.prototype.toString = function() {
    return this.expression.toString();
};

JsxExpression.prototype.toDialect = function(writer) {
	writer.append("{");
    this.expression.toDialect(writer);
	writer.append("}");
};


JsxExpression.prototype.declare = function(transpiler) {
    this.expression.declare(transpiler);
};


JsxExpression.prototype.transpile = function(transpiler) {
    this.expression.transpile(transpiler);
};

exports.JsxExpression = JsxExpression;