import { CodeWriter } from "../utils";
import { CSharpIdentifierExpression } from "./index";
import { INativeCategoryBinding } from "../grammar";
export default class CSharpNativeCategoryBinding implements INativeCategoryBinding {
    expression: CSharpIdentifierExpression;
    constructor(expression: CSharpIdentifierExpression);
    toDialect(writer: CodeWriter): void;
}
