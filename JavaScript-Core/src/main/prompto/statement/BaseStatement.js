var Section = require("../parser/Section").Section;

function BaseStatement() {
	Section.call(this);
	return this;
}

BaseStatement.prototype  = Object.create(Section.prototype);
BaseStatement.prototype.constructor = BaseStatement;

BaseStatement.prototype.canReturn = function() {
	return false;
};

BaseStatement.prototype.isSimple = function() {
    return false;
};


BaseStatement.prototype.parentToDialect = function(writer) {
    this.toDialect(writer);
};


BaseStatement.prototype.checkReference = function(context) {
    return this.check(context);
};


BaseStatement.prototype.transpile = function(transpiler) {
    throw new Error("Transpile not implemented by " + this.constructor.name);
};


BaseStatement.prototype.declare = function(transpiler) {
    throw new Error("Declare not implemented by " + this.constructor.name);
};

BaseStatement.prototype.declareParent = function(transpiler) {
    this.declare(transpiler);
};


BaseStatement.prototype.transpileParent = function(transpiler) {
    this.transpile(transpiler);
};


BaseStatement.prototype.locateSectionAtLine = function(line) {
    return this;
};

exports.BaseStatement = BaseStatement;
