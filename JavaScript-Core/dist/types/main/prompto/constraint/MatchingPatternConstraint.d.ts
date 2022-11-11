import { Context, Transpiler } from '../runtime';
import IConstraint from "./IConstraint";
import { IExpression } from "../expression";
import { IValue } from "../value";
import { CodeWriter } from "../utils";
import { IType } from "../type";
import { ITranspilable } from "../runtime";
export default class MatchingPatternConstraint implements IConstraint, ITranspilable {
    expression: IExpression;
    pattern?: RegExp;
    transpiler: (transpiler: Transpiler) => void;
    constructor(expression: IExpression);
    checkValue(context: Context, value: IValue): void;
    toDialect(writer: CodeWriter): void;
    declare(transpiler: Transpiler): void;
    declareChecker(transpiler: Transpiler, name: string, type: IType): void;
    transpile(transpiler: Transpiler): void;
    transpileChecker(transpiler: Transpiler, name: string, type: IType): void;
}
