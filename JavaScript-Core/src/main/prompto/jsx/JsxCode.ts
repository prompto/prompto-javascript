import {IType, JsxType} from '../type'
import {Context, Transpiler} from "../runtime";
import {IExpression} from "../expression";
import {CodeWriter} from "../utils";
import IJsxExpression from "./IJsxExpression";

export default class JsxCode implements IJsxExpression {

    expression: IExpression;
    suite: string;

    constructor(expression: IExpression, suite: string) {
        this.expression = expression;
        this.suite = suite;
    }

    check(context: Context): IType {
        this.expression.check(context);
        return JsxType.instance;
    }

    toDialect(writer: CodeWriter): void {
        writer.append("{");
        this.expression.toDialect(writer);
        writer.append("}");
        if(this.suite!=null)
            writer.appendRaw(this.suite);
    }

    declare(transpiler: Transpiler): void {
        this.expression.declare(transpiler);
    }

    transpile(transpiler: Transpiler): void {
        const type = this.expression.check(transpiler.context);
        type.transpileJsxCode(transpiler, this.expression);
    }
}
