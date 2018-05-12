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
	var names = Object.getOwnPropertyNames(this.dict);
    var vals = names.map(function(name) {
        return '"' + name + '":' + this.dict[name];
	}, this);
	return "{" + vals.join(", ") + "}";
};


DictionaryValue.merge = function(dict1, dict2) {
    var dict = {};
    for(var p in dict1.dict) {
        dict[p] = dict1.dict[p];
    }
    for(var p in dict2.dict) {
        dict[p] = dict2.dict[p];
    }
    return new DictionaryValue(dict1.type.itemType, dict);
};

DictionaryValue.prototype.isEmpty = function() {
    for(var p in this.dict) {
        return false;
    }
    return true;
};

DictionaryValue.prototype.Add = function(context, value) {
    if (value instanceof DictionaryValue) {
        return DictionaryValue.merge(this, value);
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
        var iter = this.dict.keys.values();
        var item = iter.next();
        while(!item.done) {
            keys.add(new TextValue(item.value));
            item = iter.next();
        }
        return new SetValue(TextType.instance, keys);
    } else if ("values"==name) {
        var list = []
        for(p in this.dict) {
            list.push(this.dict[p]); // no need to interpret now
        }
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
    for(var key in this.dict) {
        dict[key] = this.dict[key].convertToJavaScript();
    }
    return dict;
};

DictionaryValue.prototype.equals = function(obj) {
    if(obj instanceof DictionaryValue) {
        var keys = Object.getOwnPropertyNames(this.dict);
        if(keys.length!=Object.getOwnPropertyNames(obj.dict).length) {
            return false;
        }
        for(var i=0;i<keys.length;i++) {
            var v1 = this.dict[keys[i]] || null;
            var v2 = obj.dict[keys[i]] || null;
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
                    if (!v2.equals(v1)) {
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
