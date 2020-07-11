var Section = require("../parser/Section").Section;

function OrderByClause(ids, descending) {
    Section.call(this);
    this.ids = ids;
    this.descending = descending || false;
    return this;
}


OrderByClause.prototype = Object.create(Section.prototype);
OrderByClause.prototype.constructor = OrderByClause;


OrderByClause.prototype.toDialect = function(writer) {
    this.ids.forEach(function(id) {
        writer.append(id.toString());
        writer.append(".");
    });
    writer.trimLast(1);
    if(this.descending)
        writer.append(" descending");
};


OrderByClause.prototype.checkQuery = function(context) {
    var id = this.ids[0];
    var decl = context.findAttribute(id.name);
    if(decl==null)
        context.problemListener.reportUnknownAttribute(id);
};


OrderByClause.prototype.interpretQuery = function(context, query) {
    var id = this.ids[0];
    var info = context.findAttribute(id.name).getAttributeInfo();
    query.addOrderByClause(info, this.descending);
};


OrderByClause.prototype.declare = function(transpiler) {
    // nothing to do
};


OrderByClause.prototype.transpileQuery = function(transpiler, builder) {
    var id = this.ids[0];
    var info = transpiler.context.findAttribute(id.name).getAttributeInfo();
    transpiler.append(builder).append(".addOrderByClause(").append(info.toTranspiled()).append(", ").append(this.descending).append(");").newLine();
};

exports.OrderByClause = OrderByClause;