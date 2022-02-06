import { Variable } from '../runtime/index.js'
import { VoidType, CategoryType, DocumentType, CodeType } from '../type/index.js'

export default class VariableInstance {
  
    constructor(id) {
        this.id = id;
    }

    get name() {
        return this.id.name;
    }

    toDialect(writer, expression) {
        if(expression!=null) try {
            const type = expression.check(writer.context);
            const actual = writer.context.getRegisteredValue(this.id);
            if(actual==null)
                writer.context.registerValue(new Variable(this.id, type));
        } catch(e) {
            // console.log(e.stack);
            // TODO warning
        }
        writer.append(this.name);
    }

    toString() {
        return this.name;
    }

    check(context) {
        const actual = context.getRegisteredValue(this.id);
        return actual.type;
    }

    checkAssignValue(context, valueType, section) {
        const actual = context.getRegisteredValue(this.id);
        if(actual==null) {
            context.registerValue(new Variable(this.id, valueType));
            return valueType;
        } else {
            // need to check type compatibility
            const type = actual.getType(context);
            type.checkAssignableFrom(context, section, valueType);
            return type;
        }
    }

    checkAssignMember(context, id, valueType, section) {
        const actual = context.getRegisteredValue(this.id);
        if(actual==null) {
            context.problemListener.reportUnknownVariable(section, this.id.name);
            return VoidType.instance;
        }
        const thisType = actual.getType(context);
        if(thisType === DocumentType.instance)
            return valueType;
        else {
            if(thisType instanceof CategoryType && !thisType.mutable)
                context.problemListener.reportNotMutable(section, this.name);
            const requiredType = thisType.checkMember(context, section, id);
            if (requiredType && !requiredType.isAssignableFrom(context, valueType))
                context.problemListener.reportIncompatibleTypes(section, requiredType, valueType);
            return valueType;
        }
    }

    checkAssignItem(context, itemType, valueType, section) {
        const actual = context.getRegisteredValue(this.id);
        if(actual==null) {
            context.problemListener.reportUnknownVariable(section, this.name);
            return VoidType.instance;
        }
        const parentType = actual.getType(context);
        return parentType.checkItem(context, itemType, section);
    }

    assign(context, expression) {
        const value = expression.interpret(context);
        if(context.getRegisteredValue(this.id)==null) {
            const type = expression.check(context);
            context.registerValue(new Variable(this.id, type));
        }
        context.setValue(this.id, value);
    }

    interpret(context) {
        return context.getValue(this.id);
    }

    declareAssign(transpiler, expression) {
        if(transpiler.context.getRegisteredValue(this.id)==null) {
            const valueType = expression.check(transpiler.context);
            transpiler.context.registerValue(new Variable(this.id, valueType));
            // Code expressions need to be interpreted as part of full check
            if (valueType === CodeType.instance) {
                transpiler.context.setValue(this.id, expression.interpret(transpiler.context));
            }

        }
        expression.declare(transpiler);
    }

    transpileAssign(transpiler, expression) {
        if(transpiler.context.getRegisteredValue(this.id)==null) {
            const type = expression.check(transpiler.context);
            transpiler.context.registerValue(new Variable(this.id, type));
            transpiler.append("var ");
        }
        const context = transpiler.context.contextForValue(this.id);
        if(context.instanceType) {
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

    transpileAssignParent(transpiler) {
        const context = transpiler.context.contextForValue(this.id);
        if(context.instanceType) {
            context.instanceType.transpileInstance(transpiler);
            transpiler.append(".");
        }
        transpiler.append(this.name);
    }

    declare(transpiler) {
        // nothing to do
    }

    transpile(transpiler) {
        transpiler.append(this.name);
    }
}
