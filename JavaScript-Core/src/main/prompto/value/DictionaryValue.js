var Value = require("./Value").Value;
var Dictionary = require("../intrinsic/Dictionary").Dictionary;
var StrictSet = require("../intrinsic/StrictSet").StrictSet;
var NullValue = require("./NullValue").NullValue;
var SetValue = require("./SetValue").SetValue;
var ListValue = require("./ListValue").ListValue;
var TextValue = require("./TextValue").TextValue;
var IntegerValue = require("./IntegerValue").IntegerValue;
var InternalError = require("../error/InternalError").InternalError;
var BaseType = require("../type/BaseType").BaseType;
var DictionaryType = require("../type/DictionaryType").DictionaryType;
var TextType = require("../type/TextType").TextType;

function DictionaryValue(itemType, dict, mutable) {
    Value.call(this, new DictionaryType(itemType));
	this.dict = dict || new Dictionary();
    this.mutable = mutable || false;
	return this;
}

DictionaryValue.prototype = Object.create(Value.prototype);
DictionaryValue.prototype.constructor = DictionaryValue;

DictionaryValue.prototype.toString = function() {
    return this.dict.toString();
};


DictionaryValue.prototype.isEmpty = function() {
    return this.dict.isEmpty();
};

DictionaryValue.prototype.Add = function(context, value) {
    if (value instanceof DictionaryValue) {
        return new DictionaryValue(this.type.itemType, this.dict.add(value.dict));
    } else {
        throw new SyntaxError("Illegal: Dict + " + typeof(value));
    }
};

DictionaryValue.prototype.hasItem = function(context, value) {
    if (value instanceof TextValue) {
        return value.value in this.dict;
    } else {
        throw new SyntaxError("Only TextValue key type supported by DictionaryValue");
    }
};


DictionaryValue.prototype.getMemberValue = function(context, name) {
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
        var list = Object.getOwnPropertyNames(this.dict).map(function(name) {
            return this.dict[name];
        }, this);
        return new ListValue(this.type.itemType, list);
    } else {
        return Value.prototype.getMemberValue.call(this, context, name);
    }
};


DictionaryValue.prototype.setItemInContext = function(context, index, value) {
    if (index instanceof TextValue) {
        this.dict[index] = value;
    } else
        throw new SyntaxError("No such item:" + index.toString())
};

DictionaryValue.prototype.getItemInContext = function(context, index) {
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
};

DictionaryValue.prototype.convertToJavaScript = function() {
    var dict = {};
    Object.getOwnPropertyNames(this.dict).forEach(function(key) {
        dict[key] = this.dict[key].convertToJavaScript();
    }, this);
    return dict;
};

DictionaryValue.prototype.equals = function(obj) {
    if(obj instanceof DictionaryValue) {
        return this.dict.equals(obj.dict);
    } else {
        return false;
    }
};

DictionaryValue.prototype.getIterator = function(context) {
    return new KVPIterator(context, this.dict);
}

function KVPIterator(context, dict) {
    this.context = context;
    this.dict = dict;
    this.keys = Object.getOwnPropertyNames(this.dict);
    this.index = 0;
    return this;
}

KVPIterator.prototype.hasNext = function() {
    return this.index < this.keys.length;
};


KVPIterator.prototype.next = function() {
    var key = this.keys[this.index++];
    return new KVPValue(key, this.dict[key]);
};


function KVPValue(key, value) {
    Value.call(this, null); // TODO check that this is safe
    this.key = key;
    this.value = value;
    return this;
}

KVPValue.prototype = Object.create(Value.prototype);
KVPValue.prototype.constructor = KVPValue;

KVPValue.prototype.getMemberValue = function(context, name) {
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
};

exports.DictionaryValue = DictionaryValue;
