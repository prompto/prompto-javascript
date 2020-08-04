var ObjectList = require("../utils/ObjectList").ObjectList;

class CSharpExpressionList extends ObjectList {
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
            this.forEach(function(exp) {
                exp.toDialect(writer);
                writer.append(", ");
            });
            writer.trimLast(2);
        }
    }
}

exports.CSharpExpressionList = CSharpExpressionList;