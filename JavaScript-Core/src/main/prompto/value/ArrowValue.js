var ContextualExpression = require("./ContextualExpression").ContextualExpression;

function ArrowValue(method, calling, arrow) {
    ContextualExpression.call(this, calling, arrow);
    this.method = method;
    return this;
}

ArrowValue.prototype = Object.create(ContextualExpression.prototype);
ArrowValue.prototype.constructor = ArrowValue;

ArrowValue.prototype.interpret = function(context) {
    var parent = context.getParentContext();
    try {
        context.setParentContext(this.calling);
        return this.expression.interpret(context);
    } finally {
        context.setParentContext(parent);
    }
};

exports.ArrowValue = ArrowValue;
