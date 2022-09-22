import BaseExpression from '../../../main/prompto/expression/BaseExpression.ts'
import { ResourceType, TextType } from '../type'
import { NullValue, TextValue } from '../value'
import { NullReferenceError, InvalidResourceError } from '../error'

export default class ReadOneExpression extends BaseExpression {

    constructor(resource) {
        super();
        this.resource = resource;
    }

    toString() {
        return "read one from " + this.resource.toString();
    }

    toDialect(writer: CodeWriter): void {
        writer.append("read one from ");
        this.resource.toDialect(writer);
    }

    check(context: Context): Type {
        if(!context.isWithResourceContext())
            context.problemListener.reportNotAResourceContext(this.resource);
        const sourceType = this.resource.check(context);
        if(!(sourceType instanceof ResourceType))
            context.problemListener.reportNotAResource(this.resource);
        return TextType.instance;
    }

    interpret(context: Context): Value {
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

    declare(transpiler: Transpiler): void {
        this.resource.declare(transpiler);
    }

    transpile(transpiler: Transpiler): void {
        this.resource.transpile(transpiler);
        transpiler.append(".readLine()");
    }
}
