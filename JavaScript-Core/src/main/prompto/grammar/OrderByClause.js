var Section = require("../parser/Section").Section;

class OrderByClause extends Section {

    constructor(ids, descending) {
        super();
        this.ids = ids;
        this.descending = descending || false;
    }

    toDialect(writer) {
        this.ids.forEach(function(id) {
            writer.append(id.toString());
            writer.append(".");
        });
        writer.trimLast(1);
        if(this.descending)
            writer.append(" descending");
    }

    checkQuery(context) {
        var id = this.ids[0];
        var decl = context.findAttribute(id.name);
        if(decl==null)
            context.problemListener.reportUnknownAttribute(id);
    }

    interpretQuery(context, query) {
        var id = this.ids[0];
        var info = context.findAttribute(id.name).getAttributeInfo();
        query.addOrderByClause(info, this.descending);
    }

    declare(transpiler) {
        // nothing to do
    }

    transpileQuery(transpiler, builder) {
        var id = this.ids[0];
        var info = transpiler.context.findAttribute(id.name).getAttributeInfo();
        transpiler.append(builder).append(".addOrderByClause(").append(info.toTranspiled()).append(", ").append(this.descending).append(");").newLine();
    }
}

exports.OrderByClause = OrderByClause;