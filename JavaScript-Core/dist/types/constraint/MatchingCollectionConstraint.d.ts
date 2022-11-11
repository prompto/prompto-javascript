import { Context, Transpiler } from '../runtime';
import IConstraint from "./IConstraint";
import { CodeWriter } from "../utils";
import { IExpression } from "../expression";
import { Container, IValue } from "../value";
import { IType } from "../type";
export default class MatchingCollectionConstraint implements IConstraint {
    collection: IExpression;
    container?: Container<never>;
    transpiler: (transpiler: Transpiler) => void;
    constructor(collection: IExpression);
    checkValue(context: Context, value: IValue): void;
    toDialect(writer: CodeWriter): void;
    declare(transpiler: Transpiler): void;
    declareChecker(transpiler: Transpiler, name: string, type: IType): void;
    transpile(transpiler: Transpiler): void;
    transpileChecker(transpiler: Transpiler, name: string, type: IType): void;
}
