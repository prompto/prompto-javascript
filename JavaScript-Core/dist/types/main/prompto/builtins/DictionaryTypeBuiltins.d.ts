import BuiltInMethodDeclaration from '../declaration/BuiltInMethodDeclaration';
import { IType } from '../type';
import { ArgumentList } from "../grammar";
import { Context, Transpiler } from "../runtime";
import { DictionaryValue, IValue } from "../value";
export declare class SwapMethodDeclaration extends BuiltInMethodDeclaration<DictionaryValue> {
    constructor();
    interpret(context: Context): IValue;
    check(context: Context): IType;
    transpileCall(transpiler: Transpiler, args: ArgumentList): void;
}
export declare class RemoveKeyMethodDeclaration extends BuiltInMethodDeclaration<DictionaryValue> {
    constructor();
    interpret(context: Context): IValue | null;
    check(context: Context): IType;
    transpileCall(transpiler: Transpiler, args: ArgumentList): void;
}
export declare class RemoveValueMethodDeclaration extends BuiltInMethodDeclaration<DictionaryValue> {
    constructor();
    interpret(context: Context): IValue | null;
    check(context: Context): IType;
    transpileCall(transpiler: Transpiler, args: ArgumentList): void;
}
