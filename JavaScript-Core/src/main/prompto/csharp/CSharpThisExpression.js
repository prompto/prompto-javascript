var CSharpExpression = require("./CSharpExpression").CSharpExpression;

function CSharpThisExpression() {
    CSharpExpression.call(this);
	return this;
}

CSharpThisExpression.prototype = Object.create(CSharpExpression.prototype);
CSharpThisExpression.prototype.constructor = CSharpThisExpression;

CSharpThisExpression.prototype.toDialect = function(writer) {
    return writer.append("this");
};

CSharpThisExpression.prototype.toString = function() {
	return "this";
};

exports.CSharpThisExpression = CSharpThisExpression;