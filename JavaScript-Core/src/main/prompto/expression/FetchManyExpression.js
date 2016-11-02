var IntegerType = require("../type/IntegerType").IntegerType;
var BooleanType = require("../type/BooleanType").BooleanType;
var CursorType = require("../type/CursorType").CursorType;
var Section = require("../parser/Section").Section;
var DataStore = require("../store/DataStore").DataStore;
var AttributeInfo = require("../store/AttributeInfo").AttributeInfo;
var TypeFamily = require("../store/TypeFamily").TypeFamily;
var MatchOp = require("../store/MatchOp").MatchOp;
var Cursor = require("../value/Cursor").Cursor;
var Store = require("../store/Store").Store;

function FetchManyExpression(typ, first, last, predicate, orderBy) {
    Section.call(this);
    this.typ = typ;
    this.predicate = predicate;
    this.first = first;
    this.last = last;
    this.orderBy = orderBy;
    return this;
}

FetchManyExpression.prototype = Object.create(Section.prototype);
FetchManyExpression.prototype.constructor = FetchManyExpression;

FetchManyExpression.prototype.toDialect = function(writer) {
    writer.toDialect(this);
};

FetchManyExpression.prototype.toEDialect = function(writer) {
    writer.append("fetch ");
    if(this.first==null)
        writer.append("all ");
    writer.append(this.typ.name);
    if(this.first!=null) {
        writer.append(" ");
        this.first.toDialect(writer);
        writer.append(" to ");
        this.last.toDialect(writer);
    }
    if(this.predicate!=null) {
        writer.append(" where ");
        this.predicate.toDialect(writer);
    }
    if(this.orderBy!=null) {
        writer.append(" ");
        this.orderBy.toDialect(writer);
    }
};

FetchManyExpression.prototype.toODialect = function(writer) {
    writer.append("fetch ");
    if(this.first==null)
        writer.append("all ");
    writer.append("( ");
    writer.append(this.typ.name);
    writer.append(" ) ");
    if(this.first!=null) {
        writer.append("rows ( ");
        this.first.toDialect(writer);
        writer.append(" to ");
        this.last.toDialect(writer);
        writer.append(") ");
    }
    if(this.predicate!=null) {
        writer.append(" where ( ");
        this.predicate.toDialect(writer);
        writer.append(") ");
    }
    if(this.orderBy!=null)
        this.orderBy.toDialect(writer);
};

FetchManyExpression.prototype.toSDialect = function(writer) {
    writer.append("fetch ");
    if(this.first!=null) {
        writer.append("rows ");
        this.first.toDialect(writer);
        writer.append(" to ");
        this.last.toDialect(writer);
    } else
        writer.append("all ");
    writer.append(" ( ");
    writer.append(this.typ.name);
    writer.append(" ) ");
    if(this.predicate!=null) {
        writer.append(" where ");
        this.predicate.toDialect(writer);
    }
    if(this.orderBy!=null)
        this.orderBy.toDialect(writer);
};

FetchManyExpression.prototype.check = function(context) {
    var decl = context.getRegisteredDeclaration(this.typ.name);
    if (decl == null)
        throw new SyntaxError("Unknown category: " + this.typ.name);
    this.checkFilter(context);
    this.checkOrderBy(context);
    this.checkSlice(context);
    return new CursorType(this.typ);
};

FetchManyExpression.prototype.checkFilter = function(context) {
    if(!this.predicate)
        return;
    var filterType = this.predicate.check(context);
    if (filterType != BooleanType.instance)
        throw new SyntaxError("Filtering expression must return a boolean !");
};

FetchManyExpression.prototype.checkOrderBy = function(context) {

}

FetchManyExpression.prototype.checkSlice = function(context) {
}

FetchManyExpression.prototype.interpret = function(context) {
    var store = DataStore.instance;
    var query = this.buildFetchManyQuery(context, store);
    var docs = store.fetchMany(query);
    return new Cursor(context, this.typ, docs);
};



FetchManyExpression.prototype.buildFetchManyQuery = function(context, store) {
    var builder = store.newQueryBuilder();
    builder.setFirst(this.interpretLimit(context, this.first));
    builder.setLast(this.interpretLimit(context, this.last));
    if (this.typ != null) {
        var info = new AttributeInfo("category", TypeFamily.TEXT, true, null);
        builder.verify(info, MatchOp.CONTAINS, this.typ.name);
    }
    if (this.predicate != null)
        this.predicate.interpretQuery(context, builder);
    if (this.typ != null && this.predicate != null)
        builder.and();
    if (this.orderBy != null)
        this.orderBy.interpretQuery(context, builder);
    return builder.build();
};



FetchManyExpression.prototype.interpretLimit = function(context, exp) {
    if (exp == null)
        return null;
    var value = exp.interpret(context);
    if(value.type!=IntegerType.instance)
        throw new InvalidValueError("Expecting an Integer, got:" + value.type.name);
    return value.getStorableData();
};


function DocumentIterator(docs) {
    return this;
    if (doc == null)
        return NullValue.instance;
    else
        return this.typ.newInstanceFromDocument(context, doc);

}

exports.FetchManyExpression = FetchManyExpression;
