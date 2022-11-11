import BaseExpression from './BaseExpression';
import { IValue } from '../value';
import { IType } from '../type';
import { IExpression } from "./index";
import { CodeWriter } from "../utils";
import { Context, Transpiler } from "../runtime";
export default class ReadBlobExpression extends BaseExpression {
    resource: IExpression;
    constructor(resource: IExpression);
    toString(): string;
    toDialect(writer: CodeWriter): void;
    check(context: Context): IType;
    interpretExpression(context: Context): IValue;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
}
