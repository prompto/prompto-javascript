import JavaSelectorExpression from './JavaSelectorExpression'
import { JavaExpressionList } from '../java'
import {CodeWriter} from "../utils";

export default class JavaMethodExpression extends JavaSelectorExpression {

    name: string;
    args: JavaExpressionList | null;

    constructor(name: string, args: JavaExpressionList | null) {
        super(null);
        this.name = name;
        this.args = args || new JavaExpressionList();
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
