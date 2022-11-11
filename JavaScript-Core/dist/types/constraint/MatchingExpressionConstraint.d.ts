import { Context, Transpiler } from '../runtime';
import { IType } from '../type';
import IConstraint from "./IConstraint";
import { IExpression } from "../expression";
import { IValue } from "../value";
import { CodeWriter } from "../utils";
export default class MatchingExpressionConstraint implements IConstraint {
    expression: IExpression;
    transpiler: (transpiler: Transpiler) => void;
    constructor(expression: IExpression);
    checkValue(context: Context, value: IValue): void;
    toDialect(writer: CodeWriter): void;
    declare(transpiler: Transpiler): void;
    declareChecker(transpiler: Transpiler, name: string, type: IType): void;
    transpile(transpiler: Transpiler): void;
    transpileChecker(transpiler: Transpiler, name: string, type: IType): void;
}
