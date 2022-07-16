import Parameter from './Parameter.js'
import { SyntaxError } from '../error/index.js'

export default class AttributeParameter extends Parameter {

    constructor(id) {
        super(id);
    }

    toString() {
        return this.id.name;
    }

    getProto() {
        return this.id.name;
    }

    getSignature(dialect) {
        return this.id.name;
    }

    getTranspiledName(context) {
        return this.id.name;
    }

    register(context) {
        context.registerValue(this, true);
        if(this.defaultExpression!=null) try {
            context.setValue(this.id, this.defaultExpression.interpret(context));
        } catch(error) {
            throw new SyntaxError("Unable to register default value: "+ this.defaultExpression.toString() + " for argument: " + this.name);
        }
    }

    check(context) {
        const actual = context.getRegisteredDeclaration(this.id);
        if(actual==null)
            context.problemListener.reportUnknownAttribute(this, this.name);
        return actual ? actual.getType(context) : null;
    }

    getType(context) {
        const named = context.getRegisteredDeclaration(this.id);
        return named.getType(context);
    }

    checkValue(context, value) {
        const actual = context.getRegisteredDeclaration(this.id);
        return actual.checkValue(context,value);
    }

    declare(transpiler) {
        const decl = transpiler.context.getRegisteredDeclaration(this.id);
        decl.declare(transpiler);
    }

    transpileCall(transpiler, expression) {
        const decl = transpiler.context.getRegisteredDeclaration(this.id);
        if(decl.constraint) {
            transpiler.append("$check_").append(this.name).append("(");
            super.transpileCall(transpiler, expression);
            transpiler.append(")");
        } else
            super.transpileCall(transpiler, expression);
    }

    equals(other) {
        return other === this || (other instanceof AttributeParameter && this.name === other.name);
    }
}
