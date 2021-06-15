import Expression from './Expression.js'
import { ResourceType, TextType } from '../type/index.js'
import { NullValue, TextValue } from '../value/index.js'
import { NullReferenceError, InvalidResourceError } from '../error/index.js'

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
        if(!context.isWithResourceContext())
            context.problemListener.reportNotAResourceContext(this.resource);
        const sourceType = this.resource.check(context);
        if(!(sourceType instanceof ResourceType))
            context.problemListener.reportNotAResource(this.resource);
        return TextType.instance;
    }

    interpret(context) {
        if(!context.isWithResourceContext())
            context.problemListener.reportNotAResourceContext(this.resource);
        const res = this.resource.interpret(context);
        if(res==null) {
            throw new NullReferenceError();
        }
        if(!res.isReadable || !res.isReadable()) {
            throw new InvalidResourceError("Not readable");
        }
        const s = res.readLine();
        return s == null ? NullValue.instance : new TextValue(s);
    }

    declare(transpiler) {
        this.resource.declare(transpiler);
    }

    transpile(transpiler) {
        this.resource.transpile(transpiler);
        transpiler.append(".readLine()");
    }
}
