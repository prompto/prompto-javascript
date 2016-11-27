var Bool = require("./Bool").Bool;
var Value = require("./Value").Value;
var Integer = require("./Integer").Integer;
var SetType = require("../type/SetType").SetType;
var ListValue = null;

exports.resolve = function() {
    SetType = require("../type/SetType").SetType;
    ListValue = require("./ListValue").ListValue;
};

function SetValue(itemType, items) {
    Value.call(this, new SetType(itemType));
    this.itemType = null;
    this.items = items || {};
    return this;
}

SetValue.prototype = Object.create(Value.prototype);
SetValue.prototype.constructor = SetValue;

SetValue.prototype.addAll = function(items) {
    for(var p in items) {
        this.add(items[p]);
    }
};

SetValue.prototype.toString = function() {
    var names = Object.getOwnPropertyNames(this.items);
    var values = names.map(function(name) { return this.items[name]; }, this);
    return "<" + values.join(", ") + ">";
};

SetValue.prototype.add = function(item) {
    var key = item.type.id.name + ":" + item.toString();
    this.items[key] = item;
};

SetValue.prototype.size = function() {
    var n = 0;
    for(var p in this.items) {
        n += 1;
    }
    return n;
};

SetValue.prototype.getMemberValue = function(context, name) {
    if ("count"==name) {
        return new Integer(this.size());
    } else {
        return Value.prototype.getMemberValue.call(this, context, name);
    }
};

SetValue.prototype.isEmpty = function() {
    for(var p in this.items) {
        return false;
    }
    return true;
};

SetValue.prototype.hasItem = function(context, item) {
    var key = item.type.id.name + ":" + item.toString();
    return key in this.items;
};


SetValue.prototype.getItemInContext = function(context, index) {
    if (index instanceof Integer) {
        try {
            var idx = index.IntegerValue();
            for(var p in this.items) {
                if(--idx==0)
                    return this.items[p];
            }
            throw new IndexOutOfRangeError();
        } catch (e) {
            if(e instanceof PromptoError) {
                throw e;
            } else {
                throw new InternalError(e.toString());
            }
        }
    } else
        throw new SyntaxError("No such item:" + index.toString());
};

SetValue.prototype.Add = function(context, value) {
    if (value instanceof SetValue || value instanceof ListValue) {
        var result = new SetValue(this.type.itemType);
        result.addAll(this.items);
        result.addAll(value.items);
        return result;
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
        if(!(test instanceof Bool)) {
            throw new InternalError("Illegal test result: " + test);
        }
        if(test.value) {
            result.add(o);
        }
    }
    return result;
}

SetValue.prototype.getIterator = function(context) {
    return new SetIterator(this.items, context);
};


SetValue.prototype.equals = function(obj) {
    if(obj instanceof SetValue) {
        for(var p in this.items) {
            var v1 = this.items[p];
            var v2 = obj.items[p];
            if(v1==v2) {
                continue;
            } else if(v1==null || v2==null) {
                return false;
            } else {
                if(v1.equals) {
                    if(!v1.equals(v2)) {
                        return false;
                    }
                } else if(v2.equals) {
                    if(!v2.equals(v1)) {
                        return false;
                    }
                } else {
                    return false;
                }
            }
        }
        return true;
    } else {
        return false;
    }
};


function SetIterator(items, context) {
    this.items = items;
    this.names = Object.getOwnPropertyNames(items);
    this.context = context;
    this.index = -1;
    return this;
}

SetIterator.prototype.hasNext = function () {
    return this.index < this.names.length - 1;
}

SetIterator.prototype.next = function() {
    return this.items[this.names[++this.index]];
};

exports.SetValue = SetValue;