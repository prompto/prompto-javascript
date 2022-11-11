import SimpleStatement from './SimpleStatement';
import { VoidType, IType } from '../type';
import { Context, Transpiler } from '../runtime';
import { Identifier } from "../grammar";
import { IExpression } from "../expression";
import { CodeWriter } from "../utils";
import { IValue } from "../value";
export default class AssignVariableStatement extends SimpleStatement {
    id: Identifier;
    expression: IExpression;
    constructor(id: Identifier, expression: IExpression);
    get name(): string;
    toDialect(writer: CodeWriter): void;
    checkResource(context: Context): VoidType;
    equals(obj: any): boolean;
    check(context: Context): IType;
    interpretStatement(context: Context): IValue | null;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
    transpileClose(transpiler: Transpiler): void;
}
