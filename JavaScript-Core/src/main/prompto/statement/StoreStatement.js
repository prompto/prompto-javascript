var SimpleStatement = require("./SimpleStatement").SimpleStatement;
var VoidType = require("../type/VoidType").VoidType;
var MemStore = require("../store/MemStore").MemStore;
var Store = require("../store/Store").Store;
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
    writer.append ("store ");
    if(writer.dialect == Dialect.E) {
        this.add.map( function(exp) {
            exp.toDialect(writer);
            writer.append(",");
        });
        writer.trimLast(1);
    } else {
        writer.append ('(');
        this.add.map( function(exp) {
            exp.toDialect(writer);
            writer.append(",");
        });
        writer.trimLast(1);
        writer.append (')');
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
    this.add.map(function (exp) {
        var value = exp.interpret(context);
        var storable = value.storable;
        if (!storable)
            throw new NotStorableError();
        if (storable.dirty) {
            var document = storable.asDocument();
            store.store(document);
        }
    });
    return null;
};

exports.StoreStatement = StoreStatement;