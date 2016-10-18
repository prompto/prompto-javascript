var SimpleStatement = require("./SimpleStatement").SimpleStatement;
var VoidType = require("../type/VoidType").VoidType;
var MemStore = require("../store/MemStore").MemStore;
var Store = require("../store/Store").Store;
var Dialect = require("../parser/Dialect").Dialect;
var NotStorableError = require("../error/NotStorableError").NotStorableError;

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
    var store = Store.instance;
    if (store == null)
        store = MemStore.instance;
    var todel = null;
    if(this.del) {
        todel = [];
        this.del.forEach(function (exp) {
            var value = exp.interpret(context);
            if (!value.storable)
                throw new NotStorableError();
            todel.push(value.dbId);
        });
    }
    var toadd = null;
    if(this.add) {
        toadd = [];
        this.add.forEach(function (exp) {
            var value = exp.interpret(context);
            var storable = value.storable;
            if (!storable)
                throw new NotStorableError();
            if (storable.dirty) {
                var doc = storable.asDocument();
                toadd.push(doc);
                value.dbId = doc.dbId;
            }
        });
    }
    store.store(todel, toadd);
    return null;
};

exports.StoreStatement = StoreStatement;