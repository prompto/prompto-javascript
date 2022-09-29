import PythonSelectorExpression from './PythonSelectorExpression'
import { PythonArgumentList } from './index'
import {CodeWriter} from "../utils";

export default class PythonMethodExpression extends PythonSelectorExpression {

    name: string;
    args: PythonArgumentList;

    constructor(name: string, args: PythonArgumentList) {
        super(null);
        this.name = name;
        this.args = args || new PythonArgumentList();
    }

    toString() {
        return (this.parent ? this.parent.toString() + "." : "") + this.name + "(" + this.args.toString() + ")";
    }

    toDialect(writer: CodeWriter): void {
        if(this.parent) {
            this.parent.toDialect(writer);
            writer.append('.');
        }
        writer.append(this.name);
        writer.append('(');
        this.args.toDialect(writer);
        writer.append(')');
    }
}
