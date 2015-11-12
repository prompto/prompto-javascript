var Section = require("../parser/Section").Section;
var BooleanType = require("../type/BooleanType").BooleanType;
var NullValue = require("../value/NullValue").NullValue;
var Store = require("../store/Store").Store;

function FetchOneExpression(typ, filter, start, end) {
    Section.call(this);
    this.typ = typ;
    this.filter = filter;
    this.start = start;
    this.end = end;
    return this;
}

FetchOneExpression.prototype = Object.create(Section.prototype);
FetchOneExpression.prototype.constructor = FetchOneExpression;

FetchOneExpression.prototype.toDialect = function(writer) {
    writer.toDialect(this);
};

FetchOneExpression.prototype.toEDialect = function(writer) {
    writer.append("fetch one ");
    writer.append(this.typ.name);
    writer.append(" where ");
    this.filter.toDialect(writer);
};

FetchOneExpression.prototype.toODialect = function(writer) {
    writer.append("fetch one (");
    writer.append(this.typ.name);
    writer.append(") where (");
    this.filter.toDialect(writer);
    writer.append(")");
};

FetchOneExpression.prototype.toSDialect = function(writer) {
    writer.append("fetch one ");
    writer.append(this.typ.name);
    writer.append(" where ");
    this.filter.toDialect(writer);
};

FetchOneExpression.prototype.check = function(context) {
    var decl = context.getRegisteredDeclaration(this.typ.name);
    if (decl == null)
        throw new SyntaxError("Unknown category: " + this.typ.name);
    var filterType = this.filter.check(context);
    if (filterType != BooleanType.instance)
        throw new SyntaxError("Filtering expression must return a boolean !");
    return this.typ;
};

FetchOneExpression.prototype.interpret = function(context) {
    var doc = Store.instance.fetchOne(context, this.filter);
    if (doc == null)
        return NullValue.instance;
    else
        return this.typ.newInstanceFromDocument(context, doc);
};

exports.FetchOneExpression = FetchOneExpression;
