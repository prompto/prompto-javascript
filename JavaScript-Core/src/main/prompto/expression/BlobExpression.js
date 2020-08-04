var Expression = require("./Expression").Expression;
var BlobType = require("../type/BlobType").BlobType;
var Document = require("../intrinsic/Document").Document;
var Blob = require("../intrinsic/Blob").Blob;
var BlobValue = require("../value/BlobValue").BlobValue;
var ReadWriteError = require("../error/ReadWriteError").ReadWriteError;
var stringToUtf8Buffer = require("../utils/Utils").stringToUtf8Buffer;
var getUtf8CharLength = require("../utils/Utils").getUtf8CharLength;
var utf8BufferToString = require("../utils/Utils").utf8BufferToString;

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
        var value = this.source.interpret(context);
        try {
            var datas = BlobExpression.collectDatas(context, value);
            var zipped = Blob.zipDatas(datas);
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
        var binaries = {};
        // create json type-aware object graph and collect binaries
        var values = {}; // need a temporary parent
        value.toJson(context, values, null, "value", true, binaries);
        var json = JSON.stringify(values["value"]);
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
