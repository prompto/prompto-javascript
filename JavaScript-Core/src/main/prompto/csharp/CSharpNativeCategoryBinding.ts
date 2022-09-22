import NativeCategoryBinding from '../grammar/NativeCategoryBinding'
import {CodeWriter} from "../utils";
import {CSharpIdentifierExpression} from "./index";

export default class CSharpNativeCategoryBinding extends NativeCategoryBinding {

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
