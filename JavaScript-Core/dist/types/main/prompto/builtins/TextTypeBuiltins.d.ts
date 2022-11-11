import BuiltInMethodDeclaration from '../declaration/BuiltInMethodDeclaration';
import { IType } from '../type';
import { TextValue, IValue } from '../value';
import { ArgumentList } from '../grammar';
import { Context, Transpiler } from "../runtime";
export declare class ToLowerCaseMethodDeclaration extends BuiltInMethodDeclaration<TextValue> {
    constructor();
    interpret(context: Context): IValue;
    check(context: Context): IType;
    transpileCall(transpiler: Transpiler, args: ArgumentList): void;
}
export declare class ToUpperCaseMethodDeclaration extends BuiltInMethodDeclaration<TextValue> {
    constructor();
    interpret(context: Context): IValue;
    check(context: Context): IType;
    transpileCall(transpiler: Transpiler, args: ArgumentList): void;
}
export declare class TrimMethodDeclaration extends BuiltInMethodDeclaration<TextValue> {
    constructor();
    interpret(context: Context): IValue;
    check(context: Context): IType;
    transpileCall(transpiler: Transpiler, args: ArgumentList): void;
}
export declare class ToCapitalizedMethodDeclaration extends BuiltInMethodDeclaration<TextValue> {
    constructor();
    interpret(context: Context): IValue;
    transpileCall(transpiler: Transpiler, args: ArgumentList): void;
    check(context: Context): IType;
}
export declare class SplitMethodDeclaration extends BuiltInMethodDeclaration<TextValue> {
    constructor();
    interpret(context: Context): IValue;
    check(context: Context): IType;
    declareCall(transpiler: Transpiler): void;
    transpileCall(transpiler: Transpiler, args: ArgumentList): void;
}
export declare class StartsWithMethodDeclaration extends BuiltInMethodDeclaration<TextValue> {
    constructor();
    interpret(context: Context): IValue;
    check(context: Context): IType;
    transpileCall(transpiler: Transpiler, args: ArgumentList): void;
}
export declare class EndsWithMethodDeclaration extends BuiltInMethodDeclaration<TextValue> {
    constructor();
    interpret(context: Context): IValue;
    check(context: Context): IType;
    transpileCall(transpiler: Transpiler, args: ArgumentList): void;
}
export declare class ReplaceMethodDeclaration extends BuiltInMethodDeclaration<TextValue> {
    constructor();
    interpret(context: Context): IValue;
    check(context: Context): IType;
    transpileCall(transpiler: Transpiler, args: ArgumentList): void;
}
export declare class ReplaceAllMethodDeclaration extends BuiltInMethodDeclaration<TextValue> {
    constructor();
    interpret(context: Context): IValue;
    check(context: Context): IType;
    transpileCall(transpiler: Transpiler, args: ArgumentList): void;
}
export declare class IndexOfMethodDeclaration extends BuiltInMethodDeclaration<TextValue> {
    constructor();
    interpret(context: Context): IValue;
    check(context: Context): IType;
    transpileCall(transpiler: Transpiler, args: ArgumentList): void;
}
