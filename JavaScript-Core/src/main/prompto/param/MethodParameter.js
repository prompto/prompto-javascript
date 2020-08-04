var Parameter = require("./Parameter").Parameter;
var MethodType = require("../type/MethodType").MethodType;
var ContextualExpression = require("../value/ContextualExpression").ContextualExpression;
var ArrowExpression = require("../expression/ArrowExpression").ArrowExpression;
var ArrowValue = require("../value/ArrowValue").ArrowValue;

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
        var actual = context.getRegisteredValue(this.name);
        if(actual!=null) {
            throw new SyntaxError("Duplicate argument: \"" + this.name + "\"");
        }
        context.registerValue(this);
    }

    check(context) {
        var actual = context.getRegisteredDeclaration(this.name);
        if(actual==null) {
            throw new SyntaxError("Unknown method: \"" + this.name + "\"");
        }
    }

    checkValue(context, expression) {
        var isArrow = expression instanceof ContextualExpression && expression.expression instanceof ArrowExpression;
        return isArrow ? this.checkArrowValue(context, expression) : Parameter.prototype.checkValue.call(this, context, expression);
    }

    checkArrowValue(context, expression) {
        return new ArrowValue(this.getDeclaration(context), expression.calling, expression.expression); // TODO check
    }

    getType(context) {
        var method = this.getDeclaration(context);
        return new MethodType(method);
    }

    getDeclaration(context) {
        var methods = context.getRegisteredDeclaration(this.name);
        if (methods)
            return methods.getFirst();
        else
            return null;
    }

    declare(transpiler) {
        // nothing to do ?
    }

    getTranspiledName(context) {
        var method = this.getDeclaration(context);
        return method.getTranspiledName(context);
    }

    transpileCall(transpiler, expression) {
        if(!this.transpileArrowExpressionCall(transpiler, expression))
            expression.transpile(transpiler);
    }

    transpileArrowExpressionCall(transpiler, expression) {
        if(!(expression instanceof ContextualExpression) || !(expression.expression instanceof ArrowExpression))
            return false;
        var target = this.getType(transpiler.context);
        target.transpileArrowExpression(transpiler, expression.expression);
        return true;
    }

    equals(other) {
        return other === this || (other instanceof MethodParameter && this.name === other.name);
    }
}


exports.MethodParameter = MethodParameter;
