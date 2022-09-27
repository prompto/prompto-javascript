import ThisExpression from './ThisExpression'
import {AnyType, IType, VoidType} from '../type'
import {Context, InstanceContext, Transpiler} from '../runtime'
import {CodeWriter} from "../utils";

export default class SuperExpression extends ThisExpression {

   check(context: Context): IType {
        return this.getSuperType(context);
    }

    getSuperType(context: Context): IType {
        let ctx: Context | null = context;
        if (ctx && !(ctx instanceof InstanceContext))
            ctx = ctx.getClosestInstanceContext ();
        if (ctx instanceof InstanceContext)
            return ctx.instanceType.getSuperType(context, this);
        else {
            context.problemListener.reportNoSuperType(this, AnyType.instance);
            return VoidType.instance;
        }
    }

    toDialect(writer: CodeWriter): void {
        writer.append("super");
    }

    transpile(transpiler: Transpiler): void {
        const type = this.getSuperType(transpiler.context);
        transpiler.append(type.name).append(".prototype");
    }
}
