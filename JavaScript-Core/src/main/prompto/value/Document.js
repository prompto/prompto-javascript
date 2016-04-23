var Value = require("./Value").Value;
var DocumentType = require("../type/DocumentType").DocumentType;

function Document(value) {
    Value.call(this, DocumentType.instance);
    this.mutable = true;
    this.values = {};
    return this;
}

Document.prototype = Object.create(Value.prototype);
Document.prototype.constructor = Document;

Document.prototype.hasMember = function(name) {
    return this.values.hasOwnProperty(name);
}

Document.prototype.getMember = function(context, name, autoCreate) {
    var result = this.values[name] || null;
    if(autoCreate && result==null) {
        result = new Document();
        this.values[name] = result;
    }
    return result;
};

Document.prototype.setMember = function(context, name, value) {
    this.values[name] = value;
};

Document.prototype.toJson = function(context, json, instanceId, fieldName, binaries) {
    var doc = {};
    doc["type"] = DocumentType.instance.name;
    var values = {};
    for (var key in this.values) {
        var value = this.values[key];
        if (value == null || value == undefined)
            values[key] = null;
        else {
            var id = this; // TODO create identifier
            value.toJson(context, values, id, key, binaries);
        }
    }
    doc["value"] = values;
    if(Array.isArray(json))
        json.push(doc);
    else
        json[fieldName] = doc;

};

exports.Document = Document;


