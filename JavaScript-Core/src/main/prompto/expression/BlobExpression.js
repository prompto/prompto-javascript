const Expression = require("./Expression").Expression;
const BlobType = require("../type/BlobType").BlobType;
const Document = require("../intrinsic/Document").Document;
const Blob = require("../intrinsic/Blob").Blob;
const BlobValue = require("../value/BlobValue").BlobValue;
const ReadWriteError = require("../error/ReadWriteError").ReadWriteError;
const stringToUtf8Buffer = require("../utils/Utils").stringToUtf8Buffer;
const getUtf8CharLength = require("../utils/Utils").getUtf8CharLength;
const utf8BufferToString = require("../utils/Utils").utf8BufferToString;

class BlobExpression extends Expression {
    constructor(source) {
        super();
        this.source = source;
        return this;
    }

    check(context) {
        this.source.check(context);
        return BlobType.instance;
    }

    interpret(context) {
        const value = this.source.interpret(context);
        try {
            const datas = BlobExpression.collectDatas(context, value);
            const zipped = Blob.zipDatas(datas);
            return new BlobValue("application/zip", zipped);
        } catch (e) {
            throw new ReadWriteError(e.message);
        }
    }

    declare(transpiler) {
        this.source.declare(transpiler);
        transpiler.require(Blob);
        transpiler.require(Document);
        transpiler.require(getUtf8CharLength);
        transpiler.require(stringToUtf8Buffer);
        transpiler.require(utf8BufferToString);
    }

    transpile(transpiler) {
        transpiler.append("Blob.fromValue(");
        this.source.transpile(transpiler);
        transpiler.append(")");
    }

    static collectDatas(context, value) {
        const binaries = {};
        // create json type-aware object graph and collect binaries
        const values = {}; // need a temporary parent
        value.toJson(context, values, null, "value", true, binaries);
        const json = JSON.stringify(values["value"]);
        // add it
        binaries["value.json"] = stringToUtf8Buffer(json);
        return binaries;
    }

    toDialect(writer) {
        writer.toDialect(this);
    }

    toEDialect(writer) {
        writer.append("Blob from ");
        this.source.toDialect(writer);
    }

    toODialect(writer) {
        writer.append("Blob(");
        this.source.toDialect(writer);
        writer.append(')');
    }

    toMDialect(writer) {
        writer.append("Blob(");
        this.source.toDialect(writer);
        writer.append(')');
    }
}

exports.BlobExpression = BlobExpression;
