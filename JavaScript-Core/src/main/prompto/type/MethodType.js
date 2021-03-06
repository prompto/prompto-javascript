import BaseType from './BaseType.js'
import { SyntaxError } from '../error/index.js'

export default class MethodType extends BaseType {
  
    constructor(method) {
        super(method.id);
        this.method = method;
   }

    equals(other) {
        return (other === this) ||
            ((other instanceof MethodType) && (this.method.getProto() === other.method.getProto()));
    }

    checkExists(context) {
        // TODO
    }

    checkUnique(context) {
        const actual = context.getRegisteredDeclaration(this.name);
        if (actual != null) {
            throw new SyntaxError("Duplicate name: \"" + this.name + "\"");
        }
    }

    isMoreSpecificThan(context, other) {
        return false;
    }

    checkArrowExpression(context, expression) {
        context = context.newChildContext();
        this.method.registerParameters(context);
        expression.check(context);
        return this;
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

    transpileMethodType(transpiler) {
        this.method.transpileMethodType(transpiler);
    }
}

