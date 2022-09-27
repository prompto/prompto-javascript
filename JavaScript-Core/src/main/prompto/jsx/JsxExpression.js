import IJsxExpression from './IJsxExpression.ts'
import { ArrowExpression } from '../expression'
import { Literal } from '../literal'
import { VoidType } from '../type'

export default class JsxExpression extends IJsxExpression {

    constructor(expression) {
        super();
        this.expression = expression;
    }

    check(context: Context): IType {
        return this.expression ? this.expression.check(context) : VoidType.instance;
    }

    checkProto(context, proto) {
        if(this.expression instanceof ArrowExpression)
            return proto.checkArrowExpression(context, this.expression);
        else if(this.expression)
            return this.expression.check(context);
        else
            return VoidType.instance;
    }

    declareProto(transpiler, proto) {
        if(this.expression instanceof ArrowExpression)
            return proto.declareArrowExpression(transpiler, this.expression);
        else if(this.expression)
            return this.expression.declare(transpiler);
    }

    transpileProto(transpiler, proto) {
        if(this.expression instanceof ArrowExpression)
            return proto.transpileArrowExpression(transpiler, this.expression);
        else if(this.expression)
            return this.expression.transpile(transpiler);
    }

    isLiteral() {
        return this.expression instanceof Literal;
    }

    toString() {
        return this.expression ? this.expression.toString() : "";
    }

    toDialect(writer: CodeWriter): void {
        writer.append("{");
        if(this.expression)
            this.expression.toDialect(writer);
        writer.append("}");
    }

    declare(transpiler: Transpiler): void {
        if(this.expression)
            this.expression.declare(transpiler);
    }

    transpile(transpiler: Transpiler): void {
        if(this.expression)
            this.expression.transpile(transpiler);
    }
}
