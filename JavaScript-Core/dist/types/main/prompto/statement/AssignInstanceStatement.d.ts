import SimpleStatement from './SimpleStatement';
import { IType } from '../type';
import { CodeWriter } from "../utils";
import { Context, Transpiler } from "../runtime";
import { IValue } from "../value";
import { IExpression } from "../expression";
import IAssignableInstance from "../instance/IAssignableInstance";
export default class AssignInstanceStatement extends SimpleStatement {
    instance: IAssignableInstance;
    expression: IExpression;
    constructor(instance: IAssignableInstance, expression: IExpression);
    toDialect(writer: CodeWriter): void;
    toString(): string;
    check(context: Context): IType;
    interpretStatement(context: Context): IValue | null;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
}
