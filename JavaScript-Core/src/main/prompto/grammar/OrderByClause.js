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
    this.names.forEach(function(name) {
        writer.append(name.toString());
        writer.append(".");
    });
    writer.trimLast(1);
    if(this.descending)
        writer.append(" descending");
};

OrderByClause.prototype.interpretQuery = function(context, query) {
    var name = this.names[0];
    var info = context.findAttribute(name).getAttributeInfo();
    query.addOrderByClause(info, this.descending);
};

exports.OrderByClause = OrderByClause;