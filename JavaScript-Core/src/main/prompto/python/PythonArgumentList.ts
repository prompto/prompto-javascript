import ObjectList from '../utils/ObjectList'
import PythonExpression from "./PythonExpression";
import {CodeWriter} from "../utils";

export default class PythonArgumentList extends ObjectList<PythonExpression> {

    constructor(args?: PythonExpression[], arg?: PythonExpression) {
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
