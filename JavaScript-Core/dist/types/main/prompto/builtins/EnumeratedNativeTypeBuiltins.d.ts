import BuiltInMethodDeclaration from '../declaration/BuiltInMethodDeclaration';
import { IType } from '../type';
import { ArgumentList } from '../grammar';
import { Context, Transpiler } from "../runtime";
import { IValue } from "../value";
export declare class SymbolOfMethodDeclaration extends BuiltInMethodDeclaration<IValue> {
    enumType: IType;
    constructor(enumType: IType);
    check(context: Context): IType;
    interpret(context: Context): IValue;
    transpileCall(transpiler: Transpiler, args: ArgumentList): void;
}
