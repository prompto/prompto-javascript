import BaseExpression from './BaseExpression.ts'
import { BlobValue } from '../value'
import { ResourceType, BlobType } from '../type'
import { NullReferenceError, InvalidResourceError} from '../error'

export default class ReadBlobExpression extends BaseExpression {

    constructor(resource) {
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

    check(context: Context): Type {
        context = context.newResourceContext();
        const sourceType = this.resource.check(context);
        if(!(sourceType instanceof ResourceType))
            context.problemListener.reportNotAResource(this.resource);
        return BlobType.instance;
    }

    interpret(context: Context): Value {
        context = context.newResourceContext();
        const res = this.resource.interpret(context);
        if(res==null) {
            throw new NullReferenceError();
        }
        if(!res.isReadable || !res.isReadable()) {
            throw new InvalidResourceError("Not readable");
        }
        try {
            const b = res.readBinary();
            return new BlobValue(b.mimeType, b.data);
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
