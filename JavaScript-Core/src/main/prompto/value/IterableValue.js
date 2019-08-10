var IteratorType = require("../type/IteratorType").IteratorType;
var Variable = require("../runtime/Variable").Variable;
var Value = require("./Value").Value;
var ListValue = require("./ListValue").ListValue;

function IterableValue(context, name, itemType, source, length, expression) {
    Value.call(this, new IteratorType(itemType));
    this.context = context;
    this.name = name;
    this.itemType = itemType;
    this.source = source;
    this.count = length;
    this.expression = expression;
    return this;
}

IterableValue.prototype = Object.create(Value.prototype);
IterableValue.prototype.constructor = IterableValue;


IterableValue.prototype.isEmpty = function() {
    return this.count===0;
};

IterableValue.prototype.length = function() {
    return this.count;
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

IterableValue.prototype.getMemberValue = function(context, name) {
    if ("count" === name)
        return new Integer(this.count);
    else
        return Value.prototype.getMemberValue.call(this, context, name);
};

IterableValue.prototype.filter = function(filter) {
    var list = this.toListValue();
    return list.filter(filter);
};

IterableValue.prototype.toListValue = function() {
    var items = [];
    var iterator = this.getIterator();
    while(iterator.hasNext())
        items.push(iterator.next());
    return new ListValue(this.itemType, items);
};


IterableValue.prototype.toString = function() {
    var values = [];
    var iterator = this.getIterator();
    while(iterator.hasNext())
        values.push(iterator.next());
    return values.join(", ");
};

exports.IterableValue = IterableValue;