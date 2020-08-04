var IteratorType = require("../type/IteratorType").IteratorType;
var Variable = require("../runtime/Variable").Variable;
var Value = require("./Value").Value;
var IntegerValue = require("./IntegerValue").IntegerValue;
var ListValue = require("./ListValue").ListValue;

class IterableValue extends Value {
    constructor(context, name, itemType, source, length, expression) {
        super(new IteratorType(itemType));
        this.context = context;
        this.name = name;
        this.itemType = itemType;
        this.source = source;
        this.count = length;
        this.expression = expression;
        return this;
    }

    isEmpty() {
        return this.count===0;
    }

    length() {
        return this.count;
    }

    getIterator() {
        return this;
    }

    hasNext() {
        return this.source.hasNext();
    }

    next() {
        var child = this.context.newChildContext();
        child.registerValue(new Variable(this.name, this.itemType));
        child.setValue(this.name, this.source.next());
        return this.expression.interpret(child);
    }

    getMemberValue(context, name) {
        if ("count" === name)
            return new IntegerValue(this.count);
        else
            return Value.prototype.getMemberValue.call(this, context, name);
    }

    filter(filter) {
        var list = this.toListValue();
        return list.filter(filter);
    }

    toListValue() {
        var items = [];
        var iterator = this.getIterator();
        while(iterator.hasNext())
            items.push(iterator.next());
        return new ListValue(this.itemType, items);
    }

    toString() {
        var values = [];
        var iterator = this.getIterator();
        while(iterator.hasNext())
            values.push(iterator.next());
        return values.join(", ");
    }
}

exports.IterableValue = IterableValue;