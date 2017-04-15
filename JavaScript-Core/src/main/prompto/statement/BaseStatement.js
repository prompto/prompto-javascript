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

exports.BaseStatement = BaseStatement;
