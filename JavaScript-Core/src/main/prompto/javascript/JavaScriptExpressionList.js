var ObjectList = require("../utils/ObjectList").ObjectList;
var JavaScriptExpression = require("./JavaScriptExpression").JavaScriptExpression;

function JavaScriptExpressionList(expression) {
	ObjectList.call(this);
	expression = expression || null;
	if(expression!==null) {
		this.add(expression);
	}
	return this;
}

JavaScriptExpressionList.prototype = Object.create(ObjectList.prototype);
JavaScriptExpressionList.prototype.constructor = JavaScriptExpressionList;

JavaScriptExpressionList.prototype.toDialect = function(writer) {
    if(this.length>0) {
        for (var idx = 0; idx < this.length; idx++) {
            this[idx].toDialect(writer);
            writer.append(", ");
        }
        writer.trimLast(2);
    }
};


JavaScriptExpressionList.prototype.computeArguments = function(context) {
	var self = this;
    return this.map(function(arg) {
        return self.computeArgument(arg, context);
	});
};


JavaScriptExpressionList.prototype.computeArgument = function(arg, context) {
	// interpret expression in a loop (might be a wrapper)
	while(arg.interpret) {
		arg = arg.interpret(context);
	}
	// convert value to JavaScript
	return arg.convertToJavaScript();
};

exports.JavaScriptExpressionList = JavaScriptExpressionList;