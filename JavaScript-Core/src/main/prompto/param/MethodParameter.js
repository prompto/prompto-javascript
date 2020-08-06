const Parameter = require("./Parameter").Parameter;
const MethodType = require("../type/MethodType").MethodType;
const ContextualExpression = require("../value/ContextualExpression").ContextualExpression;
const ArrowExpression = require("../expression/ArrowExpression").ArrowExpression;
const ArrowValue = require("../value/ArrowValue").ArrowValue;

class MethodParameter extends Parameter {
    constructor(id) {
        super(id);
        return this;
    }

    getSignature(dialect) {
        return this.name;
    }

    toString() {
        return this.name;
    }

    getProto() {
        return this.name;
    }

    register(context) {
        const actual = context.getRegisteredValue(this.name);
        if(actual!=null) {
            throw new SyntaxError("Duplicate argument: \"" + this.name + "\"");
        }
        context.registerValue(this);
    }

    check(context) {
        const actual = context.getRegisteredDeclaration(this.name);
        if(actual==null) {
            throw new SyntaxError("Unknown method: \"" + this.name + "\"");
        }
    }

    checkValue(context, expression) {
        const isArrow = expression instanceof ContextualExpression && expression.expression instanceof ArrowExpression;
        return isArrow ? this.checkArrowValue(context, expression) : Parameter.prototype.checkValue.call(this, context, expression);
    }

    checkArrowValue(context, expression) {
        return new ArrowValue(this.getDeclaration(context), expression.calling, expression.expression); // TODO check
    }

    getType(context) {
        const method = this.getDeclaration(context);
        return new MethodType(method);
    }

    getDeclaration(context) {
        const methods = context.getRegisteredDeclaration(this.name);
        if (methods)
            return methods.getFirst();
        else
            return null;
    }

    declare(transpiler) {
        // nothing to do ?
    }

    getTranspiledName(context) {
        const method = this.getDeclaration(context);
        return method.getTranspiledName(context);
    }

    transpileCall(transpiler, expression) {
        if(!this.transpileArrowExpressionCall(transpiler, expression))
            expression.transpile(transpiler);
    }

    transpileArrowExpressionCall(transpiler, expression) {
        if(!(expression instanceof ContextualExpression) || !(expression.expression instanceof ArrowExpression))
            return false;
        const target = this.getType(transpiler.context);
        target.transpileArrowExpression(transpiler, expression.expression);
        return true;
    }

    equals(other) {
        return other === this || (other instanceof MethodParameter && this.name === other.name);
    }
}


exports.MethodParameter = MethodParameter;
