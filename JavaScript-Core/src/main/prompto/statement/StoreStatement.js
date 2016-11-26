var NotStorableError = require("../error/NotStorableError").NotStorableError;
var SimpleStatement = require("./SimpleStatement").SimpleStatement;
var Identifier = require("../grammar/Identifier").Identifier;
var VoidType = require("../type/VoidType").VoidType;
var DataStore = require("../store/DataStore").DataStore;
var NullValue = require("../value/NullValue").NullValue;
var Instance = require("../value/Value").Instance;
var Container = require("../value/Value").Container;
var Dialect = require("../parser/Dialect").Dialect;

function StoreStatement(del, add) {
    SimpleStatement.call(this);
    this.del = del;
    this.add = add;
    return this;
}

StoreStatement.prototype = Object.create(SimpleStatement.prototype);
StoreStatement.prototype.constructor = StoreStatement;


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

StoreStatement.prototype.interpret = function( context) {
    var idsToDelete = this.getIdsToDelete(context);
    var storablesToAdd = this.getStorablesToAdd(context);
    if (idsToDelete || storablesToAdd)
        DataStore.instance.store(idsToDelete, storablesToAdd);
};

StoreStatement.prototype.getIdsToDelete = function(context) {
    if(!this.del)
        return null;
    var idsToDel = [];
    this.del.forEach(function (exp) {
        var value = exp.interpret(context);
        if (value == NullValue.instance)
            return;
        else if(value instanceof Instance) {
            var dbId = value.getMemberValue(context, "dbId");
            if (dbId !=null && dbId!=NullValue.instance)
                idsToDel.push(dbId.getStorableData());
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
    var storablesToAdd = []
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