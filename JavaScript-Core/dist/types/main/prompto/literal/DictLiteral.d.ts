import Literal from './Literal';
import { DictEntryList } from './index';
import { DictionaryValue, IValue } from '../value';
import { IType } from '../type';
import { CodeWriter } from "../utils";
import { Context, Transpiler } from "../runtime";
export default class DictLiteral extends Literal<DictionaryValue> {
    mutable: boolean;
    entries: DictEntryList;
    itemType?: IType;
    constructor(mutable: boolean, entries: DictEntryList | null);
    toDialect(writer: CodeWriter): void;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
    check(context: Context): IType;
    inferElementType(context: Context): IType;
    interpretExpression(context: Context): IValue;
    interpretPromotion(item: IValue): IValue;
}
