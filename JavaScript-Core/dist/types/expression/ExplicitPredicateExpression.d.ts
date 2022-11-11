import PredicateExpression from './PredicateExpression';
import { ArrowExpression } from '../expression';
import { Identifier } from "../grammar";
import { Context } from "../runtime";
import { IValue } from "../value";
import { CodeWriter } from "../utils";
import IExpression from "../expression/IExpression";
import { IType } from "../type";
export default class ExplicitPredicateExpression extends PredicateExpression {
    itemId: Identifier;
    predicate: IExpression;
    constructor(itemId: Identifier, predicate: IExpression);
    toArrowExpression(): ArrowExpression;
    toString(): string;
    filteredToDialect(writer: CodeWriter, source: IExpression): void;
    containsToDialect(writer: CodeWriter): void;
    checkFilter(context: Context, itemType: IType): IType;
    interpretExpression(context: Context): IValue;
}
