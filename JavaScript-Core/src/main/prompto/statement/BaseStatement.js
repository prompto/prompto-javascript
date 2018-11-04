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

BaseStatement.prototype.transpile = function(transpiler) {
    throw new Error("Transpile not implemented by " + this.constructor.name);
};


BaseStatement.prototype.declare = function(transpiler) {
    throw new Error("Declare not implemented by " + this.constructor.name);
};

exports.BaseStatement = BaseStatement;
