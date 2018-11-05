var FetchManyExpression = require("../expression/FetchManyExpression").FetchManyExpression;

function FetchManyStatement(typ, predicate, first, last, orderBy, name, stmts) {
    FetchManyExpression.call(this, typ, predicate, first, last, orderBy);
    this.name = name;
    this.stmts = stmts;
    return this;
}

FetchManyStatement.prototype = Object.create(FetchManyExpression.prototype);
FetchManyStatement.prototype.constructor = FetchManyStatement;


exports.FetchManyStatement = FetchManyStatement;