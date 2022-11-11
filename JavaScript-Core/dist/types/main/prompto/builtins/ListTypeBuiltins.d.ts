import BuiltInMethodDeclaration from '../declaration/BuiltInMethodDeclaration';
import { IType } from "../type";
import { ArgumentList } from "../grammar";
import { Context, Transpiler } from "../runtime";
import { ListValue, IValue } from "../value";
export declare class IndexOfMethodDeclaration extends BuiltInMethodDeclaration<ListValue> {
    constructor();
    interpret(context: Context): IValue;
    check(context: Context): IType;
    transpileCall(transpiler: Transpiler, args: ArgumentList): void;
}
export declare class RemoveItemMethodDeclaration extends BuiltInMethodDeclaration<ListValue> {
    constructor();
    interpret(context: Context): IValue | null;
    check(context: Context): IType;
    transpileCall(transpiler: Transpiler, args: ArgumentList): void;
}
export declare class RemoveValueMethodDeclaration extends BuiltInMethodDeclaration<ListValue> {
    constructor();
    interpret(context: Context): IValue | null;
    check(context: Context): IType;
    transpileCall(transpiler: Transpiler, args: ArgumentList): void;
}
export declare class AddValueMethodDeclaration extends BuiltInMethodDeclaration<ListValue> {
    constructor();
    interpret(context: Context): IValue | null;
    check(context: Context): IType;
    transpileCall(transpiler: Transpiler, args: ArgumentList): void;
}
export declare class InsertValueMethodDeclaration extends BuiltInMethodDeclaration<ListValue> {
    constructor();
    interpret(context: Context): IValue | null;
    check(context: Context): IType;
    transpileCall(transpiler: Transpiler, args: ArgumentList): void;
}
