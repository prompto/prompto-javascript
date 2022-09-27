import ObjectList from '../utils/ObjectList';
import JavaExpression from "./JavaExpression";
import {CodeWriter} from "../utils";

export default class JavaExpressionList extends ObjectList<JavaExpression> {

    constructor(expressions?: JavaExpression[], expression?: JavaExpression) {
        super(expressions, expression);
    }

    toDialect(writer: CodeWriter): void {
        if(this.length > 0) {
            this.forEach(exp => {
                exp.toDialect(writer);
                writer.append(", ");
            });
            writer.trimLast(2);
        }
    }
}
