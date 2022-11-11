import BuiltInMethodDeclaration from '../declaration/BuiltInMethodDeclaration';
import { IType } from '../type';
import { ListValue, SetValue, TupleValue, IValue } from '../value';
import { ArgumentList } from '../grammar';
import { Context, Transpiler } from "../runtime";
declare abstract class BaseJoinMethodDeclaration<T extends IValue> extends BuiltInMethodDeclaration<T> {
    constructor();
    interpret(context: Context): IValue;
    check(context: Context): IType;
    transpileCall(transpiler: Transpiler, args: ArgumentList): void;
    getItems(context: Context): Array<IValue>;
}
export declare class JoinListMethodDeclaration extends BaseJoinMethodDeclaration<ListValue> {
}
export declare class JoinSetMethodDeclaration extends BaseJoinMethodDeclaration<SetValue> {
}
export declare class JoinTupleMethodDeclaration extends BaseJoinMethodDeclaration<TupleValue> {
}
export {};
