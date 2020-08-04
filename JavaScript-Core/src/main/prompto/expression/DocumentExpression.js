var Expression = require("./Expression").Expression;
var DocumentType = require("../type/DocumentType").DocumentType;
var DocumentValue = require("../value/DocumentValue").DocumentValue;
var ConcreteInstance = require("../value/ConcreteInstance").ConcreteInstance;
var BlobValue = require("../value/BlobValue").BlobValue;
var ReadWriteError = require("../error/ReadWriteError").ReadWriteError;
var Document = require("../intrinsic/Document").Document;
var Blob = require("../intrinsic/Blob").Blob;

class DocumentExpression extends Expression {
 
    constructor(source) {
        super();
        this.source = source;
    }

    check(context) {
        return DocumentType.instance;
    }

    toString(context) {
        return "new Document()";
    }

    interpret(context) {
        if(!this.source)
            return new DocumentValue();
        else {
            var value = this.source.interpret(context);
            return this.documentFromValue(context, value);
        }
    }

    declare(transpiler) {
        transpiler.require(Document);
    }

    transpile(transpiler) {
        if(this.source) {
            this.source.transpile(transpiler);
            transpiler.append(".toDocument()");
        } else
            transpiler.append("new Document()");
    }

    documentFromValue(context, value) {
        if (value instanceof BlobValue)
            return this.documentFromBlob(context, value);
        else if (value instanceof ConcreteInstance)
            return value.toDocumentValue(context);
        else
            throw new Error("documentFromValue not supported for " + typeof(value));
    }

    documentFromBlob(context, blob) {
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
    }

    toDialect(writer) {
        writer.toDialect(this);
    }

    toEDialect(writer) {
        writer.append("Document");
        if (this.source) {
            writer.append(" from ");
            this.source.toDialect(writer);
        }
    }

    toMDialect(writer) {
        writer.append("Document(");
        if (this.source) {
            writer.append(" from = ");
            this.source.toDialect(writer);
        }
        writer.append(")");
    }

    toODialect(writer) {
        writer.append("Document(");
        if (this.source) {
            writer.append(" from = ");
            this.source.toDialect(writer);
        }
        writer.append(")");
    }
}

exports.DocumentExpression = DocumentExpression;
