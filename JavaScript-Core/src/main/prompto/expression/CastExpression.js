import Expression from './Expression.js'
import { VoidType, AnyType, NativeType, MethodType, IntegerType, DecimalType, IterableType } from '../type/index.js'
import { IntegerValue, DecimalValue } from '../value/index.js'
import { MethodDeclarationMap } from '../runtime/index.js'


function getTargetType(context, itype, mutable) {
    if (itype instanceof IterableType) {
        const itemType = getTargetType(context, itype.itemType);
        if (itemType)
            return itype.withItemType(itemType).asMutable(context, mutable);
        else
            context.problemListener.reportUnknownCategory(itype.itemType.id, itype.itemType);
            return null;
    } else if (itype instanceof NativeType) {
        return itype.asMutable(context, mutable)
    } else {
        itype = getTargetAtomicType(context, itype);
        if (itype != null)
            return itype.asMutable(context, mutable);
        else
            return null;
    }
}


function getTargetAtomicType(context, itype) {
    const decl = context.getRegisteredDeclaration(itype.id);
    if (decl == null) {
        context.problemListener.reportUnknownCategory(itype.id, itype);
        return null;
    } else if (decl instanceof MethodDeclarationMap) {
        if (decl.size() === 1)
            return new MethodType(decl.getFirst());
        else {
            context.problemListener.reportAmbiguousIdentifier(itype.id, itype);
            return null;
        }
    } else
        return decl.getType(context);
}


export default class CastExpression extends Expression {

    constructor(expression, type, mutable) {
        super();
        this.expression = expression;
        this.type = type.anyfy();
        this.mutable = mutable;
    }

    check(context) {
        let actual = this.expression.check(context);
        if(actual)
            actual = actual.anyfy();
        else {
            context.problemListener.reportError(this, "Could not check expression type");
            return AnyType.instance;
        }
        const target = getTargetType(context, this.type, this.mutable);
        if(target === null)
            return VoidType.instance;
        // check Any
        if(actual === AnyType.instance)
            return target;
        // check upcast
        if(target.isAssignableFrom(context, actual))
            return target;
        // check downcast
        if(actual.isAssignableFrom(context, target))
            return target;
        context.problemListener.reportInvalidCast(this, this.type, actual);
        return target; // don't propagate the issue
    }

    interpret(context) {
        let value = this.expression.interpret(context);
        const target = getTargetType(context, this.type);
        if(value) {
            if (value instanceof IntegerValue && target === DecimalType.instance) {
                value = new DecimalValue(value.DecimalValue());
            } else if (value instanceof DecimalValue && target === IntegerType.instance) {
                value = new IntegerValue(value.IntegerValue());
            } else if (target.isMoreSpecificThan(context, value.type)) {
                value.type = this.type;
            }
        }
        return value;
    }

    declare(transpiler) {
        this.expression.declare(transpiler);
        const target = getTargetType(transpiler.context, this.type);
        target.declare(transpiler);
    }

    transpile(transpiler) {
        const expType = this.expression.check(transpiler.context);
        if(expType===DecimalType.instance && this.type===IntegerType.instance) {
            transpiler.append("Math.floor(");
            this.expression.transpile(transpiler);
            transpiler.append(")");
        } else
            this.expression.transpile(transpiler);
    }

    toDialect(writer) {
        writer.toDialect(this);
    }

    toEDialect(writer) {
        this.expression.toDialect(writer);
        writer.append(" as ");
        if(this.mutable)
            writer.append("mutable ");
        this.type.toDialect(writer);
    }

    toMDialect(writer) {
        this.toEDialect(writer);
    }

    toODialect(writer) {
        writer.append("(");
        if(this.mutable)
            writer.append("mutable ");
        this.type.toDialect(writer);
        writer.append(")");
        this.expression.toDialect(writer);
    }
}
