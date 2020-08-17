import {ObjectList} from "../utils/ObjectList";

export default class JavaExpressionList extends ObjectList {

    constructor(expression) {
        super();
        expression = expression || null;
        if(expression!==null) {
            this.add(expression);
        }
    }

    toDialect(writer) {
        if(this.length>0) {
            this.forEach(exp => {
                exp.toDialect(writer);
                writer.append(", ");
            });
            writer.trimLast(2);
        }
    }
}
