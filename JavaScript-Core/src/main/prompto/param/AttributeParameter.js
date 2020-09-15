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
        const actual = context.getRegisteredDeclaration(this.name);
        if(actual==null)
            throw new SyntaxError("Unknown attribute: \"" + this.name + "\"");
    }

    getType(context) {
        const named = context.getRegisteredDeclaration(this.name);
        return named.getType(context);
    }

    checkValue(context, value) {
        const actual = context.getRegisteredDeclaration(this.name);
        return actual.checkValue(context,value);
    }

    declare(transpiler) {
        const decl = transpiler.context.getRegisteredDeclaration(this.name);
        decl.declare(transpiler);
    }

    transpileCall(transpiler, expression) {
        const decl = transpiler.context.getRegisteredDeclaration(this.name);
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
