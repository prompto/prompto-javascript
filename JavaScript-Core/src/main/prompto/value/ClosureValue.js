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
    var savedParent = parentMost.getParentContext();
    parentMost.setParentContext(context);
    try {
        var local = this.context.newChildContext();
        return this.doInterpret(local);
    } finally {
        parentMost.setParentContext(savedParent);
    }
};


ClosureValue.prototype.doInterpret = function(local) {
    return this.type.method.interpret(local);
};

exports.ClosureValue = ClosureValue;
