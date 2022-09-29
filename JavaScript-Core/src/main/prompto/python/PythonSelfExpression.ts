import IPythonExpression from "./IPythonExpression";
import {CodeWriter} from "../utils";

export default class PythonSelfExpression implements IPythonExpression {

    toString() {
        return "self";
    }

    toDialect(writer: CodeWriter): void {
        writer.append("self");
    }
}
