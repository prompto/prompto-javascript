var Value = require("./Value").Value;
var DocumentType = require("../type/DocumentType").DocumentType;

function Document(value) {
    Value.call(this, DocumentType.instance);
    this.mutable = true;
    this.members = {};
    return this;
}

Document.prototype = Object.create(Value.prototype);
Document.prototype.constructor = Document;

Document.prototype.hasMember = function(name) {
    return this.members.hasOwnProperty(name);
}

Document.prototype.getMember = function(context, name, autoCreate) {
    var result = this.members[name] || null;
    if(autoCreate && result==null) {
        result = new Document();
        this.members[name] = result;
    }
    return result;
};

Document.prototype.setMember = function(context, name, value) {
    this.members[name] = value;
};

exports.Document = Document;


