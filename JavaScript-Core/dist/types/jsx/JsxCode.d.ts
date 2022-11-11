import { IType } from '../type';
import { Context, Transpiler } from "../runtime";
import { IExpression } from "../expression";
import { CodeWriter } from "../utils";
import IJsxExpression from "./IJsxExpression";
export default class JsxCode implements IJsxExpression {
    expression: IExpression;
    suite?: string | null;
    constructor(expression: IExpression, suite?: string | null);
    check(context: Context): IType;
    toDialect(writer: CodeWriter): void;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
}
