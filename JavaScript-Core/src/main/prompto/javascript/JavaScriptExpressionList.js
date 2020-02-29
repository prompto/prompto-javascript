var ObjectList = require("../utils/ObjectList").ObjectList;

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
    if(this.length > 0) {
        this.forEach(function(exp) {
            exp.toDialect(writer);
            writer.append(", ");
        });
        writer.trimLast(2);
    }
};


JavaScriptExpressionList.prototype.transpile = function(transpiler) {
    if(this.length > 0) {
        this.forEach(function(exp) {
            exp.transpile(transpiler);
            transpiler.append(", ");
        });
        transpiler.trimLast(2);
    }
};


JavaScriptExpressionList.prototype.computeArguments = function(context) {
	return this.map(function(arg) {
        return this.computeArgument(arg, context);
	}, this);
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