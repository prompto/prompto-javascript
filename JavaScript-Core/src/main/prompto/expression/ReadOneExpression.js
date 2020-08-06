const Expression = require("./Expression").Expression;
const ResourceType = require("../type/ResourceType").ResourceType;
const ResourceContext = require("../runtime/Context").ResourceContext;
const NullReferenceError = require("../error/NullReferenceError").NullReferenceError;
const InvalidResourceError = require("../error/InvalidResourceError").InvalidResourceError;
const TextType = require("../type/TextType").TextType;
const TextValue = require("../value/TextValue").TextValue;

class ReadOneExpression extends Expression {
    constructor(resource) {
        super();
        this.resource = resource;
        return this;
    }

    toString() {
        return "read one from " + this.resource.toString();
    }

    toDialect(writer) {
        writer.append("read one from ");
        this.resource.toDialect(writer);
    }

    check(context) {
        if(!(context instanceof ResourceContext))
            context.problemListener.reportNotAResourceContext(this.resource);
        const sourceType = this.resource.check(context);
        if(!(sourceType instanceof ResourceType))
            context.problemListener.reportNotAResource(this.resource);
        return TextType.instance;
    }

    interpret(context) {
        if(!(context instanceof ResourceContext))
            context.problemListener.reportNotAResourceContext(this.resource);
        const res = this.resource.interpret(context);
        if(res==null) {
            throw new NullReferenceError();
        }
        if(!res.isReadable || !res.isReadable()) {
            throw new InvalidResourceError("Not readable");
        }
        const s = res.readLine();
        return new TextValue(s);
    }

    declare(transpiler) {
        this.resource.declare(transpiler);
    }

    transpile(transpiler) {
        this.resource.transpile(transpiler);
        transpiler.append(".readLine()");
    }
}


exports.ReadOneExpression = ReadOneExpression;
