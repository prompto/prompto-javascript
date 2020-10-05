import CSharpSelectorExpression from './CSharpSelectorExpression.js'
import { CSharpExpressionList } from './index.js'

export default class CSharpMethodExpression extends CSharpSelectorExpression {

    constructor(name, args) {
        super();
        this.name = name;
        this.args = args || new CSharpExpressionList();
    }

    toString() {
        return this.parent.toString() + "." + this.name + "(" + this.args.toString() + ")";
    }

    toDialect(writer) {
        this.parent.toDialect(writer);
        writer.append('.');
        writer.append(this.name);
        writer.append('(');
        this.args.toDialect(writer);
        writer.append(')');
    }
}
