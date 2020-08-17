
export default class JsxExpression extends IJsxExpression {

    constructor(expression) {
        super();
        this.expression = expression;
    }

    check(context) {
        return this.expression.check(context);
    }

    checkProto(context, proto) {
        if(this.expression instanceof ArrowExpression)
            return proto.checkArrowExpression(context, this.expression);
        else
            return this.expression.check(context);
    }

    declareProto(transpiler, proto) {
        if(this.expression instanceof ArrowExpression)
            return proto.declareArrowExpression(transpiler, this.expression);
        else
            return this.expression.declare(transpiler);
    }

    transpileProto(transpiler, proto) {
        if(this.expression instanceof ArrowExpression)
            return proto.transpileArrowExpression(transpiler, this.expression);
        else
            return this.expression.transpile(transpiler);
    }

    isLiteral() {
        return this.expression instanceof Literal;
    }

    toString() {
        return this.expression.toString();
    }

    toDialect(writer) {
        writer.append("{");
        this.expression.toDialect(writer);
        writer.append("}");
    }

    declare(transpiler) {
        this.expression.declare(transpiler);
    }

    transpile(transpiler) {
        this.expression.transpile(transpiler);
    }
}