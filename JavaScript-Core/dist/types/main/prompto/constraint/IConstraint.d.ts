import { IValue } from "../value";
import { Context, ITranspilable, Transpiler } from "../runtime";
import { CodeWriter } from "../utils";
import { IType } from "../type";
export default interface IConstraint extends ITranspilable {
    checkValue(context: Context, value: IValue): void;
    toDialect(writer: CodeWriter): void;
    declareChecker(transpiler: Transpiler, name: string, type: IType): void;
}
