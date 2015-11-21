var IteratorType = require("../type/IteratorType").IteratorType;
var Variable = require("../runtime/Variable").Variable;
var Value = require("./Value").Value;

function Iterator(itemType, context, length, name, source, expression) {
    Value.call(this, new IteratorType(itemType));
    this.itemType = itemType;
    this.context = context;
    this.length = length;
    this.name = name;
    this.source = source;
    this.expression = expression;
    return this;
};

Iterator.prototype = Object.create(Value.prototype);
Iterator.prototype.constructor = Iterator;


Iterator.prototype.isEmpty = function() {
    return this.length()==0;
};

Iterator.prototype.length = function() {
    return this.documents.length();
};

Iterator.prototype.getIterator = function() {
    return this;
};


Iterator.prototype.hasNext = function() {
    return this.source.hasNext();
};

Iterator.prototype.next = function() {
    var child = this.context.newChildContext();
    child.registerValue(new Variable(this.name, this.itemType));
    child.setValue(this.name, this.source.next());
    return this.expression.interpret(child);
};

Iterator.prototype.getMember = function(context, name) {
    if ("length" == name)
        return new Integer(this.length());
    else
        throw new InvalidDataError("No such member:" + name);
};

exports.Iterator = Iterator;