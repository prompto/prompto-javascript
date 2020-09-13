import ThisExpression from "./ThisExpression"
import { AnyType, CategoryType } from "../type/index"
import { InstanceContext } from "../runtime/index"

export default class SuperExpression extends ThisExpression {

   check(context) {
        return this.getSuperType(context);
    }

    getSuperType(context) {
        if (context != null && !(context instanceof InstanceContext))
            context = context.getClosestInstanceContext ();
        if (context instanceof InstanceContext) {
            const type = context.instanceType;
            if(type instanceof CategoryType)
                return type.getSuperType(context, this);
            else
                return type;
        }
        else
            context.problemListener.reportNoSuperType(this, AnyType.instance);
    }

    toDialect(writer) {
        writer.append("super");
    }

    transpile(transpiler) {
        const type = this.getSuperType(transpiler.context);
        transpiler.append(type.name).append(".prototype");
    }
}
