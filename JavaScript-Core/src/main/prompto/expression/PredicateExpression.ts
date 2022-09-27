import {Section} from "../parser";
import {CodeWriter} from "../utils";
import {ArrowExpression, IExpression} from "./index";
import {Context} from "../runtime";
import {IType} from "../type";

export default abstract class PredicateExpression extends Section {
    abstract toArrowExpression(): ArrowExpression;
    abstract checkFilter(context: Context, itemType: IType): IType;
    abstract filteredToDialect(writer: CodeWriter, source: IExpression): void;
    abstract containsToDialect(writer: CodeWriter): void;
}
