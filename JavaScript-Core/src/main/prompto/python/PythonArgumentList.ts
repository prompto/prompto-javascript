import ObjectList from '../utils/ObjectList'
import IPythonExpression from "./IPythonExpression";
import {CodeWriter} from "../utils";

export default class PythonArgumentList extends ObjectList<IPythonExpression> {

    constructor(args?: IPythonExpression[], arg?: IPythonExpression) {
        super(args, arg);
    }

    toDialect(writer: CodeWriter): void {
        if(this.length>0) {
            this.forEach(arg => {
                arg.toDialect(writer);
                writer.append(", ");
            });
            writer.trimLast(2);
        }
    }
}
