var TextValue = require("../value/TextValue").TextValue;
var InstanceExpression = require("../expression/InstanceExpression").InstanceExpression;

function DictIdentifierKey(id) {
    this.id = id;
    return this;
}

DictIdentifierKey.prototype.toString = function() {
    return this.id.toString();
};

DictIdentifierKey.prototype.interpret = function(context) {
    var value = new InstanceExpression(this.id).interpret(context);
    if(value instanceof TextValue)
        return value;
    else {
        context.problemListener.reportIllegalValue(this, "Expected a Text, got " + value.type.typeName);
        return null;
    }
};


exports.DictIdentifierKey = DictIdentifierKey;