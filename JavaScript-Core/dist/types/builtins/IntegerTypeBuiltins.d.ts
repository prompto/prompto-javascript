import BuiltInMethodDeclaration from '../declaration/BuiltInMethodDeclaration';
import { IType } from '../type';
import { IntegerValue, IValue } from '../value';
import { ArgumentList } from '../grammar';
import { Context, Transpiler } from "../runtime";
export declare class FormatMethodDeclaration extends BuiltInMethodDeclaration<IntegerValue> {
    constructor();
    interpret(context: Context): IValue;
    check(context: Context): IType;
    format(value: number, format: string): string;
    transpileCall(transpiler: Transpiler, args: ArgumentList): void;
}
