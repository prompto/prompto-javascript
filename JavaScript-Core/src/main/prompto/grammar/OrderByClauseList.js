var ObjectList = require("../utils/ObjectList").ObjectList;
var Dialect = require("../parser/Dialect").Dialect;

function OrderByClauseList(clause) {
    ObjectList.call(this);
    if(clause)
        this.push(clause);
    return this;
}

OrderByClauseList.prototype = Object.create(ObjectList.prototype);
OrderByClauseList.prototype.constructor = OrderByClauseList;

OrderByClauseList.prototype.toDialect = function(writer) {
    writer.append("order by ");
    if(writer.dialect==Dialect.O)
        writer.append("( ");
    this.forEach(function(clause) {
        clause.toDialect(writer);
        writer.append(", ");
    });
    writer.trimLast(2);
    if(writer.dialect==Dialect.O)
        writer.append(" )");
}

OrderByClauseList.prototype.checkQuery = function(context) {
    this.forEach(function (clause) {
        clause.checkQuery(context);
    });
};

OrderByClauseList.prototype.interpretQuery = function(context, query) {
    this.forEach(function (clause) {
        clause.interpretQuery(context, query);
    });
};

OrderByClauseList.prototype.declare = function(transpiler) {
    this.forEach(function (clause) {
        clause.declare(transpiler);
    });
};

OrderByClauseList.prototype.transpileQuery = function(transpiler, builder) {
    this.forEach(function (clause) {
        clause.transpileQuery(transpiler, builder);
    });
};


exports.OrderByClauseList = OrderByClauseList;