var Expression = require("./Expression").Expression;
var DocumentType = require("../type/DocumentType").DocumentType;
var DocumentValue = require("../value/DocumentValue").DocumentValue;
var BlobValue = require("../value/BlobValue").BlobValue;
var ReadWriteError = require("../error/ReadWriteError").ReadWriteError;
var Document = require("../intrinsic/Document").Document;
var Blob = require("../intrinsic/Blob").Blob;

function DocumentExpression(source) {
    Expression.call(this);
    this.source = source;
	return this;
}

DocumentExpression.prototype  = Object.create(Expression.prototype);
DocumentExpression.prototype.constructor = DocumentExpression;

DocumentExpression.prototype.check = function(context) {
	return DocumentType.instance;
};

DocumentExpression.prototype.toString = function(context) {
    return "new Document()";
};

DocumentExpression.prototype.interpret = function(context) {
    if(!this.source)
        return new DocumentValue();
    else {
        var value = this.source.interpret(context);
        return this.documentFromValue(context, value);
    }
};

DocumentExpression.prototype.declare = function(transpiler) {
    transpiler.require(Document);
};


DocumentExpression.prototype.transpile = function(transpiler) {
    if(this.source) {
        this.source.transpile(transpiler);
        transpiler.append(".toDocument()");
    } else
        transpiler.append("new Document()");
};

DocumentExpression.prototype.documentFromValue = function(context, value) {
    if (value instanceof BlobValue)
        return this.documentFromBlob(context, value);
    else
        throw new Error("documentFromValue not supported for " + typeof(value));
};

DocumentExpression.prototype.documentFromBlob = function(context, blob) {
    if("application/zip"!=blob.mimeType)
        throw new Error("documentFromBlob not supported for " + blob.mimeType);
    try {
        var parts = Blob.readParts(blob.data);
        var value = Blob.readValue(parts);
        var field = value["type"] || null;
        if (field == null)
            throw new Error("Expecting a 'type' field!");
        var ECleverParser = require("../parser/ECleverParser").ECleverParser;
        var itype = new ECleverParser(field).parse_standalone_type();
        if (itype != DocumentType.instance)
            throw new Error("Expecting a DocumentValue type!");
        field = value["value"] || null;
        if (field == null)
            throw new Error("Expecting a 'value' field!");
        return itype.readJSONValue(context, field, parts);
    } catch (e) {
        throw new ReadWriteError(e.message);
    }
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

DocumentExpression.prototype.toMDialect = function(writer) {
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
