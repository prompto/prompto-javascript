import BaseExpression from './BaseExpression';
import { Section } from '../parser';
import { IType } from '../type';
import { IValue } from '../value';
import { IExpression } from "./index";
import { CodeWriter } from "../utils";
import { Context, Transpiler } from "../runtime";
export default class TernaryExpression extends BaseExpression {
    condition: IExpression;
    ifTrue: IExpression;
    ifFalse: IExpression;
    constructor(condition: IExpression, ifTrue: IExpression, ifFalse: IExpression);
    toDialect(writer: CodeWriter): void;
    check(context: Context): IType;
    interpretExpression(context: Context): IValue;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
    asSection(): Section;
}
