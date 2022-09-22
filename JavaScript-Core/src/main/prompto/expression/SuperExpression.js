import ThisExpression from './ThisExpression.js'
import { AnyType, CategoryType } from '../type'
import { InstanceContext } from '../runtime'

export default class SuperExpression extends ThisExpression {

   check(context: Context): Type {
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

    toDialect(writer: CodeWriter): void {
        writer.append("super");
    }

    transpile(transpiler: Transpiler): void {
        const type = this.getSuperType(transpiler.context);
        transpiler.append(type.name).append(".prototype");
    }
}
