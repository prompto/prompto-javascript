var IteratorType = require("../type/IteratorType").IteratorType;
var Variable = require("../runtime/Variable").Variable;
var Value = require("./Value").Value;

function IterableValue(itemType, context, length, name, source, expression) {
    Value.call(this, new IteratorType(itemType));
    this.itemType = itemType;
    this.context = context;
    this.length = length;
    this.name = name;
    this.source = source;
    this.expression = expression;
    return this;
};

IterableValue.prototype = Object.create(Value.prototype);
IterableValue.prototype.constructor = IterableValue;


IterableValue.prototype.isEmpty = function() {
    return this.length()==0;
};

IterableValue.prototype.length = function() {
    return this.documents.length();
};

IterableValue.prototype.getIterator = function() {
    return this;
};


IterableValue.prototype.hasNext = function() {
    return this.source.hasNext();
};

IterableValue.prototype.next = function() {
    var child = this.context.newChildContext();
    child.registerValue(new Variable(this.name, this.itemType));
    child.setValue(this.name, this.source.next());
    return this.expression.interpret(child);
};

IterableValue.prototype.getMember = function(context, name) {
    if ("length" == name)
        return new Integer(this.length());
    else
        throw new InvalidDataError("No such member:" + name);
};

exports.IterableValue = IterableValue;