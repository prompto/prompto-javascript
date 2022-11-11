import ContainerLiteral from './ContainerLiteral';
import { ExpressionList } from '../expression';
import { SetValue, IValue } from '../value';
import { IType } from '../type';
import { CodeWriter } from '../utils';
import { Context, Transpiler } from "../runtime";
export default class SetLiteral extends ContainerLiteral<SetValue> {
    type?: IType;
    constructor(expressions?: ExpressionList | null);
    check(context: Context): IType;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
    interpretExpression(context: Context): SetValue;
    interpretPromotion(item: IValue): IValue;
    toDialect(writer: CodeWriter): void;
}
