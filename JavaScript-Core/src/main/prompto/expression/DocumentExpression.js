var Section = require("../parser/Section").Section;
var DocumentType = require("../type/DocumentType").DocumentType;
var Document = require("../value/Document").Document;
var Blob = require("../value/Blob").Blob;
var Dialect = require("../parser/Dialect").Dialect;
var ReadWriteError = require("../error/ReadWriteError").ReadWriteError;
var utf8BufferToString = require("../utils/Utils").utf8BufferToString;

function DocumentExpression(source) {
    Section.call(this);
    this.source = source;
	return this;
}

DocumentExpression.prototype  = Object.create(Section.prototype);
DocumentExpression.prototype.constructor = DocumentExpression;

DocumentExpression.prototype.check = function(context) {
	return DocumentType.instance;
};

DocumentExpression.prototype.interpret = function(context) {
    if(!this.source)
        return new Document();
    else {
        var value = this.source.interpret(context);
        return this.documentFromValue(context, value);
    }
};

DocumentExpression.prototype.documentFromValue = function(context, value) {
    if (value instanceof Blob)
        return this.documentFromBlob(context, value);
    else
        throw new Error("documentFromValue not supported for " + typeof(value));
};

DocumentExpression.prototype.documentFromBlob = function(context, blob) {
    if("application/zip"!=blob.mimeType)
        throw new Error("documentFromBlob not supported for " + blob.mimeType);
    try {
        var parts = this.readParts(blob.data);
        var value = this.readValue(parts);
        var field = value["type"] || null;
        if (field == null)
            throw new Error("Expecting a 'type' field!");
        var ECleverParser = require("../parser/ECleverParser").ECleverParser;
        var itype = new ECleverParser(field).parse_standalone_type();
        if (itype != DocumentType.instance)
            throw new Error("Expecting a Document type!");
        field = value["value"] || null;
        if (field == null)
            throw new Error("Expecting a 'value' field!");
        return itype.readJSONValue(context, field, parts);
    } catch (e) {
        throw new ReadWriteError(e.message);
    }
};

DocumentExpression.prototype.readParts = function(data) {
    var JSZip = require("jszip-sync");
    var zip = new JSZip();
    return zip.sync(function() {
        var parts = {};
        zip.loadAsync(data);
        zip.forEach(function (entry) {
            zip.file(entry)
                .async("arraybuffer")
                .then(function(value) {
                    parts[entry] = value;
                });
        });
        return parts;
    });
};


DocumentExpression.prototype.readValue = function(parts) {
    var data = parts["value.json"] || null;
    if (data == null)
        throw new Error("Expecting a 'value.json' part!");
    var json = utf8BufferToString(data);
    return JSON.parse(json);
};

DocumentExpression.prototype.toDialect = function(writer) {
    writer.toDialect(this);
};

DocumentExpression.prototype.toEDialect = function(writer) {
    writer.append("Document");
    if (this.source) {
        writer.append(" from ");
        this.source.toDialect(writer);
    }
};

DocumentExpression.prototype.toSDialect = function(writer) {
    writer.append("Document(");
    if (this.source)
        this.source.toDialect(writer);
    writer.append(")");
};

DocumentExpression.prototype.toODialect = function(writer) {
    writer.append("Document(");
    if (this.source)
        this.source.toDialect(writer);
    writer.append(")");
};

exports.DocumentExpression = DocumentExpression;
