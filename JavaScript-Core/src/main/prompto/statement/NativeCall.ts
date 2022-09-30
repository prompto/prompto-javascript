import SimpleStatement from './SimpleStatement'
import {IValue} from "../value";
import {IType} from "../type";
import {Context} from "../runtime";

export default abstract class NativeCall extends SimpleStatement {

    interpret(context: Context): IValue | null {
        throw new Error("Should never get there!");
    }

    abstract interpretNative(context: Context, returnType: IType): IValue | null;

}

