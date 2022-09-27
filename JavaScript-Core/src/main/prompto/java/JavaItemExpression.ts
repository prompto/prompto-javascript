import JavaSelectorExpression from './JavaSelectorExpression'
import JavaExpression from "./JavaExpression";
import {CodeWriter} from "../utils";

export default class JavaItemExpression extends JavaSelectorExpression {

    item: JavaExpression;

    constructor(item: JavaExpression) {
        super(null);
        this.item = item || null;
    }

    toString() {
        return this.parent!.toString() + "[" + this.item.toString() + "]";
    }

    toDialect(writer: CodeWriter) {
        this.parent!.toDialect(writer);
        writer.append("[");
        this.item.toDialect(writer);
        writer.append("]");
    }
}
