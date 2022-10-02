import INativeCategoryBinding from '../../../main/prompto/grammar/INativeCategoryBinding'
import {CodeWriter} from "../utils";
import {CSharpIdentifierExpression} from "./index";

export default class CSharpNativeCategoryBinding implements INativeCategoryBinding {

    expression: CSharpIdentifierExpression;

    constructor(expression: CSharpIdentifierExpression) {
        this.expression = expression;
    }

    toDialect(writer: CodeWriter): void {
        writer.append("C#: ");
        this.expression.toDialect(writer);
    }
}
