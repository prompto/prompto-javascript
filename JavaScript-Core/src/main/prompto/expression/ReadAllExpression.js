const Expression = require("./Expression").Expression;
const ResourceType = require("../type/ResourceType").ResourceType;
const NullReferenceError = require("../error/NullReferenceError").NullReferenceError;
const InvalidResourceError = require("../error/InvalidResourceError").InvalidResourceError;
const TextType = require("../type/TextType").TextType;
const TextValue = require("../value/TextValue").TextValue;

class ReadAllExpression extends Expression {
    constructor(resource) {
        super();
        this.resource = resource;
        return this;
    }

    toString() {
        return "read all from " + this.resource.toString();
    }

    toDialect(writer) {
        writer.append("read all from ");
        this.resource.toDialect(writer);
    }

    check(context) {
        context = context.newResourceContext();
        const sourceType = this.resource.check(context);
        if(!(sourceType instanceof ResourceType))
            context.problemListener.reportNotAResource(this.resource);
        return TextType.instance;
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
            const s = res.readFully();
            return new TextValue(s);
        } finally {
            res.close();
        }
    }

    declare(transpiler) {
        this.resource.declare(transpiler);
    }

    transpile(transpiler) {
        this.resource.transpile(transpiler);
        transpiler.append(".readFully()");
    }
}

exports.ReadAllExpression = ReadAllExpression;
