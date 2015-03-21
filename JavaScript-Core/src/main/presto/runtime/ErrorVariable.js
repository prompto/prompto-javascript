var Variable = require("./Variable").Variable;
var EnumeratedCategoryType = require("../type/EnumeratedCategoryType").EnumeratedCategoryType;

function ErrorVariable(name) {
	Variable.call(this, name, new EnumeratedCategoryType("Error"));
	return this;
}

ErrorVariable.prototype = Object.create(Variable.prototype);
ErrorVariable.prototype.constructor = ErrorVariable;

ErrorVariable.prototype.toString = function() {
	return this.name;
};

ErrorVariable.prototype.getType = function(context) {
	return new EnumeratedCategoryType("Error");
};

exports.ErrorVariable = ErrorVariable;
