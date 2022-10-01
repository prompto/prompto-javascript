import BaseExpression from './BaseExpression'
import {InstanceContext, DocumentContext, Context, Transpiler} from '../runtime'
import {DocumentType, IType} from '../type'
import { SyntaxError } from '../error'
import {IValue} from "../value";
import {CodeWriter} from "../utils";

export default class ThisExpression extends BaseExpression {

   check(context: Context): IType {
        if (context instanceof DocumentContext)
            return DocumentType.instance;
        let ctx: Context | null = context;
        if (ctx && !(ctx instanceof InstanceContext))
            ctx = ctx.getClosestInstanceContext ();
        if (ctx instanceof InstanceContext)
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            { // @ts-ignore
                return ctx.instanceType;
            }
        else
            throw new SyntaxError ("Not in an instance context!");
    }

    interpret(context: Context): IValue {
        if (context instanceof DocumentContext)
            return context.document!;
        let ctx: Context | null = context;
        if (ctx && !(ctx instanceof InstanceContext))
            ctx = ctx.getClosestInstanceContext ();
        if (ctx instanceof InstanceContext)
            return ctx.instance!;
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
