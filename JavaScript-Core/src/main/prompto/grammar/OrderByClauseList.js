var ObjectList = require("../utils/ObjectList").ObjectList;
var Dialect = require("../parser/Dialect").Dialect;

class OrderByClauseList extends ObjectList {

    constructor(clause) {
        super();
        if(clause)
            this.push(clause);
    }

    toDialect(writer) {
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

    checkQuery(context) {
        this.forEach(function (clause) {
            clause.checkQuery(context);
        });
    }

    interpretQuery(context, query) {
        this.forEach(function (clause) {
            clause.interpretQuery(context, query);
        });
    }

    declare(transpiler) {
        this.forEach(function (clause) {
            clause.declare(transpiler);
        });
    }

    transpileQuery(transpiler, builder) {
        this.forEach(function (clause) {
            clause.transpileQuery(transpiler, builder);
        });
    }
}


exports.OrderByClauseList = OrderByClauseList;