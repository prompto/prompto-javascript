import BaseExpression from '../../../main/prompto/expression/BaseExpression.ts'
import { ResourceType, TextType } from '../type'
import { NullReferenceError, InvalidResourceError } from '../error'
import { TextValue } from '../value'

export default class ReadAllExpression extends BaseExpression {

    constructor(resource) {
        super();
        this.resource = resource;
    }

    toString() {
        return "read all from " + this.resource.toString();
    }

    toDialect(writer: CodeWriter): void {
        writer.append("read all from ");
        this.resource.toDialect(writer);
    }

    check(context: Context): Type {
        context = context.newResourceContext();
        const sourceType = this.resource.check(context);
        if(!(sourceType instanceof ResourceType))
            context.problemListener.reportNotAResource(this.resource);
        return TextType.instance;
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
            const s = res.readFully();
            return new TextValue(s);
        } finally {
            res.close();
        }
    }

    declare(transpiler: Transpiler): void {
        this.resource.declare(transpiler);
    }

    transpile(transpiler: Transpiler): void {
        this.resource.transpile(transpiler);
        transpiler.append(".readFully()");
    }
}
