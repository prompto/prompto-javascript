import BuiltInMethodDeclaration from '../declaration/BuiltInMethodDeclaration';
import {ListType, IType} from '../type';
import { List } from "../intrinsic";
import { IValue, ListValue } from "../value";
import {Context, Transpiler} from "../runtime";

export default class ToListMethodDeclaration<T extends IValue> extends BuiltInMethodDeclaration<T> {

    itemType: IType;
    reader: (value: T) => ListValue;

    constructor(itemType: IType, reader: (value: T) => ListValue) {
        super("toList");
        this.itemType = itemType;
        this.reader = reader;
    }

    interpret(context: Context): ListValue {
        const value = this.getValue(context);
        return this.reader(value);
    }

    check(context: Context): IType {
        return new ListType(this.itemType);
    }

    declareCall(transpiler: Transpiler): void {
        transpiler.require(List);
    }

    transpileCall(transpiler: Transpiler, args: ArgumentList): void {
        transpiler.append("toList()");
    }
}
