var NotStorableError = require("../error/NotStorableError").NotStorableError;
var BaseStatement = require("./BaseStatement").BaseStatement;
var Identifier = require("../grammar/Identifier").Identifier;
var VoidType = require("../type/VoidType").VoidType;
var DataStore = require("../store/DataStore").DataStore;
var NullValue = require("../value/NullValue").NullValue;
var Instance = require("../value/Value").Instance;
var Container = require("../value/Value").Container;
var Dialect = require("../parser/Dialect").Dialect;

function StoreStatement(del, add, andThen) {
    BaseStatement.call(this);
    this.del = del;
    this.add = add;
    this.andThen = andThen;
    return this;
}

StoreStatement.prototype = Object.create(BaseStatement.prototype);
StoreStatement.prototype.constructor = StoreStatement;


StoreStatement.prototype.isSimple = function() {
    return this.andThen==null;
};


StoreStatement.prototype.toDialect = function(writer) {
    if(this.del) {
        writer.append("delete ");
        if (writer.dialect == Dialect.E)
            this.del.toDialect(writer);
        else {
            writer.append('(');
            this.del.toDialect(writer);
            writer.append(')');
        }
        if (this.add)
            writer.append(" and ");
    }
    if (this.add) {
        writer.append ("store ");
        if (writer.dialect == Dialect.E)
            this.add.toDialect(writer);
        else {
            writer.append('(');
            this.add.toDialect(writer);
            writer.append(')');
        }
    }
    if(this.andThen) {
        if(writer.dialect == Dialect.O) {
            writer.append(" then {").newLine().indent();
            this.andThen.toDialect(writer);
            writer.dedent().append("}").newLine();
        } else {
            writer.append(" then:").newLine().indent();
            this.andThen.toDialect(writer);
            writer.dedent();
        }
    }
};

StoreStatement.prototype.toString = function() {
    return "store " + this.add.toString();
};

StoreStatement.prototype.equals = function(other) {
    if (other == this)
        return true;
    else if (other == null)
        return false;
    else if (!(obj instanceof StoreStatement))
        return false
    else
        return this.add.equals(other.add);
};


StoreStatement.prototype.check = function(context) {
    // TODO check expression
    return VoidType.instance;
};

StoreStatement.prototype.interpret = function(context) {
    var idsToDelete = this.getIdsToDelete(context);
    var storablesToAdd = this.getStorablesToAdd(context);
    if (idsToDelete || storablesToAdd)
        DataStore.instance.store(idsToDelete, storablesToAdd);
    if(this.andThen)
        this.andThen.interpret(context);
};

StoreStatement.prototype.declare = function(transpiler) {
    transpiler.require(DataStore);
    if(this.andThen)
        this.andThen.declare(transpiler);
};


StoreStatement.prototype.transpile = function(transpiler) {
    transpiler.append("DataStore.instance.store").append(this.andThen?"Async":"").append("(");
    this.transpileIdsToDelete(transpiler);
    transpiler.append(", ");
    this.transpileStorablesToAdd(transpiler);
    if(this.andThen) {
        transpiler.append(", function() {").indent();
        this.andThen.transpile(transpiler);
        transpiler.dedent().append("}.bind(this)");
    }
    transpiler.append(")");
};

StoreStatement.prototype.transpileIdsToDelete = function(transpiler) {
    if(!this.del)
        transpiler.append("null");
    else {
        transpiler.append("(function() { ").indent();
        transpiler.append("var idsToDelete = new Set();").newLine();
        this.del.forEach(function (exp) {
            exp.transpile(transpiler);
            transpiler.append(".collectDbIds(idsToDelete);").newLine();
        }, this);
        transpiler.append("return Array.from(idsToDelete);").newLine();
        transpiler.dedent().append("})()");
    }
};

StoreStatement.prototype.transpileStorablesToAdd = function(transpiler) {
    if (!this.add)
        transpiler.append("null");
    else {
        transpiler.append("(function() { ").indent();
        transpiler.append("var storablesToAdd = new Set();").newLine();
        this.add.forEach(function (exp) {
            exp.transpile(transpiler);
            transpiler.append(".collectStorables(storablesToAdd);").newLine();
        }, this);
        transpiler.append("return Array.from(storablesToAdd);").newLine();
        transpiler.dedent().append("})()");
    }
};

StoreStatement.prototype.getIdsToDelete = function(context) {
    if(!this.del)
        return null;
    var idsToDel = new Set();
    this.del.forEach(function (exp) {
        var value = exp.interpret(context);
        if (value == NullValue.instance)
            return;
        else if(value instanceof Instance) {
            var dbId = value.getMemberValue(context, "dbId");
            if (dbId !=null && dbId!=NullValue.instance)
                idsToDel.add(dbId.getStorableData());
        } else if(value instanceof Container) {
            value.items.map(function (item) {
                if (value == NullValue.instance)
                    return;
                else if (value instanceof Instance) {
                    var dbId = value.getMemberValue(context, "dbId");
                    if (dbId != null && dbId != NullValue.instance)
                        idsToDel.push(dbId.getStorableData());
                }
            });
        }
    });
    if(idsToDel.length==0)
        return null;
    else
        return idsToDel;
};

StoreStatement.prototype.getStorablesToAdd = function(context) {
    if (!this.add)
        return null;
    var storablesToAdd = new Set();
    this.add.forEach(function (exp) {
        var value = exp.interpret(context);
        value.collectStorables(storablesToAdd)
    });
    if (storablesToAdd.length == 0)
        return null;
    else
        return storablesToAdd;
};


exports.StoreStatement = StoreStatement;