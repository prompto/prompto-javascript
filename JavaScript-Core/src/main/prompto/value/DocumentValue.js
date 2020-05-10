var NullValue = require("./NullValue").NullValue;
var Value = require("./Value").Value;
var TextValue = require("./TextValue").TextValue;
var DocumentType = require("../type/DocumentType").DocumentType;
var Document = require("../intrinsic/Document").Document;
var equalArrays = require("../utils/Utils").equalArrays;

function DocumentValue(values) {
    Value.call(this, DocumentType.instance);
    this.mutable = true;
    this.values = values || new Document();
    return this;
}

DocumentValue.prototype = Object.create(Value.prototype);
DocumentValue.prototype.constructor = DocumentValue;


DocumentValue.prototype.getMemberNames = function() {
    return Object.getOwnPropertyNames(this.values);
};


DocumentValue.prototype.getStorableData = function() {
    return this.values;
};


DocumentValue.prototype.convertToJavaScript = function() {
    var values = new Document();
    Object.getOwnPropertyNames(this.values).forEach(function(key) {
        var value = this.values[key];
        values[key] = value.convertToJavaScript();
    }, this);
    return values;
};


DocumentValue.prototype.hasMember = function(name) {
    return this.values.hasOwnProperty(name);
}

DocumentValue.prototype.getMemberValue = function(context, name, autoCreate) {
    if(this.values.hasOwnProperty(name))
        return this.values[name] || null;
    else if("text" == name)
        return new TextValue(this.toString());
    else if(autoCreate) {
        var result = new DocumentValue();
        this.values[name] = result;
        return result;
    } else
        return NullValue.instance;
};

DocumentValue.prototype.setMember = function(context, name, value) {
    this.values[name] = value;
};


DocumentValue.prototype.getItemInContext = function(context, index) {
    if (index instanceof TextValue) {
        // TODO autocreate
        return this.values[index.value] || NullValue.instance;
    } else {
        throw new SyntaxError("No such item:" + index.toString())
    }
};



DocumentValue.prototype.setItemInContext = function(context, index, value) {
    if (index instanceof TextValue) {
        this.values[index.value] = value
    } else {
        throw new SyntaxError("No such item:" + index.toString());
    }
};


DocumentValue.prototype.Add = function(context, value) {
    if (value instanceof DocumentValue) {
        return new DocumentValue(this.values.add(value.values));
    } else {
        throw new SyntaxError("Illegal: Document + " + typeof(value));
    }
};

DocumentValue.prototype.equals = function(other) {
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
};


DocumentValue.prototype.toString = function() {
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
};

DocumentValue.prototype.toJson = function(context, json, instanceId, fieldName, withType, binaries) {
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
};

DocumentValue.prototype.declare = function(transpiler) {
    transpiler.require(Document);
};

exports.DocumentValue = DocumentValue;


