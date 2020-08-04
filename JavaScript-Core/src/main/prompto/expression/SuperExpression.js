var ThisExpression = require("./ThisExpression").ThisExpression;
var InstanceContext = require("../runtime/Context").InstanceContext;
var CategoryType = require("../type/CategoryType").CategoryType;
var AnyType = require("../type/AnyType").AnyType;

class SuperExpression extends ThisExpression {
    constructor() {
        super();
        return this;
    }

    check(context) {
        return this.getSuperType(context);
    }

    getSuperType(context) {
        if (context != null && !(context instanceof InstanceContext))
            context = context.getClosestInstanceContext ();
        if (context instanceof InstanceContext) {
            var type = context.instanceType;
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
        var type = this.getSuperType(transpiler.context);
        transpiler.append(type.name).append(".prototype");
    }
}

exports.SuperExpression = SuperExpression;
