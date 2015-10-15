var Section = require("../parser/Section").Section;
var MemStore = require("../store/MemStore").MemStore;
var Store = require("../store/Store").Store;

function FetchAllExpression(typ, filter, start, end) {
    Section.call(this);
    this.typ = typ;
    this.filter = filter;
    this.start = start;
    this.end = end;
    return this;
}

FetchAllExpression.prototype = Object.create(Section.prototype);
FetchAllExpression.prototype.constructor = FetchAllExpression;

FetchAllExpression.prototype.toDialect = function(writer) {
    writer.toDialect(this);
};

FetchAllExpression.prototype.toEDialect = function(writer) {
    writer.append("fetch one ");
    writer.append(this.typ.name);
    writer.append(" where ");
    this.filter.toDialect(writer);
};

FetchAllExpression.prototype.toODialect = function(writer) {
    writer.append("fetch one (");
    writer.append(this.typ.name);
    writer.append(") where (");
    this.filter.toDialect(writer);
    writer.append(")");
};

FetchAllExpression.prototype.toSDialect = function(writer) {
    writer.append("fetch one ");
    writer.append(this.typ.name);
    writer.append(" where ");
    this.toDialect(writer);
};

FetchAllExpression.prototype.check = function(context) {
    var decl = context.getRegisteredDeclaration(this.typ.name);
    if (decl == null)
        throw new SyntaxError("Unknown category: " + this.typ.name);
    var local = context.newLocalContext();
    var filterType = this.filter.check(local);
    if (filterType != BooleanType.instance)
        throw new SyntaxError("Filtering expression must return a boolean !");
    return ListType(this.typ);
};

FetchAllExpression.prototype.interpret = function(context) {
    var store = Store.instance;
    if (store == null)
        store = MemStore.instance;
    var doc = store.fetchOne(context, this.filter);
    if (doc == null)
        return NullValue.instance;
    else
        return this.typ.newInstanceFromDocument(context, doc);
};

exports.FetchAllExpression = FetchAllExpression;
