import { IType } from '../type';
import { Context, Transpiler } from "../runtime";
import { CodeWriter } from "../utils";
import IJsxExpression from "./IJsxExpression";
import { Section } from "../parser";
export default class JsxText extends Section implements IJsxExpression {
    text: string;
    constructor(text: string);
    check(context: Context): IType;
    toDialect(writer: CodeWriter): void;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
}
