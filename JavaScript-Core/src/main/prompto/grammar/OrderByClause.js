var Section = require("../parser/Section").Section;

function OrderByClause(names, descending) {
    Section.call(this);
    this.names = names;
    this.descending = descending || false;
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

OrderByClause.prototype.declare = function(transpiler) {
    // nothing to do
};

OrderByClause.prototype.transpileQuery = function(transpiler, builder) {
    var name = this.names[0];
    var info = transpiler.context.findAttribute(name).getAttributeInfo();
    transpiler.append(builder).append(".addOrderByClause(").append(info.toTranspiled()).append(", ").append(this.descending).append(");").newLine();
};

exports.OrderByClause = OrderByClause;