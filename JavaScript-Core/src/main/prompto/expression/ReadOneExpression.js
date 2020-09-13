import Expression from "./Expression"
import { ResourceContext } from "../runtime/index"
import { ResourceType, TextType } from "../type/index"
import { TextValue } from "../value/index"
import { NullReferenceError, InvalidResourceError } from "../error/index"

export default class ReadOneExpression extends Expression {

    constructor(resource) {
        super();
        this.resource = resource;
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
