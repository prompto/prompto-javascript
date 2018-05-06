var NullValue = require("./NullValue").NullValue;
var Value = require("./Value").Value;
var TextValue = require("./TextValue").TextValue;
var DocumentType = require("../type/DocumentType").DocumentType;

function DocumentValue(values) {
    Value.call(this, DocumentType.instance);
    this.mutable = true;
    this.values = values || {};
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

DocumentValue.prototype.hasMember = function(name) {
    return this.values.hasOwnProperty(name);
}

DocumentValue.prototype.getMemberValue = function(context, name, autoCreate) {
    var result = this.values[name] || null;
    if(result)
        return result;
    else if("text" == name)
        return new TextValue(this.toString());
    else if(autoCreate) {
        result = new DocumentValue();
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

DocumentValue.prototype.equals = function(other) {
    return other==this;
};


DocumentValue.prototype.toString = function() {
    var binaries = {};
    // create json type-aware object graph and collect binaries
    var values = {}; // need a temporary parent
    for (var key in this.values) {
        var value = this.values[key];
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
    for (var key in this.values) {
        var value = this.values[key];
        if (value == null || value == undefined)
            values[key] = null;
        else {
            var id = this; // TODO create identifier
            value.toJson(context, values, id, key, withType, binaries);
        }
    }
    var doc = withType ? { type: DocumentType.instance.name, value: values} : values;
    if(Array.isArray(json))
        json.push(doc);
    else
        json[fieldName] = doc;

};

exports.DocumentValue = DocumentValue;

