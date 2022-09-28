import {ArrowExpression, IExpression} from '../expression'
import { Literal } from '../literal'
import {IType, MethodType, VoidType} from '../type'
import {Context, Transpiler} from "../runtime";
import {CodeWriter} from "../utils";
import IJsxExpression from "./IJsxExpression";
import IJsxValue from "./IJsxValue";

export default class JsxExpression implements IJsxExpression, IJsxValue {

    expression: IExpression;

    constructor(expression: IExpression) {
        this.expression = expression;
    }

    check(context: Context): IType {
        return this.expression ? this.expression.check(context) : VoidType.instance;
    }

    checkProto(context: Context, proto: MethodType) {
        if(this.expression instanceof ArrowExpression)
            return proto.checkArrowExpression(context, this.expression);
        else if(this.expression)
            return this.expression.check(context);
        else
            return VoidType.instance;
    }

    declareProto(transpiler: Transpiler, proto: MethodType) {
        if(this.expression instanceof ArrowExpression)
            return proto.declareArrowExpression(transpiler, this.expression);
        else if(this.expression)
            return this.expression.declare(transpiler);
    }

    transpileProto(transpiler: Transpiler, proto: MethodType) {
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
