const Expression = require("./Expression").Expression;
const ResourceType = require("../type/ResourceType").ResourceType;
const NullReferenceError = require("../error/NullReferenceError").NullReferenceError;
const InvalidResourceError = require("../error/InvalidResourceError").InvalidResourceError;
const BlobType = require("../type/BlobType").BlobType;
const BlobValue = require("../value/BlobValue").BlobValue;

class ReadBlobExpression extends Expression {

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

exports.ReadBlobExpression = ReadBlobExpression;
