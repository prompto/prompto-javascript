import Expression from "./Expression"
import { BlobValue } from "../value/index"
import { ResourceType, BlobType } from "../type/index"
import { NullReferenceError, InvalidResourceError} from "../error/index"

export default class ReadBlobExpression extends Expression {

    constructor(resource) {
        super();
        this.resource = resource;
    }

    toString() {
        return "read Blob from " + this.resource.toString();
    }

    toDialect(writer) {
        writer.append("read Blob from ");
        this.resource.toDialect(writer);
    }

    check(context) {
        context = context.newResourceContext();
        const sourceType = this.resource.check(context);
        if(!(sourceType instanceof ResourceType))
            context.problemListener.reportNotAResource(this.resource);
        return BlobType.instance;
    }

    interpret(context) {
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

    declare(transpiler) {
        this.resource.declare(transpiler);
    }

    transpile(transpiler) {
        this.resource.transpile(transpiler);
        transpiler.append(".readBinary()");
    }
}
