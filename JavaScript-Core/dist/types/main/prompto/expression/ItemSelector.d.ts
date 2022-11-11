import SelectorBase from './SelectorBase';
import { IValue } from '../value';
import { IExpression } from "./index";
import { CodeWriter } from "../utils";
import { Context, Transpiler } from "../runtime";
import { IType } from "../type";
export default class ItemSelector extends SelectorBase {
    item: IExpression;
    constructor(parent: IExpression | undefined, item: IExpression);
    toString(): string;
    toDialect(writer: CodeWriter): void;
    check(context: Context): IType;
    interpretExpression(context: Context): IValue;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
}
