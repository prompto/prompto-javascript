var ObjectList = require("../utils/ObjectList").ObjectList;

function CSharpExpressionList(expression) {
    ObjectList.call(this);
    expression = expression || null;
    if(expression!==null) {
        this.add(expression);
    }
    return this;
}

CSharpExpressionList.prototype = Object.create(ObjectList.prototype);
CSharpExpressionList.prototype.constructor = CSharpExpressionList;

CSharpExpressionList.prototype.toDialect = function(writer) {
    if(this.length>0) {
        this.forEach(function(exp) {
            exp.toDialect(writer);
            writer.append(", ");
        });
        writer.trimLast(2);
    }
};

exports.CSharpExpressionList = CSharpExpressionList;