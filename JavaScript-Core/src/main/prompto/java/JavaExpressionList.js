const ObjectList = require("../utils/ObjectList").ObjectList;

class JavaExpressionList extends ObjectList {
    constructor(expression) {
        super();
        expression = expression || null;
        if(expression!==null) {
            this.add(expression);
        }
        return this;
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

exports.JavaExpressionList = JavaExpressionList;