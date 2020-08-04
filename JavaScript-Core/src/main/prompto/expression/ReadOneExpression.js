var Expression = require("./Expression").Expression;
var ResourceType = require("../type/ResourceType").ResourceType;
var ResourceContext = require("../runtime/Context").ResourceContext;
var NullReferenceError = require("../error/NullReferenceError").NullReferenceError;
var InvalidResourceError = require("../error/InvalidResourceError").InvalidResourceError;
var TextType = require("../type/TextType").TextType;
var TextValue = require("../value/TextValue").TextValue;

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
        var sourceType = this.resource.check(context);
        if(!(sourceType instanceof ResourceType))
            context.problemListener.reportNotAResource(this.resource);
        return TextType.instance;
    }

    interpret(context) {
        if(!(context instanceof ResourceContext))
            context.problemListener.reportNotAResourceContext(this.resource);
        var res = this.resource.interpret(context);
        if(res==null) {
            throw new NullReferenceError();
        }
        if(!res.isReadable || !res.isReadable()) {
            throw new InvalidResourceError("Not readable");
        }
        var s = res.readLine();
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
