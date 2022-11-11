import SelectorBase from './SelectorBase';
import { IType } from '../type';
import { IValue } from '../value';
import { IExpression } from "./index";
import { CodeWriter } from "../utils";
import { Context, Transpiler } from "../runtime";
export default class SelectorExpression extends SelectorBase {
    first: IExpression | null;
    last: IExpression | null;
    constructor(parent: IExpression | null, first: IExpression | null, last: IExpression | null);
    toString(): string;
    toDialect(writer: CodeWriter): void;
    check(context: Context): IType;
    interpretExpression(context: Context): IValue;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
}
