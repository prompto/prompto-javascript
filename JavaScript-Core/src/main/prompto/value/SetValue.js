var BooleanValue = require("./BooleanValue").BooleanValue;
var Value = require("./Value").Value;
var IntegerValue = require("./IntegerValue").IntegerValue;
var SetType = require("../type/SetType").SetType;
var StrictSet = require("../intrinsic/StrictSet").StrictSet;
var ListValue = null;

exports.resolve = function() {
    SetType = require("../type/SetType").SetType;
    ListValue = require("./ListValue").ListValue;
};

function SetValue(itemType, items) {
    Value.call(this, new SetType(itemType));
    this.itemType = null;
    this.items = items || new StrictSet();
    return this;
}

SetValue.prototype = Object.create(Value.prototype);
SetValue.prototype.constructor = SetValue;


SetValue.prototype.add = function(item) {
    this.items.add(item);
};


SetValue.prototype.toString = function() {
    return this.items.toString();
};


SetValue.prototype.size = function() {
    return this.items.length;
};

SetValue.prototype.getMemberValue = function(context, name) {
    if ("count"==name) {
        return new IntegerValue(this.items.length);
    } else {
        return Value.prototype.getMemberValue.call(this, context, name);
    }
};

SetValue.prototype.isEmpty = function() {
    return this.items.length === 0;
};

SetValue.prototype.hasItem = function(context, item) {
    return this.items.has(item);
};


SetValue.prototype.getItemInContext = function(context, index) {
    if (index instanceof IntegerValue) {
        var idx = index.IntegerValue();
        var items = Array.from(this.items.set.values());
        if(idx<1 || idx>items.length)
            throw new IndexOutOfRangeError();
        return items[idx-1];
    } else
        throw new SyntaxError("No such item:" + index.toString());
};


SetValue.prototype.Add = function(context, value) {
    if (value instanceof SetValue || value instanceof ListValue) {
        var set = new StrictSet();
        set.addAll(this.items);
        set.addAll(value.items);
        return new SetValue(this.type.itemType, set);
    } else {
        return Value.prototype.Add.apply(this, context, value);
    }
};


SetValue.prototype.filter = function(context, itemId, filter) {
    var result = new SetValue(this.type.itemType);
    var iter = this.getIterator(context);
    while(iter.hasNext()) {
        var o = iter.next();
        context.setValue(itemId, o);
        var test = filter.interpret(context);
        if(!(test instanceof BooleanValue)) {
            throw new InternalError("Illegal test result: " + test);
        }
        if(test.value) {
            result.add(o);
        }
    }
    return result;
}

SetValue.prototype.getIterator = function(context) {
    return this.items.iterator();
};


SetValue.prototype.equals = function(obj) {
    if(obj instanceof SetValue) {
        return this.items.equals(obj.items);
    } else {
        return false;
    }
};



exports.SetValue = SetValue;