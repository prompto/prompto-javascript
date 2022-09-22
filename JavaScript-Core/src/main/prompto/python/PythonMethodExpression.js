import PythonSelectorExpression from './PythonSelectorExpression.js'
import { PythonArgumentList } from './index.ts'

export default class PythonMethodExpression extends PythonSelectorExpression {

    constructor(name, args) {
        super();
        this.name = name;
        this.args = args || new PythonArgumentList();
    }

    toString() {
        return this.parent.toString() + "." + this.name + "(" + this.args.toString() + ")";
    }

    toDialect(writer: CodeWriter): void {
        if(this.parent!=null) {
            this.parent.toDialect(writer);
            writer.append('.');
        }
        writer.append(this.name);
        writer.append('(');
        this.args.toDialect(writer);
        writer.append(')');
    }
}
