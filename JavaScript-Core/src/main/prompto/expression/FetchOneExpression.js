var Section = require("../parser/Section").Section;
var Identifier = require("../grammar/Identifier").Identifier;
var AnyType = require("../type/AnyType").AnyType;
var BooleanType = require("../type/BooleanType").BooleanType;
var CategoryType = require("../type/CategoryType").CategoryType;
var NullValue = require("../value/NullValue").NullValue;
var DataStore = require("../store/DataStore").DataStore;
var MatchOp = require("../store/MatchOp").MatchOp;
var TypeFamily = require("../store/TypeFamily").TypeFamily;
var AttributeInfo = require("../store/AttributeInfo").AttributeInfo;

function FetchOneExpression(typ, predicate, start, end) {
    Section.call(this);
    this.typ = typ;
    this.predicate = predicate;
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
    if(this.typ!=null) {
        writer.append(this.typ.name);
        writer.append(" ");
    }
    writer.append("where ");
    this.predicate.toDialect(writer);
};

FetchOneExpression.prototype.toODialect = function(writer) {
    writer.append("fetch one ");
    if(this.typ!=null) {
        writer.append("(");
        writer.append(this.typ.name);
        writer.append(") ");
    }
    writer.append("where (");
    this.predicate.toDialect(writer);
    writer.append(")");
};

FetchOneExpression.prototype.toMDialect = function(writer) {
    writer.append("fetch one ");
    if(this.typ!=null) {
        writer.append(this.typ.name);
        writer.append(" ");
    }
    writer.append("where ");
    this.predicate.toDialect(writer);
};

FetchOneExpression.prototype.check = function(context) {
    if(this.typ!=null) {
        var decl = context.getRegisteredDeclaration(this.typ.name);
        if (decl == null)
            throw new SyntaxError("Unknown category: " + this.typ.name);
    }
    var filterType = this.predicate.check(context);
    if (filterType != BooleanType.instance)
        throw new SyntaxError("Filtering expression must return a boolean !");
    return this.typ || AnyType.instance;
};

FetchOneExpression.prototype.interpret = function(context) {
    var store = DataStore.instance;
    var query = this.buildFetchOneQuery(context, store);
    var stored = store.fetchOne (query);
    if (stored == null)
        return NullValue.instance;
    else {
        var typeName = stored.getData("category").slice(-1)[0];
        var typ = new CategoryType(new Identifier(typeName));
        if (this.typ != null)
            typ.mutable = this.typ.mutable;
        return typ.newInstanceFromStored(context, stored);
    }
};

FetchOneExpression.prototype.buildFetchOneQuery = function(context, store) {
    var builder = store.newQueryBuilder();
    if (this.typ != null) {
        var info = AttributeInfo("category", TypeFamily.TEXT, true, null);
        builder.verify(info, MatchOp.CONTAINS, this.typ.name);
    }
    if (this.predicate != null) {
        this.predicate.interpretQuery(context, builder);
    }
    if (this.typ != null && this.predicate != null) {
        builder.and();
    }
    return builder.build();
};

exports.FetchOneExpression = FetchOneExpression;
