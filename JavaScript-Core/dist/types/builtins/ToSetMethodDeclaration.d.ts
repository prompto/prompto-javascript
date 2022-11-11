import BuiltInMethodDeclaration from '../declaration/BuiltInMethodDeclaration';
import { IType } from '../type';
import { SetValue, IValue } from "../value";
import { Context, Transpiler } from "../runtime";
import { ArgumentList } from "../grammar";
export default class ToSetMethodDeclaration<T extends IValue> extends BuiltInMethodDeclaration<T> {
    itemType: IType;
    reader: (value: T) => SetValue;
    constructor(itemType: IType, reader: (value: T) => SetValue);
    interpret(context: Context): SetValue;
    check(context: Context): IType;
    declareCall(transpiler: Transpiler): void;
    transpileCall(transpiler: Transpiler, args: ArgumentList): void;
}
