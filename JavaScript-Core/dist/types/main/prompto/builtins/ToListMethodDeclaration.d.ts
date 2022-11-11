import BuiltInMethodDeclaration from '../declaration/BuiltInMethodDeclaration';
import { IType } from '../type';
import { IValue, ListValue } from "../value";
import { Context, Transpiler } from "../runtime";
import { ArgumentList } from "../grammar";
export default class ToListMethodDeclaration<T extends IValue> extends BuiltInMethodDeclaration<T> {
    itemType: IType;
    reader: (value: T) => ListValue;
    constructor(itemType: IType, reader: (value: T) => ListValue);
    interpret(context: Context): ListValue;
    check(context: Context): IType;
    declareCall(transpiler: Transpiler): void;
    transpileCall(transpiler: Transpiler, args: ArgumentList): void;
}
