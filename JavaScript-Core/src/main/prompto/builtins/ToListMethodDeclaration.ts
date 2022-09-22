import BuiltInMethodDeclaration from '../declaration/BuiltInMethodDeclaration';
import {ListType, Type} from '../type';
import { List } from "../intrinsic";
import { Value, ListValue } from "../value";
import {Context, Transpiler} from "../runtime";

export default class ToListMethodDeclaration<T extends Value> extends BuiltInMethodDeclaration<T> {

    itemType: Type;
    reader: (value: T) => ListValue;

    constructor(itemType: Type, reader: (value: T) => ListValue) {
        super("toList");
        this.itemType = itemType;
        this.reader = reader;
    }

    interpret(context: Context): ListValue {
        const value = this.getValue(context);
        return this.reader(value);
    }

    check(context: Context): Type {
        return new ListType(this.itemType);
    }

    declareCall(transpiler: Transpiler): void {
        transpiler.require(List);
    }

    transpileCall(transpiler: Transpiler, args: ArgumentList): void {
        transpiler.append("toList()");
    }
}
