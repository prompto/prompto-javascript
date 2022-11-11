import SimpleStatement from './SimpleStatement';
import { IType } from '../type';
import { Context, Transpiler } from '../runtime';
import { IValue } from '../value';
import { IdentifierList } from "../grammar";
import { IExpression } from "../expression";
import { CodeWriter } from "../utils";
export default class AssignTupleStatement extends SimpleStatement {
    ids: IdentifierList;
    expression: IExpression;
    constructor(ids: IdentifierList, expression: IExpression);
    check(context: Context): IType;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
    interpretStatement(context: Context): IValue | null;
    toDialect(writer: CodeWriter): void;
}
