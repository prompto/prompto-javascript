var BooleanType = require("../type/BooleanType").BooleanType;
var CursorType = require("../type/CursorType").CursorType;
var Section = require("../parser/Section").Section;
var MemStore = require("../store/MemStore").MemStore;
var Cursor = require("../value/Cursor").Cursor;
var Store = require("../store/Store").Store;

function FetchAllExpression(typ, start, end, filter, orderBy) {
    Section.call(this);
    this.typ = typ;
    this.filter = filter;
    this.xstart = start;
    this.xend = end;
    this.orderBy = orderBy;
    return this;
}

FetchAllExpression.prototype = Object.create(Section.prototype);
FetchAllExpression.prototype.constructor = FetchAllExpression;

FetchAllExpression.prototype.toDialect = function(writer) {
    writer.toDialect(this);
};

FetchAllExpression.prototype.toEDialect = function(writer) {
    writer.append("fetch ");
    if(this.xstart==null)
        writer.append("all ");
    writer.append(this.typ.name);
    if(this.xstart!=null) {
        this.xstart.toDialect(writer);
        writer.append(" to ");
        this.xend.toDialect(writer);
    }
    if(this.filter!=null) {
        writer.append(" where ");
        this.filter.toDialect(writer);
    }
    if(this.orderBy!=null)
        this.orderBy.toDialect(writer);
};

FetchAllExpression.prototype.toODialect = function(writer) {
    writer.append("fetch ");
    if(this.xstart==null)
        writer.append("all ");
    writer.append("( ");
    writer.append(this.typ.name);
    writer.append(" ) ");
    if(this.xstart!=null) {
        writer.append("rows ( ");
        this.xstart.toDialect(writer);
        writer.append(" to ");
        this.xend.toDialect(writer);
        writer.append(") ");
    }
    if(this.filter!=null) {
        writer.append(" where ( ");
        this.filter.toDialect(writer);
        writer.append(") ");
    }
    if(this.orderBy!=null)
        this.orderBy.toDialect(writer);
};

FetchAllExpression.prototype.toSDialect = function(writer) {
    writer.append("fetch ");
    if(this.xstart!=null) {
        writer.append("rows ");
        this.xstart.toDialect(writer);
        writer.append(" to ");
        this.xend.toDialect(writer);
    } else
        writer.append("all ");
    writer.append(" ( ");
    writer.append(this.typ.name);
    writer.append(" ) ");
    if(this.filter!=null) {
        writer.append(" where ");
        this.filter.toDialect(writer);
    }
    if(this.orderBy!=null)
        this.orderBy.toDialect(writer);
};

FetchAllExpression.prototype.check = function(context) {
    var decl = context.getRegisteredDeclaration(this.typ.name);
    if (decl == null)
        throw new SyntaxError("Unknown category: " + this.typ.name);
    this.checkFilter(context);
    this.checkOrderBy(context);
    this.checkSlice(context);
    return new CursorType(this.typ);
};

FetchAllExpression.prototype.checkFilter = function(context) {
    if(!this.filter)
        return;
    var local = context.newLocalContext();
    var filterType = this.filter.check(local);
    if (filterType != BooleanType.instance)
        throw new SyntaxError("Filtering expression must return a boolean !");
};

FetchAllExpression.prototype.checkOrderBy = function(context) {

}

FetchAllExpression.prototype.checkSlice = function(context) {
}

FetchAllExpression.prototype.interpret = function(context) {
    var docs = Store.instance.fetchMany(context, this.xstart, this.xend, this.filter, this.orderBy);
    return new Cursor(context, this.typ, docs);
};

function DocumentIterator(docs) {
    return this;
    if (doc == null)
        return NullValue.instance;
    else
        return this.typ.newInstanceFromDocument(context, doc);

}

exports.FetchAllExpression = FetchAllExpression;
