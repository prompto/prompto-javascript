import Literal from './Literal';
import { DocEntryList } from './index';
import { DocumentValue, IValue } from '../value';
import { IType } from '../type';
import { CodeWriter } from "../utils";
import { Context, Transpiler } from "../runtime";
export default class DocumentLiteral extends Literal<DocumentValue> {
    entries: DocEntryList;
    itemType?: IType;
    constructor(entries: DocEntryList | null);
    toDialect(writer: CodeWriter): void;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
    check(context: Context): IType;
    interpretExpression(context: Context): IValue;
    interpretPromotion(item: IValue): IValue;
}
