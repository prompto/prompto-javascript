import { IType } from '../type';
import { CodeWriter } from "../utils";
import { Context, Transpiler } from "../runtime";
import IJsxExpression from "./IJsxExpression";
import { Section } from "../parser";
export default class JsxFragment extends Section implements IJsxExpression {
    openingSuite: string;
    children?: IJsxExpression[];
    constructor(openingSuite: string);
    toDialect(writer: CodeWriter): void;
    check(context: Context): IType;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
}
