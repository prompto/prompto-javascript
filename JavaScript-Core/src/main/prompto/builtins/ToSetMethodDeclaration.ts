import BuiltInMethodDeclaration from '../declaration/BuiltInMethodDeclaration'
import {SetType, Type} from '../type'
import { StrictSet } from "../intrinsic"
import {SetValue, Value} from "../value";
import {Context, Transpiler} from "../runtime";
import {ArgumentList} from "../grammar";

export default class ToSetMethodDeclaration<T extends Value> extends BuiltInMethodDeclaration<T> {

    itemType: Type;
    reader: (value: T) => SetValue;

    constructor(itemType: Type, reader: (value: T) => SetValue ) {
        super("toSet");
        this.itemType = itemType;
        this.reader = reader;
    }

    interpret(context: Context): SetValue {
        const value = this.getValue(context);
        return this.reader(value);
    }

    check(context: Context): Type {
        return new SetType(this.itemType);
    }

    declareCall(transpiler: Transpiler): void {
        transpiler.require(StrictSet);
    }

    transpileCall(transpiler: Transpiler, args: ArgumentList): void {
        transpiler.append("toSet()");
    }
}
