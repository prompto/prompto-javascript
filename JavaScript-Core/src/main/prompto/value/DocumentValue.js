var NullValue = require("./NullValue").NullValue;
var Value = require("./Value").Value;
var TextValue = require("./TextValue").TextValue;
var IntegerValue = require("./IntegerValue").IntegerValue;
var SetValue = require("./SetValue").SetValue;
var ListValue = require("./ListValue").ListValue;
var DocumentType = require("../type/DocumentType").DocumentType;
var TextType = require("../type/TextType").TextType;
var AnyType = require("../type/AnyType").AnyType;
var Document = require("../intrinsic/Document").Document;
var StrictSet = require("../intrinsic/StrictSet").StrictSet;
var equalArrays = require("../utils/Utils").equalArrays;

class DocumentValue extends Value {
 
    constructor(values) {
        super(DocumentType.instance);
        this.mutable = true;
        this.values = values || new Document();
    }

    getMemberNames() {
        return Object.getOwnPropertyNames(this.values);
    }

    getStorableData() {
        return this.values;
    }

    convertToJavaScript() {
        var values = new Document();
        Object.getOwnPropertyNames(this.values).forEach(function(key) {
            var value = this.values[key];
            values[key] = value.convertToJavaScript();
        }, this);
        return values;
    }

    hasMember(name) {
        return this.values.hasOwnProperty(name);
    }

    getMemberValue(context, name, autoCreate) {
        if ("count"==name) {
            return new IntegerValue(this.values.length);
        } else if ("keys"==name) {
            var keys = new StrictSet();
            this.getMemberNames().forEach(name => {
                keys.add(new TextValue(name));
            });
            return new SetValue(TextType.instance, keys);
        } else if ("values"==name) {
            var list = this.getMemberNames().map(function (name) {
                return this.values[name];
            }, this);
            return new ListValue(AnyType.instance, list);
        } else if(this.values.hasOwnProperty(name))
            return this.values[name] || null;
        else if("text" == name)
            return new TextValue(this.toString());
        else if(autoCreate) {
            var result = new DocumentValue();
            this.values[name] = result;
            return result;
        } else
            return NullValue.instance;
    }

    setMember(context, name, value) {
        this.values[name] = value;
    }

    getItemInContext(context, index) {
        if (index instanceof TextValue) {
            // TODO autocreate
            return this.values[index.value] || NullValue.instance;
        } else {
            throw new SyntaxError("No such item:" + index.toString())
        }
    }

    setItemInContext(context, index, value) {
        if (index instanceof TextValue) {
            this.values[index.value] = value
        } else {
            throw new SyntaxError("No such item:" + index.toString());
        }
    }

    Add(context, value) {
        if (value instanceof DocumentValue) {
            return new DocumentValue(this.values.add(value.values));
        } else {
            throw new SyntaxError("Illegal: Document + " + typeof(value));
        }
    }

    equals(other) {
        if(this==other)
            return true;
        if(!(other instanceof DocumentValue))
            return false;
        var thisNames = Object.getOwnPropertyNames(this.values);
        var otherNames = Object.getOwnPropertyNames(other.values);
        if(!equalArrays(thisNames, otherNames))
            return false;
        return thisNames.every(function(name) {
            return this.values[name].equals(other.values[name]);
        }, this);
    }

    toString() {
        var binaries = {};
        // create json type-aware object graph and collect binaries
        var values = {}; // need a temporary parent
        for (var key in this.values) {
            var value = this.values[key];
            if(typeof(value) === 'function')
                continue;
            if (value == null || value == undefined)
                values[key] = null;
            else {
                var id = this; // TODO create identifier
                value.toJson(null, values, id, key, false, binaries);
            }
        }
        return JSON.stringify(values);
    }

    toJson(context, json, instanceId, fieldName, withType, binaries) {
        var values = {};
        Object.getOwnPropertyNames(this.values).forEach(function(key) {
            var value = this.values[key];
            if (value == null || value == undefined)
                values[key] = null;
            else {
                var id = this; // TODO create identifier
                value.toJson(context, values, id, key, withType, binaries);
            }
        }, this);
        var doc = withType ? { type: DocumentType.instance.name, value: values} : values;
        if(Array.isArray(json))
            json.push(doc);
        else
            json[fieldName] = doc;
    }

    declare(transpiler) {
        transpiler.require(Document);
    }
}

exports.DocumentValue = DocumentValue;


