import SimpleStatement from './SimpleStatement';
import { IValue } from "../value";
import { IType } from "../type";
import { Context } from "../runtime";
export default abstract class NativeCall extends SimpleStatement {
    interpretStatement(context: Context): IValue | null;
    check(context: Context): IType;
    interpretNative(context: Context, returnType: IType): void;
}
