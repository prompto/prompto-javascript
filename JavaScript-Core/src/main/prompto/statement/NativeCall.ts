import SimpleStatement from './SimpleStatement'
import {IValue} from "../value";
import {IType, VoidType} from "../type";
import {Context} from "../runtime";

export default abstract class NativeCall extends SimpleStatement {

    interpret(context: Context): IValue | null {
        throw new Error("Should never get there!");
    }

    check(context: Context): IType {
        return VoidType.instance;
    }

    interpretNative(context: Context, returnType: IType) {
        throw new Error("Should never get there!");
    }


}

