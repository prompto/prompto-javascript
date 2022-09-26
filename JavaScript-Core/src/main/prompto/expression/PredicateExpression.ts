import {Section} from "../parser";
import {CodeWriter} from "../utils";
import {ArrowExpression} from "./index";
import Predicate from "./Predicate";
import {Context, Transpiler} from "../runtime";

export default abstract class PredicateExpression extends Section implements Predicate {
    abstract containsToDialect(writer: CodeWriter): void;
    abstract toArrowExpression(): ArrowExpression;

    isPredicate(): boolean {
        return true;
    }
    abstract checkQuery(context: Context): void
    abstract declareQuery(transpiler: Transpiler): void;

}
