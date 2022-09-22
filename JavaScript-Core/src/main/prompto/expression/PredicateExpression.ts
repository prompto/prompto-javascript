import {Section} from "../parser";
import {CodeWriter} from "../utils";
import {ArrowExpression} from "./index";

export default abstract class PredicateExpression extends Section {
    abstract containsToDialect(writer: CodeWriter): void;
    abstract toArrowExpression(): ArrowExpression;
}
