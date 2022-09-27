import INativeCategoryBinding from '../../../main/prompto/grammar/INativeCategoryBinding'
import {CodeWriter} from "../utils";
import {CSharpIdentifierExpression} from "./index";

export default class CSharpNativeCategoryBinding extends INativeCategoryBinding {

    expression: CSharpIdentifierExpression;

    constructor(expression: CSharpIdentifierExpression) {
        super();
        this.expression = expression;
    }

    toDialect(writer: CodeWriter): void {
        writer.append("C#: ");
        this.expression.toDialect(writer);
    }
}
