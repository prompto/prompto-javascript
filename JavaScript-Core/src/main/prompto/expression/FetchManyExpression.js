var Expression = require("./Expression").Expression;
var IntegerType = require("../type/IntegerType").IntegerType;
var BooleanType = require("../type/BooleanType").BooleanType;
var AnyType = require("../type/AnyType").AnyType;
var CursorType = require("../type/CursorType").CursorType;
var $DataStore = require("../store/DataStore").$DataStore;
var AttributeInfo = require("../store/AttributeInfo").AttributeInfo;
var TypeFamily = require("../store/TypeFamily").TypeFamily;
var MatchOp = require("../store/MatchOp").MatchOp;
var CursorValue = require("../value/CursorValue").CursorValue;
var InvalidDataError = require("../error/InvalidDataError").InvalidDataError;
var CategoryDeclaration = require("../declaration/CategoryDeclaration").CategoryDeclaration;

function FetchManyExpression(typ, first, last, predicate, orderBy) {
    Expression.call(this);
    this.typ = typ;
    this.predicate = predicate;
    this.first = first;
    this.last = last;
    this.orderBy = orderBy;
    return this;
}

FetchManyExpression.prototype = Object.create(Expression.prototype);
FetchManyExpression.prototype.constructor = FetchManyExpression;

FetchManyExpression.prototype.toDialect = function(writer) {
    writer.toDialect(this);
};

FetchManyExpression.prototype.toEDialect = function(writer) {
    writer.append("fetch ");
    if(this.first==null)
        writer.append("all ");
    if(this.typ!=null) {
        if(this.typ.mutable)
            writer.append("mutable ");
        writer.append(this.typ.name);
        writer.append(" ");
    }
    if(this.first!=null) {
        this.first.toDialect(writer);
        writer.append(" to ");
        this.last.toDialect(writer);
        writer.append(" ");
    }
    if(this.predicate!=null) {
        writer.append("where ");
        this.predicate.toDialect(writer);
        writer.append(" ");
    }
    if(this.orderBy!=null) {
        this.orderBy.toDialect(writer);
    }
};

FetchManyExpression.prototype.toODialect = function(writer) {
    writer.append("fetch ");
    if(this.first==null)
        writer.append("all ");
    if(this.typ!=null) {
        writer.append("( ");
        if(this.typ.mutable)
            writer.append("mutable ");
        writer.append(this.typ.name);
        writer.append(" ) ");
    }
    if(this.first!=null) {
        writer.append("rows ( ");
        this.first.toDialect(writer);
        writer.append(" to ");
        this.last.toDialect(writer);
        writer.append(") ");
    }
    if(this.predicate!=null) {
        writer.append("where ( ");
        this.predicate.toDialect(writer);
        writer.append(") ");
    }
    if(this.orderBy!=null)
        this.orderBy.toDialect(writer);
};

FetchManyExpression.prototype.toMDialect = function(writer) {
    writer.append("fetch ");
    if(this.first!=null) {
        writer.append("rows ");
        this.first.toDialect(writer);
        writer.append(" to ");
        this.last.toDialect(writer);
        writer.append(" ");
    } else
        writer.append("all ");
    writer.append("( ");
    if(this.typ!=null) {
        if(this.typ.mutable)
            writer.append("mutable ");
        writer.append(this.typ.name);
        writer.append(" ");
    }
    writer.append(") ");
    if(this.predicate!=null) {
        writer.append(" where ");
        this.predicate.toDialect(writer);
        writer.append(" ");
    }
    if(this.orderBy!=null)
        this.orderBy.toDialect(writer);
};

FetchManyExpression.prototype.check = function(context) {
    var typ = this.typ;
    if (typ==null)
        typ = AnyType.instance;
    else {
        var decl = context.getRegisteredDeclaration(this.typ.name);
        if (decl == null  || !(decl instanceof CategoryDeclaration))
            context.problemListener.reportUnknownCategory(typ.id);
        if(!(decl.isStorable && decl.isStorable(context)))
            context.problemListener.reportNotStorable(this.typ.id, this.typ.name);
        context = context.newInstanceContext(null, decl.getType(context), true);
    }
    this.checkFilter(context);
    this.checkOrderBy(context);
    this.checkSlice(context);
    return new CursorType(typ);
};

FetchManyExpression.prototype.checkFilter = function(context) {
    if(!this.predicate)
        return;
    var filterType = this.predicate.check(context);
    if (filterType != BooleanType.instance)
        context.problemListener.reportIllegalAssignment(this.predicate, BooleanType.instance, filterType);
};

FetchManyExpression.prototype.checkOrderBy = function(context) {

}

FetchManyExpression.prototype.checkSlice = function(context) {
}

FetchManyExpression.prototype.interpret = function(context) {
    var store = $DataStore.instance;
    var query = this.buildFetchManyQuery(context, store);
    var typ = this.typ==null ? AnyType.instance : this.typ;
    var cursor = store.fetchMany(query, typ.mutable);
    return new CursorValue(context, typ, cursor.iterable);
};



FetchManyExpression.prototype.buildFetchManyQuery = function(context, store) {
    var builder = store.newQueryBuilder();
    builder.setFirst(this.interpretLimit(context, this.first));
    builder.setLast(this.interpretLimit(context, this.last));
    if (this.typ != null) {
        var info = new AttributeInfo("category", TypeFamily.TEXT, true, null);
        builder.verify(info, MatchOp.HAS, this.typ.name);
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
        throw new InvalidDataError("Expecting an Integer, got:" + value.type.name);
    return value.getStorableData();
};


FetchManyExpression.prototype.declare = function(transpiler) {
    var Cursor = require("../intrinsic/Cursor").Cursor;
    transpiler.require(Cursor);
    transpiler.require(MatchOp);
    transpiler.require($DataStore);
    transpiler.require(AttributeInfo);
    transpiler.require(TypeFamily);
    if (this.typ)
        this.typ.declare(transpiler);
    if (this.predicate)
        this.predicate.declare(transpiler);
    if (this.first)
        this.first.declare(transpiler);
    if (this.last)
        this.last.declare(transpiler);
    if (this.orderBy)
        this.orderBy.declare(transpiler);
};


FetchManyExpression.prototype.transpile = function(transpiler) {
    transpiler.append("(function() {").indent();
    this.transpileQuery(transpiler);
    var mutable = this.typ ? this.typ.mutable : false;
    transpiler.append("return $DataStore.instance.fetchMany(builder.build(), ").append(mutable).append(");").newLine().dedent();
    transpiler.append("})()");
};


FetchManyExpression.prototype.transpileQuery = function(transpiler) {
    transpiler.append("var builder = $DataStore.instance.newQueryBuilder();").newLine();
    if (this.typ != null)
        transpiler.append("builder.verify(new AttributeInfo('category', TypeFamily.TEXT, true, null), MatchOp.CONTAINS, '").append(this.typ.name).append("');").newLine();
    if (this.predicate != null)
        this.predicate.transpileQuery(transpiler, "builder");
    if (this.typ != null && this.predicate != null)
        transpiler.append("builder.and();").newLine();
    if (this.first) {
        transpiler.append("builder.setFirst(");
        this.first.transpile(transpiler);
        transpiler.append(");").newLine();
    }
    if (this.last) {
        transpiler.append("builder.setLast(");
        this.last.transpile(transpiler);
        transpiler.append(");").newLine();
    }
    if (this.orderBy)
        this.orderBy.transpileQuery(transpiler, "builder");
};


exports.FetchManyExpression = FetchManyExpression;
