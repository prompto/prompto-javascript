import BaseExpression from './BaseExpression'
import {VoidType, AnyType, NativeType, MethodType, IntegerType, DecimalType, IterableType, IType} from '../type'
import {IntegerValue, DecimalValue, NullValue, IValue} from '../value'
import {Context, MethodDeclarationMap, Transpiler} from '../runtime'
import {IExpression} from "./index";
import {CodeWriter} from "../utils";


function getTargetType(context: Context, itype: IType, mutable: boolean): IType | null {
    if (itype instanceof IterableType) {
        const itemType = getTargetType(context, itype.itemType, itype.itemType.mutable);
        if (itemType)
            return itype.withItemType(itemType).asMutable(context, mutable);
        else {
            context.problemListener.reportUnknownCategory(itype.itemType.id, itype.itemType.name);
            return null;
        }
    } else if (itype instanceof NativeType) {
        return itype.asMutable(context, mutable);
    } else {
        const atomic = getTargetAtomicType(context, itype);
        if (atomic != null)
            return atomic.asMutable(context, mutable);
        else
            return null;
    }
}


function getTargetAtomicType(context: Context, itype: IType): IType | null {
    const decl = context.getRegistered(itype.id);
    if (!decl) {
        context.problemListener.reportUnknownCategory(itype.id, itype.name);
        return null;
    } else if (decl instanceof MethodDeclarationMap) {
        if (decl.size() == 1)
            return new MethodType(decl.getFirst()!);
        else {
            // TODO context.problemListener.reportAmbiguousIdentifier(itype.id, itype.name);
            return null;
        }
    } else
        return decl.getType(context);
}


export default class CastExpression extends BaseExpression {

    expression: IExpression;
    type: IType;
    mutable: boolean;

    constructor(expression: IExpression, type: IType, mutable: boolean) {
        super();
        this.expression = expression;
        this.type = type.anyfy();
        this.mutable = mutable;
    }

    check(context: Context): IType {
        let actual = this.expression.check(context);
        if(actual)
            actual = actual.anyfy();
        else {
            context.problemListener.reportError(this, "Could not check expression type");
            return AnyType.instance;
        }
        const target = getTargetType(context, this.type, this.mutable);
        if(target == null)
            return VoidType.instance;
        // check Any
        if(actual == AnyType.instance)
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

    interpretExpression(context: Context): IValue {
        let value = this.expression.interpretExpression(context);
        if(value && value != NullValue.instance) {
            const target = getTargetType(context, this.type, this.mutable);
            if(!target)
                context.problemListener.reportInvalidCast(this, this.type, value.type);
            if(!value.type.equals(target!)) {
                if (value instanceof IntegerValue && target == DecimalType.instance) {
                    value = new DecimalValue(value.DecimalValue());
                } else if (value instanceof DecimalValue && target == IntegerType.instance) {
                    value = new IntegerValue(value.IntegerValue());
                } else if (value.type.isAssignableFrom(context, target!)) {
                    value.type = target!;
                } else if (!target!.isAssignableFrom(context, value.type))
                    context.problemListener.reportInvalidCast(this, this.type, value.type);
            }
        }
        return value;
    }

    declare(transpiler: Transpiler): void {
        this.expression.declare(transpiler);
        const target = getTargetType(transpiler.context, this.type, this.mutable);
        if(target)
            target.declare(transpiler);
    }

    transpile(transpiler: Transpiler): void {
        const expType = this.expression.check(transpiler.context);
        if(expType==DecimalType.instance && this.type==IntegerType.instance) {
            transpiler.append("Math.floor(");
            this.expression.transpile(transpiler);
            transpiler.append(")");
        } else
            this.expression.transpile(transpiler);
    }

    toDialect(writer: CodeWriter): void {
        writer.toDialect(this);
    }

    toEDialect(writer: CodeWriter): void {
        this.expression.toDialect(writer);
        writer.append(" as ");
        if(this.mutable)
            writer.append("mutable ");
        this.type.toDialect(writer);
    }

    toMDialect(writer: CodeWriter): void {
        this.toEDialect(writer);
    }

    toODialect(writer: CodeWriter): void {
        writer.append("(");
        if(this.mutable)
            writer.append("mutable ");
        this.type.toDialect(writer);
        writer.append(")");
        this.expression.toDialect(writer);
    }
}
