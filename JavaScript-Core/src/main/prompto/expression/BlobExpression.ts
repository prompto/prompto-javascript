import BaseExpression from './BaseExpression'
import {BlobType, Type} from '../type'
import { BlobRef, Document } from '../intrinsic'
import {BlobValue, Value} from '../value'
import { ReadWriteError } from '../error'
import {getUtf8CharLength, utf8BufferToString, stringToUtf8Buffer, CodeWriter} from '../utils'
import {Expression} from "./index";
import {Context, Transpiler} from "../runtime";
import {JsonNode} from "../json";

export default class BlobExpression extends BaseExpression {

    source: Expression;

    constructor(source: Expression) {
        super();
        this.source = source;
    }

    check(context: Context): Type {
        this.source.check(context);
        return BlobType.instance;
    }

    interpret(context: Context): Value {
        const value = this.source.interpret(context);
        try {
            const datas = BlobExpression.collectDatas(context, value);
            const zipped = BlobRef.zipDatas(datas);
            return new BlobValue("application/zip", zipped);
        } catch (e) {
            throw new ReadWriteError(e.message);
        }
    }

    declare(transpiler: Transpiler): void {
        this.source.declare(transpiler);
        transpiler.require(BlobRef);
        transpiler.require(Document);
        transpiler.require(getUtf8CharLength);
        transpiler.require(stringToUtf8Buffer);
        transpiler.require(utf8BufferToString);
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append("BlobRef.fromValue(");
        this.source.transpile(transpiler);
        transpiler.append(")");
    }

    static collectDatas(context: Context, value: Value): Map<string, never> {
        const binaries = new Map<string, never>();
        // create json type-aware object graph and collect binaries
        const values = new Map<string, JsonNode>(); // need a temporary parent
        value.toJsonStream(context, values, null, "value", true, binaries);
        const json = JSON.stringify(values.get("value"));
        // add it
        binaries.set("value.json", stringToUtf8Buffer(json) as never);
        return binaries;
    }

    toEDialect(writer: CodeWriter): void {
        writer.append("Blob from ");
        this.source.toDialect(writer);
    }

    toODialect(writer: CodeWriter): void {
        writer.append("Blob(");
        this.source.toDialect(writer);
        writer.append(')');
    }

    toMDialect(writer: CodeWriter): void {
        this.toODialect(writer);
    }
}
