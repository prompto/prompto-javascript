import {Context, InstanceContext, Transpiler, Variable} from '../runtime'
import {VoidType, CategoryType, DocumentType, CodeType, IType} from '../type'
import {Identifier} from "../grammar";
import {CodeWriter} from "../utils";
import {Section} from "../parser";
import {IExpression} from "../expression";
import {IValue} from "../value";
import IAssignableInstance from "./IAssignableInstance";

export default class VariableInstance extends Section implements IAssignableInstance {

    id: Identifier;

    constructor(id: Identifier) {
        super();
        this.id = id;
    }

    get name() {
        return this.id.name;
    }

    toDialect(writer: CodeWriter, expression: IExpression) {
        if(expression!=null) try {
            const type = expression.check(writer.context);
            const actual = writer.context.getRegisteredInstance(this.id);
            if(!actual)
                writer.context.registerInstance(new Variable(this.id, type), true);
        } catch(e) {
            // console.log(e.stack);
            // TODO warning
        }
        writer.append(this.name);
    }

    toString() {
        return this.name;
    }

    check(context: Context): IType {
        const actual = context.getRegisteredInstance(this.id);
        return actual!.getType(context);
    }

    checkAssignValue(context: Context, section: Section, valueType: IType) {
        const actual = context.getRegisteredInstance(this.id);
        if(!actual) {
            context.registerInstance(new Variable(this.id, valueType), true);
            return valueType;
        } else {
            // need to check type compatibility
            const type = actual.getType(context);
            type.checkAssignableFrom(context, section, valueType);
            return type;
        }
    }

    checkAssignMember(context: Context, section: Section, member: Identifier, valueType: IType) {
        const actual = context.getRegisteredInstance(this.id);
        if(!actual) {
            context.problemListener.reportUnknownVariable(section, this.id.name);
            return VoidType.instance;
        }
        const thisType = actual.getType(context);
        if(thisType === DocumentType.instance)
            return valueType;
        else {
            if(thisType instanceof CategoryType && !thisType.mutable)
                context.problemListener.reportNotMutable(section, this.name);
            const requiredType = thisType.checkMember(context, section, member);
            if (requiredType && !requiredType.isAssignableFrom(context, valueType))
                context.problemListener.reportIncompatibleTypes(section, requiredType, valueType);
            return valueType;
        }
    }

    checkAssignItem(context: Context, section: Section, itemType: IType, valueType: IType) {
        const actual = context.getRegisteredInstance(this.id);
        if(!actual) {
            context.problemListener.reportUnknownVariable(section, this.name);
            return VoidType.instance;
        }
        const parentType = actual.getType(context);
        return parentType.checkItem(context, section, itemType);
    }

    assign(context: Context, expression: IExpression) {
        const value = expression.interpret(context);
        if(context.getRegisteredInstance(this.id)==null) {
            const type = expression.check(context);
            context.registerInstance(new Variable(this.id, type), true);
        }
        context.setValue(this.id, value);
    }

    interpret(context: Context): IValue {
        return context.getValue(this.id)!;
    }

    declareAssign(transpiler: Transpiler, expression: IExpression) {
        if(transpiler.context.getRegisteredInstance(this.id)==null) {
            const valueType = expression.check(transpiler.context);
            transpiler.context.registerInstance(new Variable(this.id, valueType), true);
            // Code expressions need to be interpreted as part of full check
            if (valueType === CodeType.instance) {
                transpiler.context.setValue(this.id, expression.interpret(transpiler.context));
            }

        }
        expression.declare(transpiler);
    }

    transpileAssign(transpiler: Transpiler, expression: IExpression) {
        if(transpiler.context.getRegisteredInstance(this.id)==null) {
            const type = expression.check(transpiler.context);
            transpiler.context.registerInstance(new Variable(this.id, type), true);
            transpiler.append("var ");
        }
        const context = transpiler.context.contextForValue(this.id);
        if(context instanceof InstanceContext && context.instanceType) {
            context.instanceType.transpileInstance(transpiler);
            transpiler.append(".setMember('").append(this.name).append("', ");
            expression.transpile(transpiler);
            transpiler.append(")");
        } else {
            transpiler.append(this.name);
            transpiler.append(" = ");
            expression.transpile(transpiler);
        }
    }

    transpileAssignParent(transpiler: Transpiler) {
        const context = transpiler.context.contextForValue(this.id);
        if(context instanceof InstanceContext && context.instanceType) {
            context.instanceType.transpileInstance(transpiler);
            transpiler.append(".");
        }
        transpiler.append(this.name);
    }

    declare(transpiler: Transpiler): void {
        // nothing to do
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append(this.name);
    }
}
