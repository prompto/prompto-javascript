var BaseType = require("./BaseType").BaseType;

class MethodType extends BaseType {
  
    constructor(method) {
        super(method.id);
        this.method = method;
   }

    equals(other) {
        return (other==this) ||
            ((other instanceof MethodType) && (this.method.getProto()==other.method.getProto()));
    }

    checkExists(context) {
        // TODO
    }

    checkUnique(context) {
        var actual = context.getRegisteredDeclaration(this.name);
        if (actual != null) {
            throw new SyntaxError("Duplicate name: \"" + this.name + "\"");
        }
    }

    isMoreSpecificThan(context, other) {
        return false;
    }

    checkArrowExpression(expression) {
        return this; // TODO check
    }

    declare(transpiler) {
        // nothing to do
    }

    declareArrowExpression(transpiler, expression) {
        transpiler = transpiler.newChildTranspiler(null);
        this.method.registerParameters(transpiler.context);
        expression.declare(transpiler);
    }

    transpileArrowExpression(transpiler, expression) {
        transpiler = transpiler.newChildTranspiler(null);
        transpiler.append("function(");
        this.method.parameters.transpile(transpiler);
        transpiler.append(") {");
        this.method.registerParameters(transpiler.context);
        expression.transpile(transpiler);
        transpiler.append("}");
        transpiler.flush();
    }
}

exports.MethodType = MethodType;
