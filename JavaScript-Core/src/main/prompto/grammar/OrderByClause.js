var Section = require("../parser/Section").Section;

function OrderByClause(names, descending) {
    Section.call(this);
    this.names = names;
    this.descending = descending;
    return this;
};

OrderByClause.prototype = Object.create(Section.prototype);
OrderByClause.prototype.constructor = OrderByClause;

OrderByClause.prototype.toDialect = function(writer) {
    this.names.map(function(name) {
        writer.append(name.toString());
        writer.append(".");
    });
    writer.trimLast(1);
    if(this.descending)
        writer.append(" descending");
};

exports.OrderByClause = OrderByClause;