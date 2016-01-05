var JavaScriptExpression = require("./JavaScriptExpression").JavaScriptExpression;

function JavaScriptNewExpression(method) {
    this.method = method;
    return this;
}

JavaScriptNewExpression.prototype = Object.create(JavaScriptExpression.prototype);
JavaScriptNewExpression.prototype.constructor = JavaScriptNewExpression;

JavaScriptNewExpression.prototype.toString = function() {
    return "new " + this.method.toString();
};

JavaScriptNewExpression.prototype.interpret = function(context, module) {
    return this.method.interpretNew(context, module);
};

JavaScriptNewExpression.prototype.toDialect = function(writer) {
    writer.append('new ');
    this.method.toDialect(writer);
};

exports.JavaScriptNewExpression = JavaScriptNewExpression;