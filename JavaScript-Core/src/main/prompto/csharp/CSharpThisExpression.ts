import CSharpExpression from './CSharpExpression'
import {CodeWriter} from "../utils";

export default class CSharpThisExpression extends CSharpExpression {

    constructor() {
        super();
    }

    toDialect(writer: CodeWriter): void {
        writer.append("this");
    }

    toString() {
        return "this";
    }
}
