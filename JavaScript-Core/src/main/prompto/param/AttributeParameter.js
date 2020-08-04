var Parameter = require("./Parameter").Parameter;

class AttributeParameter extends Parameter {
    constructor(id) {
        super(id);
        return this;
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
        var actual = context.getRegisteredDeclaration(this.name);
        if(actual==null)
            throw new SyntaxError("Unknown attribute: \"" + this.name + "\"");
    }

    getType(context) {
        var named = context.getRegisteredDeclaration(this.name);
        return named.getType(context);
    }

    checkValue(context, value) {
        var actual = context.getRegisteredDeclaration(this.name);
        return actual.checkValue(context,value);
    }

    declare(transpiler) {
        var decl = transpiler.context.getRegisteredDeclaration(this.name);
        decl.declare(transpiler);
    }

    transpileCall(transpiler, expression) {
        var decl = transpiler.context.getRegisteredDeclaration(this.name);
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

exports.AttributeParameter = AttributeParameter;