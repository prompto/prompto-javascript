var Value = require("./Value").Value;

function ClosureValue(context, type) {
    Value.call(this, type);
    this.context = context;
    return this;
}

ClosureValue.prototype = Object.create(Value.prototype);
ClosureValue.prototype.constructor = ClosureValue;

ClosureValue.prototype.interpret = function(context) {
    var parentMost = this.context.getParentMostContext();
    parentMost.setParentContext(context);
    var result = this.type.method.interpret(this.context);
    parentMost.setParentContext(null);
    return result;
};

exports.ClosureValue = ClosureValue;
