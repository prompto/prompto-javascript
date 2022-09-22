import ObjectList from '../utils/ObjectList'
import CSharpExpression from "./CSharpExpression";
import {CodeWriter} from "../utils";

export default class CSharpExpressionList extends ObjectList<CSharpExpression> {
  
    constructor(items?: CSharpExpression[], item?: CSharpExpression) {
        super(items, item);
    }

    toDialect(writer: CodeWriter): void {
        if(this.length>0) {
            this.forEach(exp => {
                exp.toDialect(writer);
                writer.append(", ");
            });
            writer.trimLast(2);
        }
    }
}
