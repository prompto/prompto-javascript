import BaseExpression from './BaseExpression'
import {BlobType, IType} from '../type'
import { BlobRef, Document } from '../intrinsic'
import {BlobValue, IValue} from '../value'
import { ReadWriteError } from '../error'
import {getUtf8CharLength, utf8BufferToString, stringToUtf8Buffer, CodeWriter} from '../utils'
import {IExpression} from "./index";
import {Context, Transpiler} from "../runtime";
import {JsonNode} from "../json";

export default class BlobExpression extends BaseExpression {

    source: IExpression;

    constructor(source: IExpression) {
        super();
        this.source = source;
    }

    check(context: Context): IType {
        this.source.check(context);
        return BlobType.instance;
    }

    interpretExpression(context: Context): IValue {
        const value = this.source.interpretExpression(context);
        try {
            const datas = BlobExpression.collectDatas(context, value);
            const zipped = BlobRef.zipDatas(datas);
            return new BlobValue("application/zip", zipped);
        } catch (e) {
            const message = e instanceof Error ? e.message : "<mmm...>";
            throw new ReadWriteError(message);
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

    static collectDatas(context: Context, value: IValue): Map<string, never> {
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
