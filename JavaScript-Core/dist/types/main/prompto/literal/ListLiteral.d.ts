import ContainerLiteral from "./ContainerLiteral";
import { IType } from '../type';
import { ListValue, IValue } from '../value';
import { ExpressionList } from '../expression';
import { CodeWriter } from '../utils';
import { Context, Transpiler } from "../runtime";
export default class ListLiteral extends ContainerLiteral<ListValue> {
    type?: IType;
    constructor(mutable: boolean, expressions: ExpressionList | null);
    check(context: Context): IType;
    interpretExpression(context: Context): IValue;
    interpretPromotion(item: IValue): IValue;
    toDialect(writer: CodeWriter): void;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
}
