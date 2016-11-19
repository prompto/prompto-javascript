var SimpleStatement = require("./SimpleStatement").SimpleStatement;
var DataStore = require("../store/DataStore").DataStore;
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
    DataStore.instance.flush();
};


FlushStatement.prototype.toDialect = function(writer) {
    writer.toDialect(this);
};

FlushStatement.prototype.toEDialect = function(writer) {
    writer.append("flush");
};


FlushStatement.prototype.toMDialect = function(writer) {
    writer.append("flush()");
};


FlushStatement.prototype.toODialect = function(writer) {
    writer.append("flush()");
};


exports.FlushStatement = FlushStatement;
