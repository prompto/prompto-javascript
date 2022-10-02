import IPythonExpression from "./IPythonExpression";
import {PythonModule} from "./index";
import {CodeWriter} from "../utils";

export default class PythonStatement {

    expression: IPythonExpression;
    isReturn: boolean;
    module?: PythonModule;

    constructor(expression: IPythonExpression, isReturn: boolean) {
        this.expression = expression;
        this.isReturn = isReturn;
    }

    toString() {
        return "" + (this.isReturn ? "return " : "") + this.expression.toString() + ";";
    }

    toDialect(writer: CodeWriter): void {
        if(this.isReturn)
            writer.append("return ");
        this.expression.toDialect(writer);
        if(this.module)
            this.module.toDialect(writer);
    }
}
