import BaseExpression from './BaseExpression';
import { IType } from '../type';
import { IValue } from '../value';
import { IExpression } from "./index";
import { CodeWriter } from "../utils";
import { Context, Transpiler } from "../runtime";
import { Section } from "../parser";
export default class ReadOneExpression extends BaseExpression {
    resource: IExpression;
    constructor(resource: IExpression);
    toString(): string;
    toDialect(writer: CodeWriter): void;
    check(context: Context): IType;
    interpretExpression(context: Context): IValue;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
    asSection(): Section;
}
