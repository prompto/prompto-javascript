import CSharpSelectorExpression from './CSharpSelectorExpression'
import { CSharpExpressionList } from '../csharp'
import {CodeWriter} from "../utils";

export default class CSharpMethodExpression extends CSharpSelectorExpression {

    name: string;
    args: CSharpExpressionList;

    constructor(name: string, args: CSharpExpressionList | null) {
        super();
        this.name = name;
        this.args = args || new CSharpExpressionList();
    }

    toString() {
        return this.parent!.toString() + "." + this.name + "(" + this.args.toString() + ")";
    }

    toDialect(writer: CodeWriter): void {
        this.parent!.toDialect(writer);
        writer.append('.');
        writer.append(this.name);
        writer.append('(');
        this.args.toDialect(writer);
        writer.append(')');
    }
}
