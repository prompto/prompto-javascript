var SimpleStatement = require("./SimpleStatement").SimpleStatement;
var Store = require("../store/Store").Store;
var VoidType = require("../type/VoidType").VoidType;


function FlushStatement() {
    SimpleStatement.call(this);
    return this;
};

FlushStatement.prototype = Object.create(SimpleStatement.prototype);
FlushStatement.prototype.constructor = FlushStatement;

FlushStatement.prototype.check = function(context) {
    return VoidType.instance;
};



FlushStatement.prototype.interpret = function(context) {
    Store.instance.flush();
};


FlushStatement.prototype.toDialect = function(writer) {
    writer.toDialect(this);
};

FlushStatement.prototype.toEDialect = function(writer) {
    writer.append("flush");
};


FlushStatement.prototype.toSDialect = function(writer) {
    writer.append("flush()");
};


FlushStatement.prototype.toODialect = function(writer) {
    writer.append("flush()");
};


exports.FlushStatement = FlushStatement;
