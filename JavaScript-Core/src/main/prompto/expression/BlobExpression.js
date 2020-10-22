import Expression from './Expression.js'
import { BlobType } from '../type/index.js'
import { BlobRef, Document } from '../intrinsic/index.js'
import { BlobValue } from '../value/index.js'
import { ReadWriteError } from '../error/index.js'
import { getUtf8CharLength, utf8BufferToString, stringToUtf8Buffer } from '../utils/index.js'

export default class BlobExpression extends Expression {

    constructor(source) {
        super();
        this.source = source;
    }

    check(context) {
        this.source.check(context);
        return BlobType.instance;
    }

    interpret(context) {
        const value = this.source.interpret(context);
        try {
            const datas = BlobExpression.collectDatas(context, value);
            const zipped = BlobRef.zipDatas(datas);
            return new BlobValue("application/zip", zipped);
        } catch (e) {
            throw new ReadWriteError(e.message);
        }
    }

    declare(transpiler) {
        this.source.declare(transpiler);
        transpiler.require(BlobRef);
        transpiler.require(Document);
        transpiler.require(getUtf8CharLength);
        transpiler.require(stringToUtf8Buffer);
        transpiler.require(utf8BufferToString);
    }

    transpile(transpiler) {
        transpiler.append("BlobRef.fromValue(");
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
