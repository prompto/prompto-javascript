import BuiltInMethodDeclaration from '../declaration/BuiltInMethodDeclaration'
import {SetType, IType} from '../type'
import { StrictSet } from "../intrinsic"
import {SetValue, IValue} from "../value";
import {Context, Transpiler} from "../runtime";
import {ArgumentList} from "../grammar";

export default class ToSetMethodDeclaration<T extends IValue> extends BuiltInMethodDeclaration<T> {

    itemType: IType;
    reader: (value: T) => SetValue;

    constructor(itemType: IType, reader: (value: T) => SetValue ) {
        super("toSet");
        this.itemType = itemType;
        this.reader = reader;
    }

    interpret(context: Context): SetValue {
        const value = this.getValue(context);
        return this.reader(value);
    }

    check(context: Context): IType {
        return new SetType(this.itemType);
    }

    declareCall(transpiler: Transpiler): void {
        transpiler.require(StrictSet);
    }

    transpileCall(transpiler: Transpiler, args: ArgumentList): void {
        transpiler.append("toSet()");
    }
}
