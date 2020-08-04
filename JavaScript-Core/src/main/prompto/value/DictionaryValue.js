var Value = require("./Value").Value;
var Dictionary = require("../intrinsic/Dictionary").Dictionary;
var StrictSet = require("../intrinsic/StrictSet").StrictSet;
var NullValue = require("./NullValue").NullValue;
var SetValue = require("./SetValue").SetValue;
var ListValue = require("./ListValue").ListValue;
var TextValue = require("./TextValue").TextValue;
var IntegerValue = require("./IntegerValue").IntegerValue;
var InternalError = require("../error/InternalError").InternalError;
var DictionaryType = require("../type/DictionaryType").DictionaryType;
var TextType = require("../type/TextType").TextType;

class DictionaryValue extends Value {
 
    constructor(itemType, dict, mutable) {
        super(new DictionaryType(itemType));
        this.mutable = mutable || false;
        this.dict = dict || new Dictionary(this.mutable);
    }

    toString() {
        return this.dict.toString();
    }

    isEmpty() {
        return this.dict.isEmpty();
    }

    Add(context, value) {
        if (value instanceof DictionaryValue) {
            return new DictionaryValue(this.type.itemType, this.dict.add(value.dict));
        } else {
            throw new SyntaxError("Illegal: Dict + " + typeof(value));
        }
    }

    hasItem(context, value) {
        if (value instanceof TextValue) {
            return value.value in this.dict;
        } else {
            throw new SyntaxError("Only TextValue key type supported by DictionaryValue");
        }
    }

    getMemberValue(context, name) {
        if ("count"==name) {
            return new IntegerValue(this.dict.length);
        } else if ("keys"==name) {
            var keys = new StrictSet();
            var iter = this.dict.keys.iterator();
            while(iter.hasNext()) {
                keys.add(new TextValue(iter.next()));
            }
            return new SetValue(TextType.instance, keys);
        } else if ("values"==name) {
            var list = this.dict.$keys.map(function(name) {
                return this.dict[name];
            }, this);
            return new ListValue(this.type.itemType, list);
        } else {
            return Value.prototype.getMemberValue.call(this, context, name);
        }
    }

    setItemInContext(context, index, value) {
        if (index instanceof TextValue) {
            this.dict[index] = value;
        } else
            throw new SyntaxError("No such item:" + index.toString())
    }

    getItemInContext(context, index) {
        if (index instanceof TextValue)
        {
            var value = this.dict[index] || NullValue.instance;
            if (value instanceof Value) {
                return value;
            } else {
                throw new InternalError("Item not a value!");
            }
        } else {
            throw new SyntaxError("No such item:" + index.toString());
        }
    }

    convertToJavaScript() {
        var dict = {};
        this.dict.$keys.forEach(function(key) {
            dict[key] = this.dict[key].convertToJavaScript();
        }, this);
        return dict;
    }

    equals(obj) {
        if(obj instanceof DictionaryValue) {
            return this.dict.equals(obj.dict);
        } else {
            return false;
        }
    }

    getIterator(context) {
        return new KVPIterator(context, this.dict);
    }

    swap(context) {
        var swapped = new Dictionary(true);
        var iter = this.dict.iterator();
        while(iter.hasNext()) {
            var entry = iter.next();
            var key = entry.value;
            if(key instanceof TextValue)
                key = new TextValue(key.toString());
            swapped.setItem(key, entry.key);
        }
        swapped.mutable = false;
        return new DictionaryValue(TextType.instance, swapped, false);
    }
}

class KVPIterator {
    constructor(context, dict) {
        this.context = context;
        this.dict = dict;
        this.keys = this.dict.$keys;
        this.index = 0;
        return this;
    }

    hasNext() {
        return this.index < this.keys.length;
    }

    next() {
        var key = this.keys[this.index++];
        return new KVPValue(key, this.dict[key]);
    }
}

class KVPValue extends Value {
    constructor(key, value) {
        super(null); // TODO check that this is safe
        this.key = key;
        this.value = value;
        return this;
    }

    getMemberValue(context, name) {
        if ("key"==name) {
            return new TextValue(this.key);
        } else if ("value"==name) {
            if (this.value.interpret) {
                this.value = this.value.interpret(context);
            }
            return this.value;
        } else {
            throw new SyntaxError("No such member:" + name);
        }
    }
}

exports.DictionaryValue = DictionaryValue;
