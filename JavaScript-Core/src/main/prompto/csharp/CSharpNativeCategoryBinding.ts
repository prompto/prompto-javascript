import {CodeWriter} from "../utils";
import {CSharpIdentifierExpression} from "./index";
import {INativeCategoryBinding} from "../grammar";

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
