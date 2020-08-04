var Value = require("./Value").Value;
var IntegerValue = require("./IntegerValue").IntegerValue;
var SetType = require("../type/SetType").SetType;
var StrictSet = require("../intrinsic/StrictSet").StrictSet;
var ListValue = null;
var IndexOutOfRangeError = require("../error/IndexOutOfRangeError").IndexOutOfRangeError;

exports.resolve = function() {
    SetType = require("../type/SetType").SetType;
    ListValue = require("./ListValue").ListValue;
};

class SetValue extends Value {
    constructor(itemType, items) {
        super(new SetType(itemType));
        this.itemType = itemType;
        this.items = items || new StrictSet();
        return this;
    }

    add(item) {
        this.items.add(item);
    }

    toString() {
        return this.items.toString();
    }

    size() {
        return this.items.length;
    }

    getMemberValue(context, name) {
        if ("count"==name) {
            return new IntegerValue(this.items.length);
        } else {
            return Value.prototype.getMemberValue.call(this, context, name);
        }
    }

    isEmpty() {
        return this.items.length === 0;
    }

    hasItem(context, item) {
        return this.items.has(item);
    }

    getItemInContext(context, index) {
        if (index instanceof IntegerValue) {
            var idx = index.IntegerValue();
            var items = Array.from(this.items.set.values());
            if(idx<1 || idx>items.length)
                throw new IndexOutOfRangeError();
            return items[idx-1];
        } else
            throw new SyntaxError("No such item:" + index.toString());
    }

    Add(context, value) {
        if (value instanceof SetValue || value instanceof ListValue) {
            var set = new StrictSet();
            set.addItems(this.items);
            set.addItems(value.items);
            return new SetValue(this.type.itemType, set);
        } else {
            return Value.prototype.Add.apply(this, context, value);
        }
    }

    Subtract(context, value) {
        if (value instanceof ListValue) {
            var setValue = new SetValue(this.type.itemType);
            value = setValue.Add(context, value);
        }
        if (value instanceof SetValue) {
            var set = new StrictSet();
            var iter = this.items.iterator();
            while(iter.hasNext()) {
                var item = iter.next();
                if(!value.items.has(item))
                    set.set.add(item);
            }
            return new SetValue(this.type.itemType, set);
        } else {
            return Value.prototype.Subtract.apply(this, context, value);
        }
    }

    filter(filter) {
        var items = Array.from(this.items.set).filter(filter);
        var result = new StrictSet(items);
        return new SetValue(this.type.itemType, result);
    }

    getIterator(context) {
        return this.items.iterator();
    }

    equals(obj) {
        if(obj instanceof SetValue) {
            return this.items.equals(obj.items);
        } else {
            return false;
        }
    }
}



exports.SetValue = SetValue;