var ObjectList = require("../utils/ObjectList").ObjectList;
var Dialect = require("../parser/Dialect").Dialect;

function OrderByClauseList(clause) {
    ObjectList.call(this);
    if(clause)
        this.push(clause);
    return this;
};

OrderByClauseList.prototype = Object.create(ObjectList.prototype);
OrderByClauseList.prototype.constructor = OrderByClauseList;

OrderByClauseList.prototype.toDialect = function(writer) {
    writer.append("order by ");
    if(writer.dialect==Dialect.O)
        writer.append("( ");
    this.map(function(clause) {
        clause.toDialect(writer);
        writer.append(", ");
    });
    writer.trimLast(2);
    if(writer.dialect==Dialect.O)
        writer.append(" )");
}

exports.OrderByClauseList = OrderByClauseList;