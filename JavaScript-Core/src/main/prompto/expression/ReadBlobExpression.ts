import BaseExpression from './BaseExpression'
import {BlobValue, IValue} from '../value'
import {ResourceType, BlobType, IType} from '../type'
import { NullReferenceError, InvalidResourceError} from '../error'
import {IExpression} from "./index";
import {CodeWriter} from "../utils";
import {Context, Transpiler} from "../runtime";
import {Section} from "../parser";
import IResource from "../value/IResource";

export default class ReadBlobExpression extends BaseExpression {

    resource: IExpression;

    constructor(resource: IExpression) {
        super();
        this.resource = resource;
    }

    toString() {
        return "read Blob from " + this.resource.toString();
    }

    toDialect(writer: CodeWriter): void {
        writer.append("read Blob from ");
        this.resource.toDialect(writer);
    }

    check(context: Context): IType {
        context = context.newResourceContext();
        const sourceType = this.resource.check(context);
        if(!(sourceType instanceof ResourceType)) {
            const section: Section = this.resource instanceof Section ? this.resource : this;
            context.problemListener.reportNotAResource(section);
        }
        return BlobType.instance;
    }

    interpret(context: Context): IValue {
        context = context.newResourceContext();
        const value = this.resource.interpret(context);
        if(!value) {
            throw new NullReferenceError();
        }
        if(!value.isResource()) {
            throw new InvalidResourceError("Not a resource");
        }
        const res = value as unknown as IResource;
        if(!res.isReadable()) {
            throw new InvalidResourceError("Not readable");
        }
        try {
            const blob = res.readBinary();
            return new BlobValue(blob.mimeType, blob.data);
        } finally {
            res.close();
        }
    }

    declare(transpiler: Transpiler): void {
        this.resource.declare(transpiler);
    }

    transpile(transpiler: Transpiler): void {
        this.resource.transpile(transpiler);
        transpiler.append(".readBinary()");
    }
}
