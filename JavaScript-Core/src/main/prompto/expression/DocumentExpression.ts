import BaseExpression from './BaseExpression'
import {DocumentType, IType} from '../type'
import {DocumentValue, BlobValue, ConcreteInstance, IValue} from '../value'
import { BlobRef, Document } from '../intrinsic'
import { ReadWriteError } from '../error'
import { ECleverParser } from "../parser"
import {IExpression} from "./index";
import {Context, Transpiler} from "../runtime";
import {CodeWriter} from "../utils";

export default class DocumentExpression extends BaseExpression {

    source: IExpression | null;

    constructor(source: IExpression | null) {
        super();
        this.source = source;
    }

    check(context: Context): IType {
        return DocumentType.instance;
    }

    toString(context: Context): string {
        return "new Document()";
    }

    interpret(context: Context): IValue {
        if(!this.source)
            return new DocumentValue();
        else {
            const value = this.source.interpret(context);
            return this.documentFromValue(context, value);
        }
    }

    declare(transpiler: Transpiler): void {
        transpiler.require(Document);
    }

    transpile(transpiler: Transpiler): void {
        if(this.source) {
            this.source.transpile(transpiler);
            transpiler.append(".toDocument()");
        } else
            transpiler.append("new Document()");
    }

    documentFromValue(context: Context, value: IValue): DocumentValue {
        if (value instanceof BlobValue)
            return this.documentFromBlob(context, value);
        else if (value instanceof ConcreteInstance)
            return (value as ConcreteInstance).toDocumentValue(context);
        else
            throw new Error("documentFromValue not supported for " + typeof(value));
    }

    documentFromBlob(context: Context, blob: BlobValue): DocumentValue {
        if("application/zip"!==blob.mimeType)
            throw new Error("documentFromBlob not supported for " + blob.mimeType);
        try {
            const parts = BlobRef.readParts(blob.data);
            if(!parts)
                throw new Error("Could not read zip parts");
            const value = BlobRef.readValue(parts);
            if(typeof value != "object")
                throw new Error("Could not read json data");
            let field = value!["type" as keyof typeof value] || null;
            if (!field)
                throw new Error("Expecting a 'type' field!");
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const type = new ECleverParser(field).parse_standalone_type() as IType;
            if (type != DocumentType.instance)
                throw new Error("Expecting a DocumentValue type!");
            field = value!["value" as keyof typeof value] || null;
            if (!field)
                throw new Error("Expecting a 'value' field!");
            return (type as DocumentType).readJSONValue(context, field, parts);
        } catch (e) {
            throw new ReadWriteError((e as Error).message);
        }
    }

    toDialect(writer: CodeWriter): void {
        writer.toDialect(this);
    }

    toEDialect(writer: CodeWriter): void {
        writer.append("Document");
        if (this.source) {
            writer.append(" from ");
            this.source.toDialect(writer);
        }
    }

    toMDialect(writer: CodeWriter): void {
        writer.append("Document(");
        if (this.source) {
            writer.append(" from = ");
            this.source.toDialect(writer);
        }
        writer.append(")");
    }

    toODialect(writer: CodeWriter): void {
        writer.append("Document(");
        if (this.source) {
            writer.append(" from = ");
            this.source.toDialect(writer);
        }
        writer.append(")");
    }
}
