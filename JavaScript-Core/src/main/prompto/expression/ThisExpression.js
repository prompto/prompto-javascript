import BaseExpression from '../../../main/prompto/expression/BaseExpression.ts'
import { InstanceContext, DocumentContext } from '../runtime'
import { DocumentType } from '../type'
import { SyntaxError } from '../error'

export default class ThisExpression extends BaseExpression {

   check(context: Context): Type {
        if (context instanceof DocumentContext)
            return DocumentType.instance;
        if (context != null && !(context instanceof InstanceContext))
            context = context.getClosestInstanceContext ();
        if (context instanceof InstanceContext)
            return context.instanceType;
        else
            throw new SyntaxError ("Not in an instance context!");
    }

    interpret(context: Context): Value {
        if (context instanceof DocumentContext)
            return context.document;
        if (context != null && !(context instanceof InstanceContext))
            context = context.getClosestInstanceContext ();
        if (context instanceof InstanceContext)
            return context.instance;
        else
            throw new SyntaxError ("Not in an instance context!");
    }

    toDialect(writer: CodeWriter): void {
        writer.toDialect(this);
    }

    toEDialect(writer: CodeWriter): void {
        writer.append("self");
    }

    toODialect(writer: CodeWriter): void {
        writer.append("this");
    }

    toMDialect(writer: CodeWriter): void {
        writer.append("self");
    }

    toString() {
        return "this";
    }

    declare(transpiler: Transpiler): void {
        // nothing to do
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append("this");
    }
}
