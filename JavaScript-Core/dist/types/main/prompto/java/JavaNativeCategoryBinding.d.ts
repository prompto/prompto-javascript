import INativeCategoryBinding from '../grammar/INativeCategoryBinding';
import { CodeWriter } from "../utils";
import { JavaIdentifierExpression } from "./index";
export default class JavaNativeCategoryBinding implements INativeCategoryBinding {
    expression: JavaIdentifierExpression;
    constructor(expression: JavaIdentifierExpression);
    toDialect(writer: CodeWriter): void;
}
