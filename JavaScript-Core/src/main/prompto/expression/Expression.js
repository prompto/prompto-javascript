var Section = require("../parser/Section").Section;

function Expression() {
    Section.call(this);
    return this;
}

Expression.prototype = Object.create(Section.prototype);
Expression.prototype.constructor = Expression;


Expression.prototype.toDialect = function(writer) {
    writer.toDialect(this);
};


Expression.prototype.parentToDialect = function(writer) {
    this.toDialect(writer);
};


Expression.prototype.declare = function(transpiler) {
    throw new Error("declare not implemented by " + this.constructor.name);
};


Expression.prototype.transpile = function(transpiler) {
    throw new Error("transpile not implemented by " + this.constructor.name);
};


Expression.prototype.declareParent = function(transpiler) {
    this.declare(transpiler);
};


Expression.prototype.transpileParent = function(transpiler) {
    this.transpile(transpiler);
};

exports.Expression = Expression;