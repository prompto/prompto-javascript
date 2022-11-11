import BaseValue from './BaseValue';
import { IType } from '../type';
import { CodeExpression } from "../expression";
import { Context, Transpiler } from "../runtime";
import IValue from "../value/IValue";
export default class CodeValue extends BaseValue<CodeExpression> {
    constructor(expression: CodeExpression);
    check(context: Context): IType;
    interpret(context: Context): IValue;
    declareCode(transpiler: Transpiler): void;
    transpileCode(transpiler: Transpiler): void;
}
